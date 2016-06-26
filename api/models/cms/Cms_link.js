/**
 * Created by Wizzer.cn on 11/5/15.
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
    name: {
      type: 'string',
      size: 100,
      required: true
    },
    type: {
      type: 'string',
      size: 20
    },
    picurl: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    target: {
      type: 'string'
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
    classId: {
      model: 'Cms_linkClass',
      index: true
    }
  }
};
