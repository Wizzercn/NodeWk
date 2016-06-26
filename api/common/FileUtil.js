/**
 * Created by wizzer on 2016/4/11.
 */
var fs = require('fs');
var moment = require("moment");
module.exports = {
  geFileList: function (path) {
    var filesList = [];
    this.readFile(path, filesList);
    return filesList;
  },
  //遍历读取文件
  readFile: function (path, filesList) {
    var self=this;
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
      var states = fs.statSync(path + '/' + file);
      if (states.isDirectory()) {
        self.readFile(path + '/' + file, filesList);
      }
      else {
        //创建一个对象保存信息
        var obj = {};
        obj.size = states.size;//文件大小，以字节为单位
        obj.name = file;//文件名
        obj.path = path + '/' + file; //文件绝对路径
        obj.url=obj.path.replace(sails.config.appPath, '');
        obj.mtime= parseInt(moment(states.mtime).format('x'));
        obj.atime= parseInt(moment(states.atime).format('x'));
        filesList.push(obj);
      }
    }
  }
};
