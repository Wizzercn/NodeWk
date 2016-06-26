/**
 * Created by Wizzer.cn on 10/27/15.
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
    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string',
      size: 500,
      required: true
    },
    createdBy:{
      type: 'integer'
    },
    createdAt:{
      type:'integer',
      defaultsTo:function(){
        return moment().format('X');
      }
    }
  }
};
