/**
 * Created by Wizzer.cn on 10/25/15.
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
    appname: {
      type: 'string',
      required: true
    },
    ghid: {//原始ID
      type: 'string',
      unique: true,
      size:50,
      required: true
    },
    appid: {
      type: 'string',
      unique: true,
      size:50,
      required: true
    },
    appsecret: {
      type: 'string',
      required: true
    },
    encodingAESKey:{
      type: 'string',
      required: true
    },
    token: {
      type: 'string',
      required: true
    },
    access_token: {
      type: 'string'
    },
    expire_time: {
      type:'integer',
      defaultsTo:function(){
        return 0;
      }
    },
    jsapi_ticket:{
      type: 'string'
    },
    jsapi_time:{
      type:'integer',
      defaultsTo:function(){
        return 0;
      }
    },
    qrcode:{
      type: 'string'
    },
    createdBy:{
      type: 'integer'
    },
    createdAt:{
      type:'integer',
      defaultsTo:function(){
        return moment().format('X');
      }
    },
    replys: {
      collection: 'Wx_reply',
      via: 'wxid'
    },
    menus: {
      collection: 'Wx_menu',
      via: 'wxid'
    }

  }
};
