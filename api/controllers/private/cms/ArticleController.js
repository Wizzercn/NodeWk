/**
 * Created by Wizzer.cn on 9/25/15.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  /**
   * index
   * @param req
   * @param res
   */
  index: function (req, res) {
    var data = req.data;
    return res.view('private/cms/article/index', data);

  },
  /**
   * 添加
   * @param req
   * @param res
   */
  add: function (req, res) {
    req.data.moment = moment;
    var channelId = req.query.channelId;
    if (channelId) {
      Cms_channel.findOne({id: channelId}).exec(function (err, obj) {
        req.data.channel = obj;
        return res.view('private/cms/article/add', req.data);
      });
    } else {
      return res.view('private/cms/article/add', req.data);
    }
  },
  /**
   * 保存
   * @param req
   * @param res
   */
  addDo: function (req, res) {
    var body = req.body;
    body.publishAt = moment(body.publishAt).format('x') / 1000;
    body.createdBy = req.session.user.id;
    body.disabled = body.publish != 'true';
    Cms_article.create(body).exec(function (e, o) {
      if (e)return res.json({code: 1, msg: sails.__('add.fail')});
      var c = {};
      c.articleId = o.id;
      c.content = body.content;
      Cms_article_content.create(c).exec(function (e1, content) {
        if (content)
          Cms_article.update(o.id, {contentId: content.id}).exec(function (e2, article) {
          });
      });
      return res.json({code: 0, msg: sails.__('add.ok')});
    });
  },
  /**
   * 修改
   * @param req
   * @param res
   */
  edit: function (req, res) {
    var id = req.params.id;
    Cms_article.findOne({id: id}).populate('channelId').populate('contentId').exec(function (err, obj) {
      if (obj.channelId) {
        obj.channelName = obj.channelId.name;
      }
      req.data.obj = obj;
      req.data.moment = moment;
      return res.view('private/cms/article/edit', req.data);
    });
  },
  /**
   * 保存修改
   * @param req
   * @param res
   */
  editDo: function (req, res) {
    var body = req.body;
    body.publishAt = moment(body.publishAt).format('x') / 1000;
    body.createdBy = req.session.user.id;
    body.disabled = body.publish != 'true';
    Cms_article.update({id: body.id}, body).exec(function (err, obj) {
      if (err)return res.json({code: 1, msg: sails.__('update.fail')});
      var c = {};
      c.articleId = body.id;
      c.content = body.content;
      Cms_article_content.update({articleId: body.id}, c).exec(function (e1, content) {

      });
      return res.json({code: 0, msg: sails.__('update.ok')});
    });

  },
  /**
   * 分页查询(jQuery.datatables)
   * @param req
   * @param res
   */
  data: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var channelId = req.body.channelId || 0;
    var title = req.body.title;
    var order = req.body.order || [];
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (channelId > 0) {
      where.channelId = channelId;
    }
    if (title) {
      where.title = {'like': '%' + title + '%'};
    }
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Cms_article.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Cms_article.find(where)
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
  /**
   * 启用
   * @param req
   * @param res
   */
  enable: function (req, res) {
    var id = req.params.id;
    Cms_article.update({id: id}, {disabled: false}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('update.ok')});
      }
    });
  },
  /**
   * 禁用
   * @param req
   * @param res
   */
  disable: function (req, res) {
    var id = req.params.id;
    Cms_article.update({id: id}, {disabled: true}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('update.ok')});
      }
    });
  },
  /**
   * 删除
   * 1.../private/sys/user/delete/:id  删除单个用户
   * 2...POST 提交ids 批量删除用户
   * @param req
   * @param res
   */
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Cms_article.destroy({id: ids}).exec(function (err) {
      if (err) {
        return res.json({code: 1, msg: sails.__('delete.fail')});
      } else {
        Cms_article_content.destroy({articleId: ids}).exec(function (err) {

        });
        return res.json({code: 0, msg: sails.__('delete.ok')});
      }
    });
  },
  /**
   * 详情
   * @param req
   * @param res
   */
  detail: function (req, res) {
    var id = req.params.id;
    Cms_article.findOne({id: id}).populate('contentId').exec(function (err, obj) {
      if (err)res.end();
      req.data.obj = obj;
      req.data.moment = moment;
      return res.view('private/cms/article/detail', req.data);
    });
  },
  /**
   * 左侧树
   * @param req
   * @param res
   */
  tree: function (req, res) {
    var pid = req.query.pid;
    if (!pid)pid = '0';
    Cms_channel.find().where({parentId: pid}).sort('location asc').sort('path asc').exec(function (err, objs) {
      var str = [];
      if (pid == '0') {
        var obj = {};
        obj.id = '0';
        obj.text = '所有栏目';
        obj.children = false;
        str.push(obj);
      }
      if (objs) {
        objs.forEach(function (o) {
          var obj = {};
          obj.id = o.id;
          obj.text = o.name;
          obj.children = o.hasChildren;
          str.push(obj);
        });
      }

      return res.json(str);
    });
  }
};
