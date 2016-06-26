/**
 * Created by Wizzer.cn on 9/10/15.
 */
//var uuid = require('node-uuid');
var moment = require('moment');
module.exports = {
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    //id: {
    //  type: 'string',
    //  size: 50,
    //  primaryKey: true,
    //  defaultsTo: function () {
    //    return uuid.v4().replace('-', '');
    //  }
    //},
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    parentId: {
      type: 'integer',
      size:10
    },
    path: {
      type: 'string',
      size: 100
    },
    name: {
      type: 'string',
      size: 20,
      maxLength: 20,
      required: true
    },
    description: {
      type: 'string',
      size: 255
    },
    address: {
      type: 'string',
      size: 255
    },
    mobile: {
      type: 'string',
      size: 11
    },
    tel: {
      type: 'string',
      size: 20
    },
    hasChildren: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    location: {
      type: 'integer',
      size: 11
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
    users: {
      collection: 'Sys_user',
      via: 'unitid'
    },
    roles: {
      collection: 'Sys_role',
      via: 'unitid'
    }
  }
};
