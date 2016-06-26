/**
 * 系统参数
 * Created by wizzer on 2015/9/6.
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
    config_key: {
      type: 'string',
      size: 100,
      required: true
    },
    config_val: {
      type: 'string',
      size: 100,
      required: true
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
