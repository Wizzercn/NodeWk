/**
 * Created by Wizzer.cn on 11/16/15.
 */
var fs = require('fs-extra');
var FileUtil = require('../../common/FileUtil');
var moment = require("moment");
module.exports = {
  index: function (req, res) {
    if (req.session.auth && !req.session.user.disabled) {
      var action = req.query.action;
      //加载配置文件
      fs.readFile(sails.config.appPath + '/assets/plugins/ueditor/node/config.json', 'utf8', function (err, config_txt) {
        var config = JSON.parse(config_txt);
        switch (action) {
          case 'config':
            return res.send(config_txt);
            break;
          case 'uploadimage':

            req.file('Filedata').upload({
              maxBytes: config.imageMaxSize
            }, function (err, uploadedFiles) {
              if (err)return res.json({state: sails.__('file.upload.err')});
              var filename = uploadedFiles[0].filename;
              var type = uploadedFiles[0].type;
              var fd = uploadedFiles[0].fd;
              var size = uploadedFiles[0].size;
              if (config.imageAllowFiles.indexOf(fd.substring(fd.lastIndexOf('.'))) < 0)
                return res.json({state: sails.__('file.upload.err')});
              var file = fd.substring(fd.lastIndexOf('/'));
              if('win32'==process.platform){
                file = fd.substring(fd.lastIndexOf('\\'));
                file=file.replace('\\','/');
              }
              var newPath = sails.config.system.AppBase + sails.config.system.UploadPath + "/image/" + moment().format("YYYYMMDD") + file;

              fs.copy(fd, sails.config.appPath + newPath, function (err) {
                if (err)return res.json({state: sails.__('file.upload.err')});
                return res.json({
                  state: 'SUCCESS',
                  url: newPath,
                  title: filename,
                  original: filename,
                  type: type,
                  size: size
                });
              })

            });
            break;
          case 'uploadvideo':

            req.file('Filedata').upload({
              maxBytes: config.videoMaxSize
            }, function (err, uploadedFiles) {
              if (err)return res.json({state: sails.__('file.upload.err')});
              var filename = uploadedFiles[0].filename;
              var type = uploadedFiles[0].type;
              var fd = uploadedFiles[0].fd;
              var size = uploadedFiles[0].size;
              if (config.videoAllowFiles.indexOf(fd.substring(fd.lastIndexOf('.'))) < 0)
                return res.json({state: sails.__('file.upload.err')});
              var file = fd.substring(fd.lastIndexOf('/'));
              if('win32'==process.platform){
                file = fd.substring(fd.lastIndexOf('\\'));
                file=file.replace('\\','/');
              }
              var newPath = sails.config.system.AppBase + sails.config.system.UploadPath + "/video/" + moment().format("YYYYMMDD") + file;
              fs.copy(fd, sails.config.appPath + newPath, function (err) {
                if (err)return res.json({state: sails.__('file.upload.err')});
                return res.json({
                  state: 'SUCCESS',
                  url: newPath,
                  title: filename,
                  original: filename,
                  type: type,
                  size: size
                });
              })

            });
            break;
          case 'uploadfile':

            req.file('Filedata').upload({
              maxBytes: config.fileMaxSize
            }, function (err, uploadedFiles) {
              if (err)return res.json({state: sails.__('file.upload.err')});
              var filename = uploadedFiles[0].filename;
              var type = uploadedFiles[0].type;
              var fd = uploadedFiles[0].fd;
              var size = uploadedFiles[0].size;
              if (config.fileAllowFiles.indexOf(fd.substring(fd.lastIndexOf('.'))) < 0)
                return res.json({state: sails.__('file.upload.err')});
              var file = fd.substring(fd.lastIndexOf('/'));
              if('win32'==process.platform){
                file = fd.substring(fd.lastIndexOf('\\'));
                file=file.replace('\\','/');
              }
              var newPath = sails.config.system.AppBase + sails.config.system.UploadPath + "/file/" + moment().format("YYYYMMDD") + file;
              fs.copy(fd, sails.config.appPath + newPath, function (err) {
                if (err)return res.json({state: sails.__('file.upload.err')});
                return res.json({
                  state: 'SUCCESS',
                  url: newPath,
                  title: filename,
                  original: filename,
                  type: type,
                  size: size
                });
              })

            });
            break;
          case 'listimage':
          //为了性能，去掉文件列表
            return res.json({
              state: 'no match file',
              list: [],
              start: 0,
              total: 0
            });
            //var size = parseInt(req.query.size) || config.imageManagerListSize;
            //var start = parseInt(req.query.start) || 0;
            //var items = [];
            //var i = 0;
            //var items=FileUtil.geFileList(sails.config.appPath + sails.config.system.UploadPath+'/image/');
            //sails.log.debug('items::'+JSON.stringify(items));
            //    if (items.length > 0) {
            //      //文件按修改时间倒序排序
            //      items.sort(function (a, b) {
            //        return a.mtime < b.mtime ? 1 : -1;
            //      });
            //      var list = [];
            //      items.forEach(function (obj) {
            //        i++;
            //        //分页
            //        if (i > start && i <= start + size) {
            //          list.push(obj);
            //        }
            //      });
            //      return res.json({
            //        state: 'SUCCESS',
            //        list: items,
            //        start: start,
            //        total: items.length
            //      });
            //    } else {
            //      return res.json({
            //        state: 'no match file',
            //        list: [],
            //        start: 0,
            //        total: 0
            //      });
            //    }
            break;
          case 'listfile':
            return res.json({
              state: 'no match file',
              list: [],
              start: 0,
              total: 0
            });
            break;
        }
      });
    } else {
      return res.json({state: sails.__('private.forbidden'), url: '', title: '', original: '', type: '', size: 0});
    }
  }
};
