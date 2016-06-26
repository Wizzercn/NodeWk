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
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: 'string',
      size: 100,
      required: true,
      index:true
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
    links: {
      collection: 'Cms_link',
      via: 'classId'
    }
  },
  getLinkList:function(name,cb){
    Cms_linkClass.findOne({name:name})
      .populate('links', {limit:1,sort: {createdAt: 'desc'}}).exec(function (err, list) {
      return cb(list);
    });
  }
};
