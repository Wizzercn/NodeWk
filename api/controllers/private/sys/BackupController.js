/**
 * Created by wizzer on 20/4/16.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  index: function (req, res) {
    return res.view('private/sys/backup/index', req.data);
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
    Sys_backup.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Sys_backup.find(where)
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
  bak: function (req, res) {
    var body = req.body;
    var type = body.type;
    if (type == 'db') {
      JobService.backupDb(req.session.user.id,function(err){
        if(err)
          return res.json({code: 1, msg: JSON.stringify(err)});
        return res.json({code: 0, msg: '备份成功'});
      });
    } else {
      return res.json({code: 1, msg: '备份失败'});
    }
  },
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Sys_backup.findOne({id: ids}).exec(function (e, o) {
      Sys_backup.destroy({id: ids}).exec(function (err) {
        if (err)
          return res.json({code: 1, msg: sails.__('delete.fail')});
        try {
          fs.removeSync(o.path);
        } catch (e) {
        }
        return res.json({code: 0, msg: sails.__('delete.ok')});
      });
    });
  },
  down: function (req, res) {
    var name = req.params.id || '';
    Sys_backup.findOne({name: name}).exec(function (err, obj) {
      if (obj) {
        return res.status(200).sendfile(obj.path);
      } else {
        return res.send(404, 'not exist');
      }
    });
  }
};
