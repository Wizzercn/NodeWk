/**
 * Created by Wizzer.cn on 9/10/15.
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
    unitid: {
      model: 'Sys_unit'
    },
    name: {
      type: 'string',
      size: 20,
      maxLength: 20,
      required: true
    },
    code: {
      type: 'string',
      size: 50,
      maxLength: 50,
      required: true,
      unique: true
    },
    disabled: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    location: {
      type: 'integer',
      size: 11
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
    users: {
      collection: 'Sys_user',
      via: 'roles'
      //dominant: true
    },
    menus: {
      collection: 'Sys_menu',
      via: 'roles'
    }
  }
};
