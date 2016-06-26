/**
 * Created by wizzer on 2015/9/6.
 */
//var ccap = require('ccap');
var captchapng = require('captchapng');
var StringUtil = require('../../common/StringUtil');
var moment = require('moment');
module.exports = {
  /**
   * 切换语言
   * @param req
   * @param res
   */
  lang: function (req, res) {
    req.setLocale(req.params.lang);
    var url = req.headers['referer'] || '/';
    res.redirect(url);
  },
  /**
   * 更改主题
   * @param req
   * @param res
   */
  theme: function (req, res) {
    req.session.user.loginTheme = req.body.loginTheme;
    req.session.save();
    Sys_user.update({id: req.session.user.id}, {loginTheme: req.body.loginTheme}).exec(function (err, obj) {

    });
    res.end();
  },
  /**
   * 更改布局
   * @param req
   * @param res
   */
  layout: function (req, res) {
    var p = req.body.p, v = req.body.v == 'true';
    if ('sidebar' == p) {
      req.session.user.loginSidebar = v;
      Sys_user.update({id: req.session.user.id}, {loginSidebar: v}).exec(function (err, obj) {
      });
    } else if ('boxed' == p) {
      req.session.user.loginBoxed = v;
      Sys_user.update({id: req.session.user.id}, {loginBoxed: v}).exec(function (err, obj) {
      });
    } else if ('scroll' == p) {
      req.session.user.loginScroll = v;
      Sys_user.update({id: req.session.user.id}, {loginScroll: v}).exec(function (err, obj) {
      });
    }
    req.session.save();
    res.end();
  },
  /**
   * 登陆页
   * @param req
   * @param res
   */
  login: function (req, res) {
    //console.log(StringUtil.password('1','xradmin',1452828989));
    return res.view('private/login.ejs', {layout: 'layouts/login', lang: req.getLocale()});
  },
  /**
   * 登出
   * @param req
   * @param res
   */
  logout: function (req, res) {
    var user=req.session.user;
    if (user) {
      Sys_log.create({
        type: 'system', url: req.url, note: sails.__('private.login.logout'),
        createdBy: user.id, createdByName: user.nickname, createdIp: StringUtil.getIp(req)
      }).exec(function (err, log) {

      });
      req.session.destroy();
      res.redirect('/sysadmin');
    } else {
      res.redirect('/sysadmin');
    }
  },
  /**
   * 登陆
   * @param req
   * @param res
   * @returns {*}
   */
  doLogin: function (req, res) {
    var username = req.body.username,
      password = req.body.password,
      captcha = req.body.captcha,
      captchaText = req.session.captchaText || '',
      captchaMust = req.session.captchaMust || false,
      errCount = req.session.errorCount || 0;
    if (!username || !password) {
      return res.json({code: 1, msg: sails.__('private.login.required')});
    }
    if (captchaMust) {//验证验证码
      if (captcha == '') {
        return res.json({code: 2, msg: sails.__('private.login.inputverifycode')});
      } else if (captchaText == captcha.toLowerCase()) {
        errCount = 0;
      } else {
        return res.json({code: 5, msg: sails.__('private.login.errorverifycode')});
      }
    }
    if (errCount > 1) {//若输错密码三次则必须验证验证码
      req.session.captchaMust = true;
      return res.json({code: 2, msg: sails.__('private.login.inputverifycode')});
    }
    req.session.errorCount = errCount + 1;

    Sys_user.findOne({loginname: username}).populate('roles', {disabled: false}).exec(function (err, user) {
      if (!user || err) return res.json({code: 3, msg: sails.__('private.login.nousername')});
      if (user.disabled) {//判断用户状态
        return res.json({code: 6, msg: sails.__('private.login.forbidden')});
      } else if (StringUtil.password(password,username,user.createdAt)==user.password) {//判断密码
        req.session.auth = true;
        req.session.user = user;
        req.session.captchaMust = false;
        req.session.errorCount = 0;
        var roleIds = [], roleCodes = [], userRoles = user.roles;
        userRoles.forEach(function (obj) {
          roleIds.push(obj.id);
          roleCodes.push(obj.code);
        });
        req.session.roleCodes = roleCodes;
        Sys_user.update(user.id, {
          online: true,
          lastIp: StringUtil.getIp(req),
          loginAt: moment().format('X'),
          loginCount: user.loginCount + 1
        }, function (err) {
        });
        //登陆日志
        Sys_log.create({
          type: 'system', url: req.url, note: sails.__('private.login.success'),
          createdBy: user.id, createdByName: user.nickname, createdIp: StringUtil.getIp(req)
        }).exec(function (err) {
        });
        if (roleIds.length > 0) {
          Sys_role.find().where({id: roleIds}).sort({id: "desc"}).populate('menus', {
            disabled: false,
            sort: {location: 'asc'}
          }).exec(function (err, role) {
            //用户权限菜单
            if (role) {
              var firstMenus = [], secondMenus = {}, permission = [];
              role.forEach(function (m) {

                m.menus.forEach(function (obj) {
                  if (obj.path.length == 4) {
                    if (JSON.stringify(firstMenus).indexOf(JSON.stringify(obj)) < 0) {
                      firstMenus.push(obj);
                    }
                  } else {
                    var s = secondMenus[obj.path.substring(0, obj.path.length - 4)] || [];
                    if (JSON.stringify(s).indexOf(JSON.stringify(obj)) < 0) {
                      s.push(obj);
                    }
                    secondMenus[obj.path.substring(0, obj.path.length - 4)] = s;
                  }
                  if (obj.permission) {
                    permission.push(obj.permission);
                  }
                });

              });
              req.session.firstMenus = firstMenus;
              req.session.secondMenus = secondMenus;
              req.session.permission = permission;
            }
            //用户常用菜单
            var myMenus=[];
            Sys_menu.find({id:user.customMenus}).sort({location:'asc'}).exec(function(err,list) {
              if (list && list.length > 0) {
                list.forEach(function (obj) {
                  var menu = {};
                  menu.id = obj.id;
                  menu.name = obj.name;
                  menu.url = obj.url;
                  menu.target = obj.target;
                  myMenus.push(menu);
                });
              }
              req.session.myMenus = myMenus;
              req.session.save();
              return res.json({code: 0, msg: sails.__('private.login.success')});
            });
          });
        } else {
          return res.json({code: 0, msg: sails.__('private.login.success')});

        }

      } else {
        return res.json({code: 4, msg: sails.__('private.login.errorpassword')});
      }


    });
  },
  /**
   * 验证码
   * @param req
   * @param res
   */
  captcha: function (req, res) {
    if (req.url == '/favicon.ico')return res.end('');//Intercept request favicon.ico
    //var str_ary = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    //  'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    //var str_num = 6,
    //  r_num = str_ary.length,
    //  text = '';
    //for (var i = 0; i < str_num; i++) {
    //  var pos = Math.floor(Math.random() * r_num);
    //  text += str_ary[pos];//生成随机数
    //}
    //var cc=ccap({generate:function(){return text}});
    //var ary = cc.get();
    //var txt = ary[0];
    //var buf = ary[1];
    //req.session.captchaText = txt.toLowerCase();
    //res.end(buf);
    var txt = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, txt); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    req.session.captchaText = txt;
    res.writeHead(200, {
      'Content-Type': 'image/png'
    });
    res.end(imgbase64);
  }
};
