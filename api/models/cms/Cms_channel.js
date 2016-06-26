/**
 * Created by Wizzer.cn on 11/4/15.
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
    shopid:{//预留店铺ID
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
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
      required: true,
      index:true
    },
    url: {
      type: 'string',
      size: 100
    },
    seo_title: {
      type: 'string',
      size: 100
    },
    seo_keywords:{
      type: 'string',
      size: 100
    },
    seo_description:{
      type: 'string',
      size: 100
    },
    homepage: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    content: {
      type: 'text'
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
    articles: {
      collection: 'Cms_article',
      via: 'channelId'
    }
  },
  getChannel: function (cb) {
    Cms_channel.find({select:['id','parentId','path','name','hasChildren'],where:{disabled:false}}).sort('location asc').sort('path asc').exec(function (err, list) {
      return cb(list);
    });
  },
  getChannelByName: function (name,num,cb) {
    Cms_channel.findOne({select:['id','parentId','path','name','hasChildren'],where:{name:name,disabled:false}}).populate('articles', {where:{disabled:false},limit:num,sort: {createdAt: 'desc'}}).sort('location asc').sort('path asc').exec(function (err, list) {
      return cb(list);
    });
  }
};
