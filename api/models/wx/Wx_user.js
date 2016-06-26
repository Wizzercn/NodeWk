/**
 * Created by Wizzer.cn on 10/25/15.
 */
var moment = require('moment');
var emoji = require('emoji');
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
    openid: {//用户的标识，对当前公众号唯一
      type: 'string',
      required: true,
      index: true,
      unique: true,
      size: 50
    },
    unionid :{//同一个微信开放平台帐号下的移动应用、网站应用和公众帐号，用户的unionid是唯一的
      type: 'string',
      size: 50
    },
    nickname: {//用户的昵称
      type: 'string'
    },
    subscribe: {//值为0时，代表此用户没有关注该公众号，拉取不到其余信息
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    sex: {//值为1时是男性，值为2时是女性，值为0时是未知
      type: 'integer',
      defaultsTo: function () {
        return 0;
      }
    },
    city: {
      type: 'string',
      size: 20
    },
    province: {
      type: 'string',
      size: 20
    },
    country: {
      type: 'string',
      size: 20
    },
    headimgurl: {
      type: 'string'
    },
    createdAt: {
      type: 'integer',
      index:true,
      defaultsTo: function () {
        return moment().format('X');
      }
    },
    wxid: {
      model: 'Wx_config'
    }

  },
  getUser: function (wxid, api, user_list) {
    api.batchGetUsers(user_list, function (uerr, udata, ures) {
      sails.log.warn('Wx_user.getUser err::'+JSON.stringify(uerr));
      if (udata) {
        udata.user_info_list.forEach(function (u) {
          if (u && u.subscribe == 1) {
            u.nickname = emoji.unifiedToHTML(u.nickname);//emoji表情替换,支付utf8字符集
            u.wxid = wxid;
            u.createdAt = u.subscribe_time;
            Wx_user.create(u).exec(function (e, log) {
            });
          }
        });

      }
    });
  },
  getFollow: function (puling, api, num, wxid) {
    if (puling != '') {
      api.getFollowers(puling, function (err, data, res) {//获取粉丝,大于10000则传递next_openid获取下一页
        sails.log.warn('Wx_user.getFollow1 err::'+JSON.stringify(err));
        var total = data.total;
        var count = data.count;
        var next_openid = data.next_openid;
        if (total > 10000 + num) {
          Wx_user.getFollow(next_openid, api, count + num, wxid);
        }
        var i = 0;
        var user_list = [];
        data.data.openid.forEach(function (o) {
          i++;
          user_list.push(o);
          if (i % 100 == 0 || i == count) {//每100个openid，组成数组获取用户信息
            Wx_user.getUser(wxid, api, user_list);
            user_list = [];
          }
        });

      });
    } else {
      api.getFollowers(function (err, data, res) {
        sails.log.warn('Wx_user.getFollow2 err::'+JSON.stringify(err));
        if(data){

        var total = data.total;
        var count = data.count;
        var next_openid = data.next_openid;
        if (total > 10000) {
          Wx_user.getFollow(next_openid, api, count + num, wxid);
        }
        var i = 0;
        var user_list = [];
        data.data.openid.forEach(function (o) {
          i++;
          user_list.push(o);
          if (i % 100 == 0 || i == count) {
            Wx_user.getUser(wxid, api, user_list);
            user_list = [];
          }
        });
        }
      });
    }
  }
};
