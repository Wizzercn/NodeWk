/**
 * 系统日志
 * Created by wizzer on 2015/9/6.
 */
var moment = require('moment');
var StringUtil = require('../../common/StringUtil');
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
    type: {
      type: 'string',
      size: 10
    },
    url:{
      type:'string',
      size:100
    },
    note:{
      type:'string',
      size:255
    },
    createdBy: {//操作人ID
      type: 'integer'
    },
    createdByName: {
      type: 'string',
      size: 50
    },
    createdIp:{
      type:'string',
      size:20
    },
    createdAt:{
      type:'integer',
      index: true,
      defaultsTo:function(){
        return moment().format('X');
      }
    }
  },
  /**
   * 记录日志
   * @param type
   * @param user
   * @param note
   * @param req
     */
  log:function(type,user,note,req){
    Sys_log.create({
      type: type, url: req.url, note: note,
      createdBy: user.id, createdByName: user.nickname, createdIp: StringUtil.getIp(req)
    }).exec(function (err) {
    });
  }
};
