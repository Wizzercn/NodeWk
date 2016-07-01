/**
 * Created by Wizzer.cn on 9/16/15.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  /**
   * 单位管理首页
   * @param req
   * @param res
   */
  index: function (req, res) {
    Sys_unit.find().where({parentId: 0}).sort('location asc').sort('path asc').exec(function (err, objs) {
      req.data.unit = objs;
      return res.view('private/sys/unit/index', req.data);
    });
  },
  /**
   * 查找子单位
   * @param req
   * @param res
   */
  child: function (req, res) {
    var id = req.params.id;
    if (!id)id = '0';
    Sys_unit.find().where({parentId: id}).sort('location asc').sort('path asc').exec(function (err, objs) {
      req.data.unit = objs;
      return res.view('private/sys/unit/child', req.data);
    });
  },
  /**
   * 单位详情
   * @param req
   * @param res
   */
  detail: function (req, res) {
    Sys_unit.findOne({id: req.params.id}).exec(function (err, obj) {
      req.data.moment = moment;
      req.data.obj = obj;
      return res.view('private/sys/unit/detail', req.data);
    });
  },
  /**
   * 选择单位(树形结构)
   * @param req
   * @param res
   */
  tree: function (req, res) {
    var pid = req.query.pid;
    if (!pid)pid = '0';
    Sys_unit.find().where({parentId: pid}).sort('location asc').sort('path asc').exec(function (err, objs) {
      var str = [];
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
    //不知道哪种写法性能更好,留着备用
    //Sys_unit.query('SELECT id,NAME AS TEXT,haschildrenAS children FROM sys_unit WHERE parentId =? ORDER BY location ASC,path asc', [pid], function (err, objs) {
    //  var json = JSON.stringify(objs, function (key, value) {
    //    if (key == 'children') {
    //      return value == 1;
    //    }
    //    return value;
    //  });
    //  return res.json(JSON.parse(json));
    //});
  },
  /**
   * 添加单位
   * @param req
   * @param res
   */
  add: function (req, res) {
    var pid = req.query.pid;
    if (pid) {
      Sys_unit.findOne({id: pid}).exec(function (err, obj) {
        req.data.parentUnit = obj;
        return res.view('private/sys/unit/add', req.data);
      });
    } else {
      return res.view('private/sys/unit/add', req.data);
    }
  },
  /**
   * 保存添加
   * @param req
   * @param res
   */
  addDo: function (req, res) {
    var body = req.body;
    var parentId = 0;
    if(body.parentId){
      parentId=parseInt(body.parentId);
    }
    Sys_unit.findOne({id: parentId}).exec(function (err, unit) {
      var path = '';
      if (unit)path = unit.path || '';
      Sys_unit.find().where({parentId: parentId}).sort({path: 'desc'}).limit(1).exec(function (ferr, objs) {
        if (objs&&objs.length > 0) {
          var per=objs[0].path.substring(0,objs[0].path.length-4);
          var next=objs[0].path.substring(objs[0].path.length-4);
          path = per+StringUtil.getPath(parseInt(next) + 1, next.length);
        } else {
          path = path + '0001';
        }
        body.parentId=parentId;
        body.path = path;
        body.location = 0;
        body.createdBy = req.session.user.id;
        Sys_unit.create(body).exec(function (cerr, obj) {
          if (cerr || !obj)return res.json({code: 1, msg: sails.__('add.fail')});
          if (parentId > 0) {
            Sys_unit.update({id: parentId}, {hasChildren: true}).exec(function (e, o) {
            });
          }
          return res.json({code: 0, msg: sails.__('add.ok')});
        });
      });
    });

  },
  /**
   * 修改单位
   * @param req
   * @param res
   */
  edit: function (req, res) {
    var id = req.params.id;
    Sys_unit.findOne({id: id}).exec(function (err, obj) {
      if (obj) {
        Sys_unit.findOne({id: obj.parentId}).exec(function (err, punit) {
          req.data.parentUnit = punit;
          req.data.obj = obj;
          return res.view('private/sys/unit/edit', req.data);
        });
      } else {
        return res.view('private/sys/unit/edit', req.data);
      }
    });
  },
  /**
   * 保存修改
   * @param req
   * @param res
   */
  editDo: function (req, res) {
    var body = req.body;
    Sys_unit.update({id: body.id}, body).exec(function (err, obj) {
      if (err || !obj)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  /**
   * 删除单位,更新父级单位状态
   * @param req
   * @param res
   */
  delete: function (req, res) {
    var id = req.params.id;
    if (id == 1) {
      return res.json({code: 2, msg: sails.__('delete.not')});
    }
    Sys_unit.findOne({id: id}).exec(function (err, obj) {
      if (err || !obj)return res.json({code: 1, msg: sails.__('delete.fail')});
      //设置被删除单位用户状态为禁用
      Sys_user.query('UPDATE sys_user SET disabled=TRUE WHERE unitid=? or unitid IN(SELECT id FROM sys_unit WHERE path LIKE ?)', [id, obj.path + '%'], function (e, o) {
      });
      //设置被删除单位角色状态为禁用
      Sys_user.query('UPDATE sys_role SET disabled=TRUE WHERE unitid=? or unitid IN(SELECT id FROM sys_unit WHERE path LIKE ?)', [id, obj.path + '%'], function (e, o) {
      });
      Sys_unit.destroy({path: {'like': obj.path + '%'}})
        .exec(function (de) {
          //更新父级节点状态
          Sys_unit.count({parentId: obj.parentId}).exec(function (ce, num) {
            if (num == 0) {
              Sys_unit.update({id: obj.parentId}, {hasChildren: false}).exec(function (ue, o2) {
              });
            }
          });
        });

      return res.json({code: 0, msg: sails.__('delete.ok')});
    });
  }
};
