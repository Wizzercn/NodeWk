/**
 * IP策略
 * Created by wizzer on 2016/4/22.
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
    ip: {
      type: 'string',
      size: 255
    },
    disabled: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    createdBy:{
      model: 'Sys_user'
    },
    createdAt: {
      type: 'integer',
      index: true,
      defaultsTo: function () {
        return moment().format('X');
      }
    }
  }
};
