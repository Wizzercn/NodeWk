/**
 * Created by Wizzer.cn on 11/5/15.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  index: function (req, res) {
    return res.view('private/cms/linkclass/index', req.data);
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
    Cms_linkClass.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Cms_linkClass.find(where)
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
    return res.view('private/cms/linkclass/add', req.data);
  },
  addDo: function (req, res) {
    var body = req.body;
    var name = body.name;
    Cms_linkClass.findOne({name: name}).exec(function (err, obj) {
      if (obj) {
        return res.json({code: 1, msg: sails.__('add.exist')});
      } else {
        body.createdBy = req.session.user.id;
        Cms_linkClass.create(body).exec(function (e, o) {
          if (e)return res.json({code: 1, msg: sails.__('add.fail')});
          return res.json({code: 0, msg: sails.__('add.ok')});
        });
      }
    });
  },
  edit: function (req, res) {
    var id = req.params.id;
    Cms_linkClass.findOne({id: id}).exec(function (err, obj) {
      req.data.obj = obj;
      return res.view('private/cms/linkclass/edit', req.data);
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    Cms_linkClass.update({id: body.id}, body).exec(function (err, obj) {
      if (err)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Cms_linkClass.destroy({id: ids}).exec(function (err) {
      if (err) {
        return res.json({code: 1, msg: sails.__('delete.fail')});
      } else {
        Cms_link.destroy({classId: ids}).exec(function (err) {

        });
        return res.json({code: 0, msg: sails.__('delete.ok')});
      }
    });
  }
};
