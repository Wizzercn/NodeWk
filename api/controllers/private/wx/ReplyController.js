/**
 * Created by Wizzer.cn on 10/27/15.
 */
var moment = require('moment');
module.exports = {
  index: function (req, res) {
    req.data.type = req.query.type;
    Wx_config.find({select: ['id','appname']}).exec(function (err, list) {
      req.data.wxlist = list;
      return res.view('private/wx/reply/index', req.data);
    });
  },
  data: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var order = req.body.order || [];
    var type = req.body.type || '';
    var columns = req.body.columns || [];
    var sort = {};
    var where = {type: type};
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Wx_reply.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Wx_reply.find(where)
          .sort(sort)
          .paginate({page: page, limit: pageSize})
          .exec(function (err, list) {
            return res.json({
              "draw": draw,
              "recordsTotal": pageSize,
              "recordsFiltered": count,
              "data": list
            });
          });
      } else {
        return res.json({
          "draw": draw,
          "recordsTotal": pageSize,
          "recordsFiltered": 0,
          "data": []
        });
      }
    });
  },
  add: function (req, res) {
    req.data.type = req.query.type;
    Wx_config.find().exec(function (err, list) {
      req.data.list = list;
      return res.view('private/wx/reply/add', req.data);
    });
  },
  addDo: function (req, res) {
    var body = req.body;
    var content = body.content;
    var type = body.type;
    var wxid = body.wxid;
    if(!wxid||wxid=='0'){
      return res.json({code: 2, msg: '请配置公众号'});
    }
    var keyword = body.keyword;
    body.createdBy = req.session.user.id;
    if (type == 'follow') {//如果是关注事件，则需判断是否已存在(关注只可设置一条自动回复)
      Wx_reply.findOne({wxid: wxid, type: type}).exec(function (err, obj) {
        if (obj) {
          return res.json({code: 1, msg: sails.__('add.exist')});
        }
        Wx_reply.create(body).exec(function (e, o) {
          if (e)return res.json({code: 1, msg: JSON.stringify(e)});
          return res.json({code: 0, msg: sails.__('add.ok')});
        });
      });

    } else {//如果是关键词事件，则判断关键词是否存在
      Wx_reply.findOne({wxid: wxid, keyword: keyword}).exec(function (err, obj) {
        if (obj) {
          return res.json({code: 1, msg: sails.__('add.exist')});
        }
        Wx_reply.create(body).exec(function (e, o) {
          if (e)return res.json({code: 1, msg: sails.__('add.fail')});
          return res.json({code: 0, msg: sails.__('add.ok')});
        });
      });
    }
  },
  edit: function (req, res) {
    var id = req.params.id;
    Wx_reply.findOne({id: id}).exec(function (err, obj) {
      req.data.obj = obj;
      Wx_config.find().exec(function (errc, list) {
        req.data.list = list;
        if (obj.msgtype == 'txt') {
          Wx_txt.findOne({id: obj.content}).exec(function (e, o) {
            req.data.content = o;
            return res.view('private/wx/reply/edit', req.data);
          });
        } else if (obj.msgtype == 'news') {
          var sql = 'SELECT * FROM wx_news WHERE id IN (' + obj.content + ') ORDER BY INSTR(\'' + obj.content + '\',id)';
          //按id数组顺序排序
          Wx_news.query(sql, [], function (e, o) {
            req.data.content = o;
            return res.view('private/wx/reply/edit', req.data);
          });
        }
      });
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    Wx_reply.update({id: body.id}, body).exec(function (err, obj) {
      if (err)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Wx_reply.destroy({id: ids}).exec(function (err) {
      if (err) {
        return res.json({code: 1, msg: sails.__('delete.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('delete.ok')});
      }
    });
  },
  select: function (req, res) {
    req.data.msgtype = req.query.msgtype;
    return res.view('private/wx/reply/select', req.data);

  },
  selectData: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var order = req.body.order || [];
    var msgtype = req.body.msgtype || '';
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    if (msgtype == 'txt') {
      Wx_txt.count(where).exec(function (err, count) {
        if (!err && count > 0) {
          Wx_txt.find(where)
            .sort(sort)
            .paginate({page: page, limit: pageSize})
            .exec(function (err, list) {
              return res.json({
                "draw": draw,
                "recordsTotal": pageSize,
                "recordsFiltered": count,
                "data": list
              });
            });
        } else {
          return res.json({
            "draw": draw,
            "recordsTotal": pageSize,
            "recordsFiltered": 0,
            "data": []
          });
        }
      });
    } else {
      Wx_news.count(where).exec(function (err, count) {
        if (!err && count > 0) {
          Wx_news.find(where)
            .sort(sort)
            .paginate({page: page, limit: pageSize})
            .exec(function (err, list) {
              return res.json({
                "draw": draw,
                "recordsTotal": pageSize,
                "recordsFiltered": count,
                "data": list
              });
            });
        } else {
          return res.json({
            "draw": draw,
            "recordsTotal": pageSize,
            "recordsFiltered": 0,
            "data": []
          });
        }
      });
    }
  }
};
