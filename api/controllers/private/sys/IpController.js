/**
 * Created by wizzer on 20/4/16.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  index: function (req, res) {
    return res.view('private/sys/ip/index', req.data);
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
    Sys_ip.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Sys_ip.find(where)
          .sort(sort)
          .populate('createdBy')
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
    return res.view('private/sys/ip/add', req.data);
  },
  addDo: function (req, res) {
    var body = req.body;
    body.disabled=body.ck=='1';
    body.createdBy=req.session.user.id;
    body.ip=body.ip.replace(/(^\s*)|(\s*$)/g, "");
    Sys_ip.create(body).exec(function (err, obj) {
      if (err || !obj)return res.json({code: 1, msg: sails.__('add.fail')});
      return res.json({code: 0, msg: sails.__('add.ok')});
    });
  },
  edit: function (req, res) {
    var id = req.params.id;
    Sys_ip.findOne({id: id}).exec(function (err, obj) {
      req.data.obj = obj||{};
      return res.view('private/sys/ip/edit', req.data);
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    body.disabled=body.ck=='1';
    body.ip=body.ip.replace(/(^\s*)|(\s*$)/g, "");
    Sys_ip.update({id: body.id}, body).exec(function (err, obj) {
      if (err || !obj)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  /**
   * 启用
   * @param req
   * @param res
   */
  enable: function (req, res) {
    var id = req.params.id;
    Sys_ip.update({id: id}, {disabled: false}).exec(function (err, obj) {
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
    Sys_ip.update({id: id}, {disabled: true}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('update.ok')});
      }
    });
  },
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Sys_ip.destroy({id:ids}).exec(function (err) {
      if (err)
        return res.json({code: 1, msg: sails.__('delete.fail')});
      return res.json({code: 0, msg: sails.__('delete.ok')});
    });
  }
};
