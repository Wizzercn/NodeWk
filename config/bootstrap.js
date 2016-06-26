/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //加载数据库里的x配置项
  Sys_config.find().exec(function(e,o){
    if(e)sails.log.warn('bootstrap.sys_config.err::'+JSON.stringify(e));
    if(o){
      o.forEach(function(c){
        if('system.AppName'== c.config_key){
          sails.config.system.AppName=c.config_val||'';
        }else if('system.AppShrotName'== c.config_key){
          sails.config.system.AppShrotName=c.config_val||'';
        }else if('system.AppDomain'== c.config_key){
          sails.config.system.AppDomain=c.config_val||'';
        }else if('system.AppCopyright'== c.config_key){
          sails.config.system.AppCopyright=c.config_val||'';
        }else{
          sails.config.system.MyConfig[c.config_key]=c.config_val||'';
        }
      });
    }
  });
  Cms_site.findOne(1).exec(function(e,o){
    if(e)sails.log.warn('bootstrap.site_config.err::'+JSON.stringify(e));
    if(o){
      sails.config.system.SiteConfig=o;
    }
  });
  Sys_job.find({disabled:false}).exec(function(e,l){
    if(l&& l.length>0){
      l.forEach(function(o){
        JobService.init(o.name, o.cron,false);
      });
    }
  });
  console.log('bootstrap finish!!');
  cb();
};
