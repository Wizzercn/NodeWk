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
      autoIncrement: false,
      primaryKey: true,
      defaultsTo: function () {
        return 1;
      }
    },
    shopid:{//预留店铺ID
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    site_name: {
      type: 'string',
      size: 100,
      required: true
    },
    site_domain: {
      type: 'string'
    },
    site_icp: {
      type: 'string',
      size: 50
    },
    site_logo:{
      type: 'string'
    },
    site_wap_logo:{
      type: 'string'
    },
    site_qq: {
      type: 'string',
      size: 20
    },
    site_email: {
      type: 'string'
    },
    site_tel: {
      type: 'string',
      size: 20
    },
    weibo_name: {
      type: 'string',
      size: 100
    },
    weibo_url: {
      type: 'string',
      size: 100
    },
    weibo_qrcode: {
      type: 'string'
    },
    wechat_name: {
      type: 'string',
      size: 100
    },
    wechat_id: {
      type: 'string',
      size: 100
    },
    wechat_qrcode: {
      type: 'string'
    },
    seo_title: {
      type: 'string'
    },
    seo_keywords:{
      type: 'string'
    },
    seo_description:{
      type: 'string'
    },
    footer_content: {
      type: 'string',
      size:500
    }
  }
};
