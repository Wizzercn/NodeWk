/**
 * Created by Wizzer.cn on 9/16/15.
 */
var moment = require('moment');
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  /**
   * 菜单管理首页
   * @param req
   * @param res
   */
  index: function (req, res) {
    Cms_channel.find().where({parentId: 0}).sort('location asc').sort('path asc').exec(function (err, objs) {
      req.data.unit = objs;
      return res.view('private/cms/channel/index', req.data);
    });
  },
  /**
   * 查找子菜单
   * @param req
   * @param res
   */
  child: function (req, res) {
    var id = req.params.id;
    if (!id)id = '0';
    Cms_channel.find().where({parentId: id}).sort('location asc').sort('path asc').exec(function (err, objs) {
      req.data.unit = objs;
      return res.view('private/cms/channel/child', req.data);
    });
  },
  /**
   * 菜单详情
   * @param req
   * @param res
   */
  detail: function (req, res) {
    Cms_channel.findOne({id: req.params.id}).exec(function (err, obj) {
      req.data.moment = moment;
      req.data.obj = obj;
      return res.view('private/cms/channel/detail', req.data);
    });
  },
  /**
   * 选择菜单(树形结构)
   * @param req
   * @param res
   */
  tree: function (req, res) {
    var pid = req.query.pid;
    if (!pid)pid = '0';
    Cms_channel.find().where({parentId: pid}).sort('location asc').sort('path asc').exec(function (err, objs) {
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
  },
  /**
   * 添加菜单
   * @param req
   * @param res
   */
  add: function (req, res) {
    var pid = req.query.pid;
    if (pid) {
      Cms_channel.findOne({id: pid}).exec(function (err, obj) {
        req.data.parentUnit = obj;
        return res.view('private/cms/channel/add', req.data);
      });
    } else {
      return res.view('private/cms/channel/add', req.data);
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
    Cms_channel.findOne({id: parentId}).exec(function (err, unit) {
      var path = '';
      if (unit)path = unit.path || '';
      Cms_channel.find().where({parentId: parentId}).sort({path: 'desc'}).limit(1).exec(function (ferr, objs) {
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
        Cms_channel.create(body).exec(function (cerr, obj) {
          if (cerr || !obj)return res.json({code: 1, msg: sails.__('add.fail')});
          if (parentId > 0) {
            Cms_channel.update({id: parentId}, {hasChildren: true}).exec(function (e, o) {
            });
          }
          return res.json({code: 0, msg: sails.__('add.ok')});
        });
      });
    });

  },
  /**
   * 修改菜单
   * @param req
   * @param res
   */
  edit: function (req, res) {
    var id = req.params.id;
    Cms_channel.findOne({id: id}).exec(function (err, obj) {
      if (obj) {
        Cms_channel.findOne({id: obj.parentId}).exec(function (err, punit) {
          req.data.parentUnit = punit;
          req.data.obj = obj;
          return res.view('private/cms/channel/edit', req.data);
        });
      } else {
        return res.view('private/cms/channel/edit', req.data);
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
    Cms_channel.update({id: body.id}, body).exec(function (err, obj) {
      if (err || !obj)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  /**
   * 删除菜单,更新父级状态
   * @param req
   * @param res
   */
  delete: function (req, res) {
    var id = req.params.id;
    Cms_channel.findOne(id).exec(function (e, menu) {
      Cms_channel.destroy({path: {like:menu.path+'%'}}).exec(function (err) {
        if (err) {
          return res.json({code: 1, msg: sails.__('delete.fail')});
        } else {
          Cms_channel.count({parentId: menu.parentId}).exec(function (err, count) {
            if (count == 0) {
              Cms_channel.update({id: menu.parentId}, {hasChildren: false}).exec(function (err, obj) {
              });
            }
          });
          return res.json({code: 0, msg: sails.__('delete.ok')});
        }
      });
    });

  },
  /**
   * 启用
   * @param req
   * @param res
   */
  enable: function (req, res) {
    var id = req.params.id;
    Cms_channel.update({id: id}, {disabled: false}).exec(function (err, obj) {
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
    Cms_channel.update({id: id}, {disabled: true}).exec(function (err, obj) {
      if (err) {
        return res.json({code: 1, msg: sails.__('update.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('update.ok')});
      }
    });
  },
  sort: function (req, res) {
    Cms_channel.find().sort({location: "asc"}).sort({path: "asc"}).exec(function (err, menus) {
      req.data.menus = menus;
      return res.view('private/cms/channel/sort', req.data);
    });
  },
  sortDo: function (req, res) {
    var i = 0, j = 0, k = 0;
    var ids = req.body.ids;
    ids.forEach(function (obj) {
      i++;
      var id1 = obj.id || obj['[id]'];
      Cms_channel.update({id: id1}, {location: i}).exec(function (e, o11) {
        if (obj.children) {
          obj.children.forEach(function (o2) {
            j++;
            var id2 = o2.id || o2['[id]'];
            Cms_channel.update({id: id2}, {location: j}).exec(function (e, o12) {
              if (o2.children) {
                o2.children.forEach(function (o3) {
                  k++;
                  var id3 = o3.id || o3['[id]'];
                  Cms_channel.update({id: id3}, {location: k}).exec(function (e, o13) {
                  });
                });
              }
            });
          });
        }
      });
    });
    return res.json({code: 0, msg: sails.__('update.ok')});

  }
};
