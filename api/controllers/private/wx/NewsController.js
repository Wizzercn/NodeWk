/**
 * Created by Wizzer.cn on 10/25/15.
 */
var moment = require('moment');
module.exports = {
  index: function (req, res) {
    return res.view('private/wx/news/index', req.data);
  },
  data: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var order = req.body.order || [];
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
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
  },
  add: function (req, res) {
    return res.view('private/wx/news/add', req.data);
  },
  addDo: function (req, res) {
    var body = req.body;
    body.createdBy = req.session.user.id;
    Wx_news.create(body).exec(function (e, o) {
      if (e)return res.json({code: 1, msg: '添加失败,请检查所有字段是否填写完毕'});
      return res.json({code: 0, msg: sails.__('add.ok')});
    });
  },
  edit: function (req, res) {
    var id = req.params.id;
    Wx_news.findOne({id: id}).exec(function (err, obj) {
      req.data.obj = obj;
      return res.view('private/wx/news/edit', req.data);
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    Wx_news.update({id: body.id}, body).exec(function (err, obj) {
      if (err)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Wx_news.destroy({id: ids}).exec(function (err) {
      if (err) {
        return res.json({code: 1, msg: sails.__('delete.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('delete.ok')});
      }
    });
  }
};
