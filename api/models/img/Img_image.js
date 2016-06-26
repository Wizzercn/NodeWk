/**
 * Created by Wizzer.cn on 11/4/15.
 */
var moment = require('moment');
var uuid = require('node-uuid');
module.exports = {
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'string',
      size:50,
      primaryKey: true,
      defaultsTo: function () {
        return uuid.v4().replace(new RegExp(/(-)/g), '');
      }
    },
    filename: {
      type: 'string'
    },
    src: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    m_src: {
      type: 'string'
    },
    s_src: {
      type: 'string'
    },
    width: {
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    height: {
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    watermark: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    updatedAt: {
      type: 'integer',
      defaultsTo: function () {
        return moment().format('X');
      }
    }
  }
};

