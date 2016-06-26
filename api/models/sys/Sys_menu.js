/**
 * 资源菜单
 * Created by Wizzer.cn on 9/10/15.
 */
//var uuid = require('node-uuid');
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
    parentId: {
      type: 'integer'
    },
    path: {
      type: 'string',
      size: 100,
      index:true
    },
    name: {
      type: 'string',
      size: 20,
      maxLength: 20,
      required: true
    },
    type: {
      type: 'string',
      size: 10
    },
    url: {
      type: 'string',
      size: 100,
      index:true
    },
    target: {
      type: 'string',
      size: 100
    },
    icon: {
      type: 'string',
      size: 100
    },
    permission:{
      type: 'string',
      size: 100
    },
    hidden: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    disabled: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
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
    roles: {
      collection: 'Sys_role',
      via: 'menus'
    }
  }
};
