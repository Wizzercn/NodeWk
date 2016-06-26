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
    name: {//名称
      type: 'string',
      required: true
    },
    type: {//news 图文 text文字
      type: 'string',
      size: 20,
      required: true
    },
    media_id: {//图文消息media_id
      type: 'string'
    },
    content:{//type==text文字  type==news newsids
      type: 'string'
    },
    scope: {//all  some
      type: 'string',
      size: 20
    },
    status:{//0 待发送 1 已发送 2 发送失败
      type:'integer'
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
