/**
 * Created by Wizzer.cn on 10/28/15.
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
    parentId: {
      type: 'integer'
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
    type: {
      type: 'string'
    },
    key: {
      type: 'string'
    },
    url: {
      type: 'string'
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
    wxid: {
      model: 'Wx_config'
    }
  }
};
