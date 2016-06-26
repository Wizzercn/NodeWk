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
      var wxid=req.session.wxid||'0';
      //加载配置文件
      fs.readFile(sails.config.appPath + '/assets/plugins/ueditor/node/config.json', 'utf8', function (err, config_txt) {
        var config = JSON.parse(config_txt);
        switch (action) {
          case 'config':
            return res.send(config_txt);
            break;
          case 'uploadimage':
            if(!wxid||wxid=='0'){
              return res.json({
                state: 'FAIL',
                url: ''
              });
            }
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
              WechatService.init_id(wxid, function (api) {
                api.uploadMaterial(fd, 'image', function (e, r) {
                  sails.log.debug('image:::' + JSON.stringify(r));
                  if (!e) {
                    return res.json({
                      state: 'SUCCESS',
                      url: r.url,
                      title: filename,
                      original: filename,
                      type: type,
                      size: size
                    });
                  } else {
                    return res.json({
                      state: 'FAIL',
                      url: '',
                      title: filename,
                      original: filename,
                      type: type,
                      size: size
                    });
                  }
                });
              });

            });
            break;
        }
      });
    } else {
      return res.json({state: sails.__('private.forbidden'), url: '', title: '', original: '', type: '', size: 0});
    }
  }
};
