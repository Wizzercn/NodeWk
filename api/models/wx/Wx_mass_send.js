/**
 * Created by wizzer on 2016/5/9.
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
    massId:{
      model:'Wx_mass'
    },
    receivers:{//openid列表,最多10000个
      type: 'text'
    },
    status:{//0 待发送 1 已发送 2 发送失败
      type:'integer'
    },
    msg_id:{
      type:'string',
      size:20
    },
    errcode:{
      type: 'string',
      size:20
    },
    errmsg:{
      type:'string'
    },
    createdBy: {
      type: 'integer'
    },
    createdAt: {
      type: 'integer',
      defaultsTo: function () {
        return moment().format('X');
      }
    },
    wxid: {
      model: 'Wx_config'
    }
  }
};
