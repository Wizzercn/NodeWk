/**
 * 这个JS文件写的比较早，也比较乱，我都不忍心看下去了……改动的时候小心点啊
 * Created by Wizzer.cn on 10/25/15.
 */
var emoji=require('emoji');
var moment = require('moment');
module.exports = {
  api: function (req, res) {
    var id = req.params.id;

    Wx_config.findOne(id).exec(function (err, conf) {
      if (err)return res.send(200, 'fail');
      if (req.body) {
        WeixinService.loop(req, function (data) {
          sails.log.warn(JSON.stringify(data));
          if (data.type == 'text') {//用户发送纯文本
            var txt = data.txt;
            Wx_reply.findOne({wxid: id, type: 'keyword', keyword: txt}).exec(function (err, obj) {
              if (obj) {
                Wx_reply.sendMsg(req, res, obj, conf.ghid, data);
              } else {//查找默认回复内容
                Wx_reply.findOne({wxid: id, type: 'keyword', keyword: 'default'}).exec(function (err2, obj2) {
                  if (obj) {
                    Wx_reply.sendMsg(req, res, obj2, conf.ghid, data);
                  } else {
                    return res.send(200, req.query.echostr);
                  }
                });
              }
            });
          } else if (data.type == 'event') {
            if (data.event == 'subscribe') {//关注事件
              req.body.wxid = id;
              Wx_user.count({openid: data.openid, wxid: id}).exec(function (err, c) {
                if (!err && c > 0) {
                  //若微信表存在数据,则更新
                  WechatService.init(req, res, function (api) {
                    api.getUser({openid: data.openid, lang: 'zh_CN'}, function (er, result) {
                      if (result) {
                        result.subscribe = 1;
                        result.nickname=emoji.unifiedToHTML(result.nickname);
                        Wx_user.update({openid: data.openid, wxid: id}, result).exec(function (e3, o3) {
                        });
                        return res.send(200, req.query.echostr);


                      }else {
                        return res.send(200, req.query.echostr);
                      }
                    });
                  });
                } else {
                  //若微信表不存在数据,则创建
                  Wx_user.create({openid: data.openid, wxid: id,subscribe:1}).exec(function (e2, obj) {
                    if (obj) {
                      WechatService.init(req, res, function (api) {
                        api.getUser({openid: data.openid, lang: 'zh_CN'}, function (er, result) {
                          if (result) {
                            result.subscribe = 1;
                            result.nickname=emoji.unifiedToHTML(result.nickname);
                            Wx_user.update({openid: data.openid, wxid: id}, result).exec(function (e3, o3) {
                            });

                              return res.send(200, req.query.echostr);

                          }else {
                            return res.send(200, req.query.echostr);
                          }
                        });
                      });
                    }else {
                      return res.send(200, req.query.echostr);
                    }
                  });
                }
              });

              Wx_reply.findOne({wxid: id, type: 'follow'}).exec(function (err, obj) {
                if (obj) {
                  if (obj.msgtype == 'txt') {
                    Wx_txt.findOne({id: obj.content}).exec(function (e, o) {
                      if (o) {
                        var msg = {toUserName: data.openid, fromUserName: conf.ghid, content: o.content};
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
                          toUserName: data.openid, fromUserName: conf.ghid,
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
                }else {
                  return res.send(200, req.query.echostr);
                }
              });
            }else if (data.event == 'unsubscribe') {//取消关注事件
              Wx_user.update({openid: data.openid, wxid: id}, {subscribe: 0}).exec(function (err, obj) {

              });
              return res.send(200, req.query.echostr);
            }else if (data.event == 'CLICK') {
              Wx_reply.findOne({wxid: id, type: 'keyword', keyword: data.eventKey}).exec(function (err, obj) {
                if (obj) {
                  Wx_reply.sendMsg(req, res, obj, conf.ghid, data);
                } else {
                  return res.send(200, req.query.echostr);
                }
              });

            } else {
              return res.send(200, req.query.echostr);
            }
          } else {
            return res.send(200, req.query.echostr);
          }
        });
      } else {
        //签名
        if (WeixinService.checkSignature(req, conf.token)) {
          return res.send(200, req.query.echostr);
        } else {
          sails.log.error('weixin checkSignature fail');
          return res.send(200, 'fail');
        }
      }

    });
  },
  test: function (req, res) {
    return res.view('test', {layout: 'layouts/layout'});
  }
};
