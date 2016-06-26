/**
 * Created by Wizzer.cn on 11/5/15.
 */
var moment = require('moment');
module.exports = {
  index: function (req, res) {
    return res.view('private/sys/conf/index', req.data);
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
    Sys_config.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Sys_config.find(where)
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
    return res.view('private/sys/conf/add', req.data);
  },
  addDo: function (req, res) {
    var body = req.body;
    var name = body.config_key;
    Sys_config.findOne({config_key: name}).exec(function (err, obj) {
      if (obj) {
        return res.json({code: 1, msg: sails.__('add.exist')});
      } else {
        Sys_config.create(body).exec(function (e, o) {
          if (e)return res.json({code: 1, msg: sails.__('add.fail')});
          return res.json({code: 0, msg: sails.__('add.ok')});
        });
      }
    });
  },
  edit: function (req, res) {
    var id = req.params.id;
    Sys_config.findOne({id: id}).exec(function (err, c) {
      req.data.obj = c;

      return res.view('private/sys/conf/edit', req.data);
    });
  },
  editDo: function (req, res) {
    var c = req.body;
    Sys_config.update({id: c.id}, c).exec(function (err, obj) {
      if (err)return res.json({code: 1, msg: sails.__('update.fail')});
      if ('system.AppName' == c.config_key) {
        sails.config.system.AppName = c.config_val || '';
      } else if ('system.AppShrotName' == c.config_key) {
        sails.config.system.AppShrotName = c.config_val || '';
      } else if ('system.AppDomain' == c.config_key) {
        sails.config.system.AppDomain = c.config_val || '';
      } else if ('system.AppCopyright' == c.config_key) {
        sails.config.system.AppCopyright = c.config_val || '';
      } else {
        sails.config.system.MyConfig[c.config_key] = c.config_val || '';
      }
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Sys_config.destroy({id: ids}).exec(function (err) {
      if (err)
        return res.json({code: 1, msg: sails.__('delete.fail')});
      return res.json({code: 0, msg: sails.__('delete.ok')});

    });
  }
};
