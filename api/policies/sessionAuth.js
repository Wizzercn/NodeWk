/**
 * 后台权限拦截器
 * Created by Wizzer.cn on 9/9/15.
 */
module.exports = function (req, res, next) {
  if (req.url.lastIndexOf('/pie.htc')>0)return res.end('');
  // if(req.url.indexOf('delete')>0||req.url.indexOf('doChangePassword')>0||req.url.indexOf('resetPwd')>0||req.url.indexOf('editDo')>0||req.url.indexOf('addDo')>0||req.url.indexOf('editMenuDo')>0||req.url.indexOf('disable')>0||req.url.indexOf('enable')>0||req.url.indexOf('delUser')>0){
  //   return res.json({code:1,msg:'被禁止的操作'});
  // }
  if (req.options.controller.indexOf('private/') == 0 && req.options.controller.indexOf('private/login') < 0) {
    if (req.url == '/favicon.ico')return res.end('');
    if (req.session.auth && !req.session.user.disabled) {
      Sys_menu.findOne({url: {'like': '/' + req.options.controller + '%'}}).sort({
        url: 'desc',
        path: 'desc'
      }).exec(function (err, obj) {
        var path = '', permission = '';
        if (obj) {
          path = obj.path || '';
          permission = obj.permission;
        }
        var hasPermission = req.session.permission || [];
        var roleCodes = req.session.roleCodes || [];
        //如果角色是sysadmin,或者是后台首页,或是有Permission权限则通过
        if (roleCodes.indexOf('sysadmin') > -1 || hasPermission.indexOf(permission) > -1 || '/sysadmin/home' == req.url) {
          var data = {
            layout: 'layouts/private',
            lang: req.getLocale(),
            user: req.session.user,
            firstMenus: req.session.firstMenus,
            secondMenus: req.session.secondMenus,
            myMenus:req.session.myMenus,
            path: path
          };
          //非PJAX请求的ajax网页请求,加载空的布局文件(treetable等非json的js控件)
          if ('XMLHttpRequest' == req.get('X-Requested-With') && 'true' != req.get('X-PJAX')) {
            data.layout = 'layouts/layout.ejs';
          }
          req.data = data;
          return next();
        } else {
          return res.forbidden(sails.__('private.forbidden'));
        }
      });
    } else if ('true' == req.get('X-PJAX') || 'XMLHttpRequest' == req.get('x-requested-with')) {//ajax or pjax
      res.set('sessionstatus', 'timeout');
      return res.send('Timeout');
    } else {
      return res.redirect('/private/login/login');
    }
  } else {
    var deviceAgent = req.get('user-agent').toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android|mobile)/);
    var browse_is_mobile=false;
    var browse_is_weixin=false;
    var layout_file='layouts/public';
    sails.log.debug('deviceAgent::'+deviceAgent);
    if(agentID){
      browse_is_mobile=true;
      if(req.options.controller.indexOf('public/shop/pc')==0) {
        //如果是用手机访问PC地址
        return res.redirect('/wap' + req.url);
      }
    }
    if (deviceAgent.indexOf('micromessenger') >-1) {
      browse_is_weixin=true;
    }
    if(req.options.controller.indexOf('public/shop/wap')==0) {
      layout_file='layouts/public_wap';
    }
    var r=req.query.r||'';
    var siteTitle=sails.config.system.SiteConfig.site_name||'';
    var data = {
      layout: layout_file,//布局文件
      SiteConfig:sails.config.system.SiteConfig,//站点配置信息可以在ejs里直接使用
      CssPath:'/public',//前台样式路径
      r:r,//回调地址, /xxx?r=/b/xx 验证成功跳转至/b/xx 自行实现
      siteTitle:siteTitle,//网页标题
      browse_is_mobile:browse_is_mobile,//是否手机访问
      browse_is_weixin:browse_is_weixin//是否微信访问
    };
    req.data = data;
    if(req.query.lang){
      req.session.lang=req.query.lang;
      req.session.save();
    }
    if(req.session.lang)
      req.setLocale(req.session.lang);
    sails.log.debug('locale::'+req.getLocale());
    return next();
  }
};
