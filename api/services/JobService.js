/**
 * Created by wizzer on 2016/4/22.
 */
var moment = require('moment');
var mysqldump = require('mysqldump');
var ZipUtil = require('../common/ZipUtil');
var fs = require('fs-extra');
var schedule = require('node-schedule');
module.exports = {
  /**
   * 初始化定时器
   * @param name
   * @param cron
   * @param disabled
   */
  init:function(name,cron,disabled){
    var self=this;
    var job = schedule.scheduledJobs[name];
    if(job)
      job.cancel();
    if(!disabled){
      job=schedule.scheduleJob(name, cron, function() {
        if(name=='backupDb'){
          self.backupDb(0,function(err){
            if(err){
              Sys_job.update({name:'backupDb'},{updateTxt:JSON.stringify(err),updateStatus:false,updateAt:moment().format('X')}).exec(function(e,o){});
            }else{
              Sys_job.update({name:'backupDb'},{updateTxt:'',updateStatus:true,updateAt:moment().format('X')}).exec(function(e,o){});
            }
          });
        }
      });
    }
  },
  /**
   * 数据库备份
   * @param uid
   * @param cb
   */
  backupDb:function(uid,cb){
    var name = moment().format('YYYYMMDDHHmmss');
    var dir = sails.config.appPath + '/backup/db/';
    if ('win32' == process.platform) {
      dir = sails.config.appPath + '\\backup\\db\\';
    }
    var path = dir + name + '.sql';
    fs.ensureDir(dir, function (fe) {
      if (fe)
        return cb(fe);
      mysqldump({
        host: sails.config.mysql.host,
        user: sails.config.mysql.user,
        password: sails.config.mysql.password,
        database: sails.config.mysql.database,
        dest: path // destination file
      }, function (err) {
        if (err)
          return cb(err);
        var zip = new ZipUtil();
        zip.zipFile(path, function (e) {
          if (e)
            return cb(e);
          zip.writeToFile(dir + name + '.zip', function (ew) {
            if (ew)
              return cb(ew);
            Sys_backup.create({
              type: 'db',
              path: dir + name + '.zip',
              name: name + '.zip',
              createdBy: uid,
              createdAt: moment().format('X')
            }).exec(function (e, o) {
              return cb(null);
            });
            fs.removeSync(dir + name + '.sql');
          });
        }, {rootFolder: name});
      });
    });
  }
};
