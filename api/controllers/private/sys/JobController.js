/**
 * Created by wizzer on 20/4/16.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  index: function (req, res) {
    return res.view('private/sys/job/index', req.data);
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
    Sys_job.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Sys_job.find(where)
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
  edit: function (req, res) {
    var id = req.params.id;
    Sys_job.findOne({id: id}).exec(function (err, obj) {
      req.data.obj = obj||{};
      return res.view('private/sys/job/edit', req.data);
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    Sys_job.update({id: body.id}, body).exec(function (err, obj) {
      if (err || !obj)return res.json({code: 1, msg: sails.__('update.fail')});
      Sys_job.find().exec(function(e,l){
        if(l&& l.length>0){
          l.forEach(function(o){
            JobService.init(o.name, o.cron, o.disabled);
          });
        }
      });
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
    Sys_job.update({id: id}, {disabled: false}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        Sys_job.find().exec(function(e,l){
          if(l&& l.length>0){
            l.forEach(function(o){
              JobService.init(o.name, o.cron, o.disabled);
            });
          }
        });
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
    Sys_job.update({id: id}, {disabled: true}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        Sys_job.find().exec(function(e,l){
          if(l&& l.length>0){
            l.forEach(function(o){
              JobService.init(o.name, o.cron, o.disabled);
            });
          }
        });
        return res.json({code: 0, msg: sails.__('update.ok')});
      }
    });
  }
};
