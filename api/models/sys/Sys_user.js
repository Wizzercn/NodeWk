/**
 * 系统用户
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
    loginname: {
      type: 'string',
      unique: true,
      size: 100,
      required: true,
      maxLength: 100,
      index: true
    },
    nickname: {
      type: 'string',
      size: 50,
      required: true,
      maxLength: 50,
      index:true
    },
    email: {
      type: 'email'
    },
    password: {
      type: 'string',
      size: 50,
      required: true
    },
    disabled: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    online: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    lastIp: {
      type: 'string',
      size: 20
    },
    loginAt: {
      type: 'integer',
      defaultsTo: function () {
        return moment().format('X');
      }
    },
    loginCount: {
      type: 'integer',
      size: 11,
      defaultsTo: function () {
        return 0;
      }
    },
    loginTheme: {
      type: 'string',
      size: 20
    },
    loginSidebar: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    loginScroll: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    loginBoxed: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    customMenus:{
      type:'json'
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
    roles: {
      collection: 'Sys_role',
      via: 'users'
    },
    unitid: {
      model: 'Sys_unit',
      index: true
    }
  }
};

