/**
 * 数据备份
 * Created by wizzer on 2016/4/20.
 */
var moment = require('moment');
module.exports = {
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    //database 数据库备份 file数据文件备份 (排除临时文件夹)
    type: {
      type: 'string',
      enum: ['db','file'],
      size: 10,
      index:true
    },
    //物理路径
    path:{
      type:'string',
      size:255
    },
    //文件名
    name:{
      type:'string',
      size:255
    },
    //操作人ID
    createdBy: {
      model: 'Sys_user',
      index:true
    },
    createdAt:{
      type:'integer',
      index: true,
      defaultsTo:function(){
        return moment().format('X');
      }
    }
  }
};
