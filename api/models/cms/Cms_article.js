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
    shopid: {//预留店铺ID
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    title: {
      type: 'string',
      required: true
    },
    info: {
      type: 'string',
      size: 500
    },
    author: {
      type: 'string'
    },
    client: {
      type: 'string',
      size: 10
    },
    publishAt: {
      type: 'integer'
    },
    disabled: {
      type: 'boolean',
      defaultsTo: function () {
        return false;
      }
    },
    picurl: {
      type: 'string'
    },
    seo_title: {
      type: 'string',
      size: 100
    },
    seo_keywords: {
      type: 'string',
      size: 100
    },
    seo_description: {
      type: 'string',
      size: 100
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
    channelId: {
      model: 'Cms_channel',
      index: true
    },
    contentId: {
      model: 'Cms_article_content',
      index: true
    }
  },
  getPageList: function (pageSize, start, where, sort, cb) {
    var page = Math.floor(start / pageSize) + 1;
    Cms_article.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        var next = 0;
        if ((start + pageSize) < count)next = start + pageSize;
        var totalPage = Math.floor(count / pageSize);
        if (totalPage == 0 || count % pageSize != 0) {
          totalPage++;
        }
        if (count == 1) {
          Cms_article.find({
              sort: sort,
              where: where
            })
            .paginate({page: page, limit: pageSize})
            .populate('contentId')
            .exec(function (err, list) {
              cb({
                "size": pageSize,
                "total": count,
                "next": next,
                "page": page,
                "totalPage": totalPage,
                "data": list
              });
            });
        } else {
          Cms_article.find({
              sort: sort,
              where: where
            })
            .paginate({page: page, limit: pageSize})
            .exec(function (err, list) {
              cb({
                "size": pageSize,
                "total": count,
                "next": next,
                "page": page,
                "totalPage": totalPage,
                "data": list
              });
            });
        }
      } else {
        cb({
          "size": pageSize,
          "total": 0,
          "next": 0,
          "page": 1,
          "totalPage": 1,
          "data": []
        });
      }
    });
  }
};

