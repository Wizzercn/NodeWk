/**
 * Created by Wizzer.cn on 11/5/15.
 */
var moment = require('moment');
module.exports = {
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    content: {
      type: 'text'
    },
    articleId: {
      model: 'Cms_article',
      index: true
    }
  }
};
