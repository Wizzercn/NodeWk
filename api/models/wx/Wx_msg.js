/**
 * Created by wizzer on 2016/5/6.
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
    uid:{
      model:'Wx_user'
    },
    openid:{
      type: 'string',
      index: true,
      size: 50
    },
    nickname:{
      type: 'string'
    },
    type:{
      type: 'string',
      size: 20
    },
    content:{
      type:'text'
    },
    createdAt: {
      type: 'integer',
      defaultsTo: function () {
        return moment().format('X');
      }
    },
    wxid: {
      model: 'Wx_config'
    },
    replyId: {
      model: 'Wx_msg_reply'
    }
  },
  getPageList: function (pageSize, start, where, sort, cb) {
    var page = Math.floor(start / pageSize) + 1;
    Wx_msg.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        var next = 0;
        if ((start + pageSize) < count)next = start + pageSize;
        var totalPage = Math.floor(count / pageSize);
        if (totalPage == 0 || count % pageSize != 0) {
          totalPage++;
        }
        Wx_msg.find({
            sort: sort,
            where: where
          })
          .populate('replyId')
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
