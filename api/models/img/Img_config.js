/**
 * Created by Wizzer.cn on 11/4/15.
 */
var moment = require('moment');
module.exports = {
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      defaultsTo: function () {
        return 1;
      }
    },
    s_width: {
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    s_height: {
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    m_width: {
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    m_height: {
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    wk_url: {
      type: 'string'
    },
    wk_type:{
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    wk_txt:{
      type: 'string'
    },
    updatedAt: {
      type: 'integer',
      defaultsTo: function () {
        return moment().format('X');
      }
    }
  }
};

