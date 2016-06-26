/**
 * Created by Wizzer.cn on 10/14/15.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  /**
   * 角色管理
   * @param req
   * @param res
   */
  index: function (req, res) {
    var data = req.data;
    return res.view('private/sys/role/index', data);
  },
  /**
   * 添加角色
   * @param req
   * @param res
   */
  add: function (req, res) {
    var data = req.data;
    return res.view('private/sys/role/add', data);
  },
  /**
   * 提交添加,判断code是否存在
   * @param req
   * @param res
   */
  addDo: function (req, res) {
    var body = req.body;
    var code = body.code;
    var menuIds = body.menuIds;
    Sys_role.findOne({code: code}).exec(function (err, obj) {
      if (obj) {
        return res.json({code: 1, msg: sails.__('private.sys.role.code')});
      } else {
        body.createdBy = req.session.user.id;
        body.location = 0;
        Sys_role.create(body).exec(function (ce, o) {
          if (ce) {
            return res.json({code: 1, msg: sails.__('add.fail')});
          } else {
            Sys_role.findOne(o.id).exec(function (fe, role) {
              if (role && menuIds) {
                role.menus.add(menuIds.split(','));
                role.save(function (se) {
                });
              }
            });
            return res.json({code: 0, msg: sails.__('add.ok')});
          }
        });
      }
    });
  },
  /**
   * 分配用户
   * @param req
   * @param res
   */
  editUser: function (req, res) {
    var data = req.data;
    Sys_role.findOne(req.params.id).exec(function (err, role) {
      data.role = role;
      return res.view('private/sys/role/editUser', data);
    });
  },
  /**
   * 菜单树
   * @param req
   * @param res
   */
  menuTree: function (req, res) {
    var pid = req.query.pid;
    if (!pid)pid = '0';
    Sys_menu.find().where({parentId: pid}).sort('location asc').sort('path asc').exec(function (err, objs) {
      var str = [];
      if (objs) {
        objs.forEach(function (o) {
          var obj = {};
          obj.id = o.id;
          obj.text = o.name;
          obj.children = o.hasChildren;
          obj.icon = o.icon;
          obj.data = o.url || '';
          str.push(obj);
        });
      }
      return res.json(str);
    });
  },
  /**
   * 单位树
   * @param req
   * @param res
   */
  tree: function (req, res) {
    var pid = req.query.pid;
    if (!pid)pid = '0';
    Sys_unit.find().where({parentId: pid}).sort('location asc').sort('path asc').exec(function (err, objs) {
      var str = [];
      if (pid == '0') {
        var obj = {};
        obj.id = '0';
        obj.text = '系统角色';
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
  },
  /**
   * 角色分页(jQuery.datatables)
   * @param req
   * @param res
   */
  data: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var unitid = req.body.unitid || 0;
    var loginname = req.body.loginname || '';
    var nickname = req.body.nickname || '';
    var order = req.body.order || [];
    var columns = req.body.columns || [];
    var sort = {};
    var where = {unitid: unitid};
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Sys_role.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Sys_role.find(where)
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
   * 查询角色下用户
   * @param req
   * @param res
   */
  userData: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var roleid = req.body.roleid || 0;
    var loginname = req.body.loginname || '';
    var nickname = req.body.nickname || '';
    var order = req.body.order || [];
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (loginname) {
      where.loginname = {'like': '%' + loginname + '%'};
    }
    if (nickname) {
      where.nickname = {'like': '%' + nickname + '%'};
    }
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Sys_role.query('SELECT COUNT(id) AS num FROM sys_role_users__sys_user_roles WHERE sys_role_users=?', [roleid], function (err, count) {
      if (!err && count[0].num > 0) {
        Sys_role.find()
          .where({id: roleid})
          .populate('users', {where: where, skip: start, limit: pageSize, sort: sort})
          .exec(function (err, obj) {
            var list = [];
            if (!err && obj.length > 0) {
              list = obj[0].users;
            }
            return res.json({
              "draw": draw,
              "recordsTotal": pageSize,
              "recordsFiltered": count[0].num,
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
   * 用户选择器
   * @param req
   * @param res
   */
  selectUser: function (req, res) {
    var data = req.data;
    return res.view('private/sys/role/selectUser', data);

  },
  /**
   * 用户选择分页查询,排除当前角色的用户
   * @param req
   * @param res
   */
  selectData: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var roleid = req.body.roleid || 0;
    var name = req.body.name || '';
    var order = req.body.order || [];
    var columns = req.body.columns || [];
    var count_sql = "SELECT count(a.id) as num FROM sys_user a WHERE a.id NOT IN(SELECT sys_user_roles FROM sys_role_users__sys_user_roles WHERE sys_role_users=?) ";
    var sql = "SELECT a.* FROM sys_user a WHERE a.id NOT IN(SELECT sys_user_roles FROM sys_role_users__sys_user_roles WHERE sys_role_users=?) ";

    if (name) {
      count_sql += "AND (a.loginname LIKE ? OR a.nickname LIKE ?) ";
      sql += "AND (a.loginname LIKE ? OR a.nickname LIKE ?) ";
    }
    if (order.length > 0) {
      sql += " order by a." + columns[order[0].column].data + " " + order[0].dir;
    }
    sql += " LIMIT " + pageSize + " OFFSET " + start;
    Sys_user.query(count_sql
      , [roleid, '%' + name + '%', '%' + name + '%']
      , function (err, count) {
        if (!err && count[0].num > 0) {
          Sys_user.query(sql, [roleid, '%' + name + '%', '%' + name + '%'], function (err, obj) {
            return res.json({
              "draw": draw,
              "recordsTotal": pageSize,
              "recordsFiltered": count[0].num,
              "data": obj
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
   * 添加用户到角色
   * @param req
   * @param res
   */
  pushUser: function (req, res) {
    var ids = req.body.ids;
    var roleid = req.body.roleid;
    Sys_role.findOne(roleid).exec(function (err, role) {
      if (role && ids) {
        role.users.add(ids);
        role.save(function (se) {
        });
        return res.json({code: 0, msg: sails.__('add.ok')});
      } else {
        return res.json({code: 1, msg: sails.__('add.fail')});
      }
    });
  },
  /**
   * 从角色中移除用户
   * @param req
   * @param res
   */
  delUser: function (req, res) {
    var ids = req.body.ids;
    var roleid = req.body.roleid;
    Sys_role.findOne(roleid).exec(function (err, role) {
      if (role && ids) {
        role.users.remove(ids);
        role.save(function (se) {
        });
        return res.json({code: 0, msg: sails.__('delete.ok')});
      } else {
        return res.json({code: 1, msg: sails.__('delete.fail')});
      }
    });
  },
  /**
   * 删除角色
   * 1.../private/sys/user/delete/:id  删除单个角色
   * 2...POST 提交ids 批量删除角色
   * @param req
   * @param res
   */
  delete: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Sys_role.destroy({id: ids}).exec(function (err) {
      if (err) {
        return res.json({code: 1, msg: sails.__('delete.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('delete.ok')});
      }
    });
  },
  editMenu: function (req, res) {
    var id = req.params.id;
    var data = req.data;
    Sys_menu.find().sort('location asc').sort('path asc').exec(function (err, objs) {
      var str = [];
      if (objs) {
        objs.forEach(function (o) {
          var obj = {};
          obj.id = o.id;
          obj.text = o.name;
          obj.icon = o.icon;
          obj.data = o.url || '';
          obj.parent = o.parentId == 0 ? "#" : o.parentId;
          str.push(obj);
        });
      }
      data.menu = str;
      data.roleid = id;
      return res.view('private/sys/role/editMenu', data);

    });

  },
  editMenuDo: function (req, res) {
    var ids = req.body.ids;
    var roleid = req.body.roleid;
    Sys_role.query('DELETE FROM sys_menu_roles__sys_role_menus WHERE sys_role_menus=?', [roleid], function () {
      Sys_role.findOne(roleid).exec(function (err, role) {
        if (role && ids) {
          role.menus.add(ids);
          role.save(function (se) {
          });
          return res.json({code: 0, msg: sails.__('update.ok')});
        } else {
          return res.json({code: 1, msg: sails.__('update.fail')});
        }
      });
    });

  },
  /**
   * 查询角色有权限的菜单列表
   * @param req
   * @param res
   */
  menu: function (req, res) {
    var id = req.params.id;
    Sys_role.findOne({id: id}).populate('menus').exec(function (err, role) {
      if (err)res.end();
      var firstMenus = [], secondMenus = [];
      role.menus.forEach(function (obj) {
        if (obj.path.length == 4) {
          firstMenus.push(obj);
        } else {
          secondMenus.push(obj);
        }
      });
      req.data.obj = role;
      req.data.roleFirstMenus = firstMenus;
      req.data.roleSecondMenus = secondMenus;
      return res.view('private/sys/role/menu', req.data);
    });
  },
  edit: function (req, res) {
    var id = req.params.id;
    Sys_role.findOne({id: id}).populate('unitid').exec(function (err, obj) {
      if (obj.unitid) {
        obj.unit_name = obj.unitid.name;
        obj.unit_id = obj.unitid.id;
      } else {
        obj.unit_name = '系统角色';
        obj.unit_id = 0;
      }
      req.data.obj = obj;
      return res.view('private/sys/role/edit', req.data);
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    var old_code = body.old_code;
    var code = body.code;
    if (code != old_code) {//如果修改code则需判断是否已存在
      Sys_role.findOne({code: code}).exec(function (err, obj) {
        if (obj) {
          return res.json({code: 1, msg: sails.__('private.sys.role.code')});
        } else {
          Sys_role.update({id: body.id}, body).exec(function (err, obj) {
            if (err)return res.json({code: 1, msg: sails.__('update.fail')});
            return res.json({code: 0, msg: sails.__('update.ok')});
          });
        }
      });
    } else {
      Sys_role.update({id: body.id}, body).exec(function (err, obj) {
        if (err)return res.json({code: 1, msg: sails.__('update.fail')});
        return res.json({code: 0, msg: sails.__('update.ok')});
      });
    }
  },
  /**
   * 启用角色
   * @param req
   * @param res
   */
  enable: function (req, res) {
    var id = req.params.id;
    Sys_role.update({id: id}, {disabled: false}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('update.ok')});
      }
    });
  },
  /**
   * 禁用角色
   * @param req
   * @param res
   */
  disable: function (req, res) {
    var id = req.params.id;
    Sys_role.update({id: id}, {disabled: true}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('update.ok')});
      }
    });
  }
};
