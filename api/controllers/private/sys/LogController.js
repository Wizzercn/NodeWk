/**
 * Created by Wizzer.cn on 11/5/15.
 */
var moment = require('moment');
module.exports = {
  index: function (req, res) {
    return res.view('private/sys/log/index', req.data);
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
    Sys_log.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Sys_log.find(where)
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
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Sys_log.destroy().exec(function (err) {
      if (err)
        return res.json({code: 1, msg: sails.__('delete.fail')});
      return res.json({code: 0, msg: sails.__('delete.ok')});

    });
  }
};
