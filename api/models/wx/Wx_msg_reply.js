/**
 * Created by wizzer on 2016/5/6.
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
    msgid:{
      model:'Wx_msg'
    },
    uid:{
      model:'Wx_user'
    },
    openid:{
      type: 'string',
      index: true,
      size: 50
    },
    type:{
      type: 'string',
      size: 20
    },
    content:{
      type:'text'
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
