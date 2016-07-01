/**
 * Created by Wizzer.cn on 10/28/15.
 */
var StringUtil = require('../../../common/StringUtil');
module.exports = {
  index: function (req, res) {
    var wxid = req.params.id || '';
    Wx_config.find().exec(function (err, list) {
      if (!wxid && list && list.length > 0) {
        wxid = list[0].id;
      }
      req.data.list = list;
      req.data.wxid = wxid;
      if (wxid) {
        Wx_menu.find({wxid: wxid}).sort({location: "asc"}).sort({path: "asc"}).exec(function (err, menus) {
          req.data.menus = menus;
          return res.view('private/wx/menu/index', req.data);
        });
      } else {
        req.data.menus = [];
        return res.view('private/wx/menu/index', req.data);
      }
    });
  },
  add: function (req, res) {
    var wxid = req.params.id || '0';
    Wx_config.findOne(wxid).exec(function (e2, config) {
      Wx_menu.find({wxid: wxid, parentId: 0}).sort({location: "asc"}).sort({path: "asc"}).exec(function (err, menus) {
        req.data.menus = menus||[];
        req.data.wxid = wxid;
        req.data.config = config||{};
        return res.view('private/wx/menu/add', req.data);
      });
    });
  },
  checkDo: function (req, res) {
    var wxid = req.body.wxid;
    var parentId = parseInt(req.body.parentId);
    if (parentId == 0) {
      Wx_menu.count({parentId: 0, wxid: wxid}).exec(function (ec, num) {
        console.log('num:::' + num);
        if (num > 2) {
          return res.json({code: 1, msg: '只可设置三个一级菜单'});
        }
        return res.json({code: 0, msg: ''});
      });
    } else {
      Wx_menu.count({parentId: parentId, wxid: wxid}).exec(function (ec, num) {
        if (num > 4) {
          return res.json({code: 1, msg: '只可设置五个二级菜单'});
        }
        return res.json({code: 0, msg: ''});
      });
    }
  },
  addDo: function (req, res) {
    var body = req.body;
    var wxid = body.wxid;
    if(!wxid||wxid=='0'){
      return res.json({code: 1, msg: '请配置公众号'});
    }
    var parentId = parseInt(body.parentId);

    Wx_menu.findOne({id: parentId}).exec(function (err, m) {
      var path = '';
      if (m)path = m.path || '';
      Wx_menu.find().where({parentId: parentId}).sort({path: 'desc'}).limit(1).exec(function (ferr, objs) {
        if (objs.length > 0) {
          var per=objs[0].path.substring(0,objs[0].path.length-4);
          var next=objs[0].path.substring(objs[0].path.length-4);
          path = per+StringUtil.getPath(parseInt(next) + 1, next.length);
        } else {
          path = path + '0001';
        }
        body.path = path;
        body.location = 0;
        body.createdBy = req.session.user.id;
        Wx_menu.create(body).exec(function (cerr, obj) {
          if (cerr || !obj)return res.json({code: 1, msg: sails.__('add.fail')});
          if (parentId > 0) {
            Wx_menu.update({id: parentId}, {hasChildren: true}).exec(function (e, o) {
            });
          }
          return res.json({code: 0, msg: sails.__('add.ok')});
        });
      });
    });
  },
  edit: function (req, res) {
    var id = req.params.id || '';
    Wx_menu.findOne(id).exec(function (e, obj) {
      Wx_config.findOne(obj.wxid).exec(function (e2, config) {
        Wx_menu.find({
          wxid: obj.wxid,
          parentId: 0
        }).sort({location: "asc"}).sort({path: "asc"}).exec(function (err, menus) {
          req.data.menus = menus;
          req.data.wxid = obj.wxid;
          req.data.obj = obj;
          req.data.config = config;
          return res.view('private/wx/menu/edit', req.data);
        });
      });
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    Wx_menu.update({id: body.id}, body).exec(function (err, obj) {
      if (err || !obj)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  },
  delete: function (req, res) {
    var id = req.params.id;
    Wx_menu.findOne(id).exec(function (e, menu) {
      Wx_menu.destroy({path: {like:menu.path+'%'}}).exec(function (err) {
        if (err) {
          return res.json({code: 1, msg: sails.__('delete.fail')});
        } else {
          Wx_menu.count({parentId: menu.parentId}).exec(function (err, count) {
            if (count == 0) {
              Wx_menu.update({id: menu.parentId}, {hasChildren: false}).exec(function (err, obj) {
              });
            }
          });
          return res.json({code: 0, msg: sails.__('delete.ok')});
        }
      });
    });

  },
  keyword: function (req, res) {
    req.data.wxid = req.params.id || '';
    return res.view('private/wx/menu/keyword', req.data);
  },
  keywordData: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var order = req.body.order || [];
    var wxid = req.body.wxid || '';
    var columns = req.body.columns || [];
    var sort = {};
    var where = {wxid: wxid, type: 'keyword'};
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Wx_reply.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Wx_reply.find(where)
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
  sortDo: function (req, res) {
    var i = 0, j = 0, k = 0;
    var ids = req.body.ids;
    ids.forEach(function (obj) {
      i++;
      var id1 = obj.id || obj['[id]'];
      Wx_menu.update({id: id1}, {location: i}).exec(function (e, o11) {
        if (obj.children) {
          obj.children.forEach(function (o2) {
            j++;
            var id2 = o2.id || o2['[id]'];
            Wx_menu.update({id: id2}, {location: j}).exec(function (e, o12) {

            });
          });
        }
      });
    });
    return res.json({code: 0, msg: sails.__('update.ok')});
  },
  pushMenu: function (req, res) {
    var wxid = req.body.wxid || '';
    if(!wxid||wxid=='0'){
      return res.json({code: 1, msg: '请配置公众号'});
    }
    Wx_menu.find({
      wxid: wxid
    }).sort({location: "asc"}).sort({path: "asc"}).exec(function (err, menus) {
      var firstMenus = [], secondMenus = {};
      menus.forEach(function (obj) {
        if (obj.path.length == 4) {
          firstMenus.push(obj);
        } else {
          var s = secondMenus[obj.path.substring(0, obj.path.length - 4)] || [];
          if (JSON.stringify(s).indexOf(JSON.stringify(obj)) < 0) {
            s.push(obj);
          }
          secondMenus[obj.path.substring(0, obj.path.length - 4)] = s;
        }
      });
      var m = [];
      if (firstMenus) {
        firstMenus.forEach(function (obj) {
          var mm = {};
          if (obj.hasChildren) {
            var submenu = [];
            mm.name = obj.name;
            if (secondMenus[obj.path]) {
              secondMenus[obj.path].forEach(function (secondMenu) {
                var submenuObj = {};
                if (secondMenu.type == 'view') {
                  submenuObj.type = secondMenu.type;
                  submenuObj.name = secondMenu.name;
                  submenuObj.url = secondMenu.url;
                } else if (secondMenu.type == 'click') {
                  submenuObj.type = secondMenu.type;
                  submenuObj.name = secondMenu.name;
                  submenuObj.key = secondMenu.key;
                } else {
                  submenuObj.name = secondMenu.name;
                }
                submenu.push(submenuObj);
              });
              mm.sub_button = submenu;
            }
            m.push(mm);
          } else {
            var submenuObj = {};
            if (obj.type == 'view') {
              submenuObj.type = obj.type;
              submenuObj.name = obj.name;
              submenuObj.url = obj.url;
            } else if (obj.type == 'click') {
              submenuObj.type = obj.type;
              submenuObj.name = obj.name;
              submenuObj.key = obj.key;
            } else {
              submenuObj.name = obj.name;
            }
            m.push(submenuObj);
          }
        });
        var wxmenu = {button: m};
        WechatService.init(req, res, function (api) {
          api.createMenu(wxmenu, function (e, result) {
            if (e) return res.json({code: 1, msg: '推送失败:' + JSON.stringify(e)});
            return res.json({code: 0, msg: '推送成功'});
          });
        });
      } else {
        return res.json({code: 1, msg: '推送失败'});
      }
    });

  }
};
