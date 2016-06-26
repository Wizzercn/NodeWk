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
    type: {
      type: 'string',
      size: 10,
      required: true
    },
    msgtype: {
      type: 'string',
      size: 10,
      required: true
    },
    keyword: {
      type: 'string',
      size: 20
    },
    content: {
      type: 'string',
      required: true
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
    wxid: {
      model: 'Wx_config'
    }
  },
  sendMsg: function (req, res, obj, ghid, data) {
    if (obj.msgtype == 'txt') {
      Wx_txt.findOne({id: obj.content}).exec(function (e, o) {
        if (o) {
          var msg = {toUserName: data.openid, fromUserName: ghid, content: o.content};
          WeixinService.sendTextMsg(res, msg);//向用户回复消息
        } else {
          return res.send(200, req.query.echostr);
        }
      });
    } else if (obj.msgtype == 'news') {
      var sql = 'SELECT * FROM wx_news WHERE id IN (' + obj.content + ') ORDER BY INSTR(\'' + obj.content + '\',id)';
      //按id数组顺序排序
      Wx_news.query(sql, [], function (e, o) {
        if (o.length > 0) {
          var msg = {
            toUserName: data.openid, fromUserName: ghid,
            articles: o
          };
          WeixinService.sendNewsMsg(res, msg);//向用户回复消息
        } else {
          return res.send(200, req.query.echostr);
        }
      });
    } else {
      return res.send(200, req.query.echostr);
    }
  }
};
