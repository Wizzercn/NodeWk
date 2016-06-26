/**
 * Created by Wizzer.cn on 10/29/15.
 */
var API = require('wechat-api');
var moment = require('moment');
module.exports = {
  init: function (req, res, callback) {
    var wxid='';
    if(req.body&&req.body.wxid){
      wxid = req.body.wxid;
    }else if(req.query&&req.query.wxid){
      wxid = req.query.wxid;
    }
    var now = moment().format('X');
    var myConfig=sails.config.system.MyConfig;
    if(myConfig&&myConfig.wxApi){
      callback(myConfig.wxApi);
    }else{
      Wx_config.findOne(wxid).exec(function (err, obj) {
        var api = new API(obj.appid, obj.appsecret,function (calltoken) {
          if (obj.access_token && obj.expire_time > 0 && now - obj.expire_time < 7150) {
            calltoken(null, JSON.parse(obj.access_token));
          } else {
            api.getAccessToken(function (e, token) {
              if (err) {return calltoken(e);}
              Wx_config.update({id: wxid}, {access_token: JSON.stringify(token), expire_time: now}).exec(function (eu, ou) {
              });
              calltoken(null, token);


            });
          }
        },function (token, calltoken) {
          Wx_config.update({id: wxid}, {access_token: JSON.stringify(token), expire_time: now}).exec(function (eu, ou) {
          });
          calltoken(null);
        });
        sails.config.system.MyConfig.wxApi=api;
        callback(api);

      });
    }
  },
  /**
   * 通过id初始化
   * @param wxid
   * @param callback
     */
  init_id: function (wxid, callback) {
    var now = moment().format('X');
    var myConfig=sails.config.system.MyConfig;
    if(myConfig&&myConfig.wxApi){
      callback(myConfig.wxApi);
    }else{
      Wx_config.findOne(wxid).exec(function (err, obj) {
        sails.log.debug('WechatService.init_id err::'+JSON.stringify(err));
        var api = new API(obj.appid, obj.appsecret,function (calltoken) {
          if (obj.access_token && obj.expire_time > 0 && now - obj.expire_time < 7150) {
            calltoken(null, JSON.parse(obj.access_token));
          } else {
            api.getAccessToken(function (e, token) {
              if (err) {return calltoken(e);}
              Wx_config.update({id: wxid}, {access_token: JSON.stringify(token), expire_time: now}).exec(function (eu, ou) {
              });
              calltoken(null, token);


            });
          }
        },function (token, calltoken) {
          Wx_config.update({id: wxid}, {access_token: JSON.stringify(token), expire_time: now}).exec(function (eu, ou) {
          });
          calltoken(null);
        });
        sails.config.system.MyConfig.wxApi=api;
        callback(api);

      });
    }
  },
  init_appid: function (appid, callback) {
    var now = moment().format('X');
    var myConfig=sails.config.system.MyConfig;
    if(myConfig&&myConfig.wxApi){
      callback(myConfig.wxApi);
    }else{
      Wx_config.findOne({appid:appid}).exec(function (err, obj) {
        sails.log.debug('WechatService.init_id err::'+JSON.stringify(err));
        var api = new API(obj.appid, obj.appsecret,function (calltoken) {
          if (obj.access_token && obj.expire_time > 0 && now - obj.expire_time < 7150) {
            calltoken(null, JSON.parse(obj.access_token));
          } else {
            api.getAccessToken(function (e, token) {
              if (err) {return calltoken(e);}
              Wx_config.update({appid: appid}, {access_token: JSON.stringify(token), expire_time: now}).exec(function (eu, ou) {
              });
              calltoken(null, token);


            });
          }
        },function (token, calltoken) {
          Wx_config.update({appid: appid}, {access_token: JSON.stringify(token), expire_time: now}).exec(function (eu, ou) {
          });
          calltoken(null);
        });
        sails.config.system.MyConfig.wxApi=api;
        callback(api);

      });
    }
  },
  init_js_appid: function (appid, callback) {
    var now = moment().format('X');
    WechatService.init_appid(appid, function (api) {
      sails.log.warn('api.getTicket api:::'+JSON.stringify(api));
      api.registerTicketHandle(function(type, callback){
        Wx_config.findOne({appid:appid}).exec(function (err, obj) {
          if (obj.jsapi_ticket && obj.jsapi_time>0 && now - obj.jsapi_time < 7150) {
            callback(null, JSON.parse(obj.jsapi_ticket));
          } else {
            api.getTicket(function (e, result) {
              if (result) {
                Wx_config.update({appid: appid}, {jsapi_ticket: JSON.stringify(result), jsapi_time: now}).exec(function (eu, ou) {
                });
                callback(null, result);
              }
            });
          }
        });
      }, function(type, _ticketToken, callback){
        sails.log.warn('_ticketToken:::'+JSON.stringify(_ticketToken));
        Wx_config.update({appid: appid}, {jsapi_ticket: JSON.stringify(_ticketToken), jsapi_time: now}).exec(function (eu, ou) {
          callback(null);
        });
      });
      callback(api);
    });
  },
  init_js: function (req, res, callback) {
    var wxid='';
    if(req.body&&req.body.wxid){
      wxid = req.body.wxid;
    }else if(req.query&&req.query.wxid){
      wxid = req.query.wxid;
    }
    var now = moment().format('X');
    WechatService.init(req, res, function (api) {
      sails.log.warn('api.getTicket api:::'+JSON.stringify(api));
      api.registerTicketHandle(function(type, callback){
        Wx_config.findOne(wxid).exec(function (err, obj) {
          if (obj.jsapi_ticket && obj.jsapi_time>0 && now - obj.jsapi_time < 7150) {
            callback(null, JSON.parse(obj.jsapi_ticket));
          } else {
            api.getTicket(function (e, result) {
              if (result) {
                Wx_config.update({id: wxid}, {jsapi_ticket: JSON.stringify(result), jsapi_time: now}).exec(function (eu, ou) {
                });
                callback(null, result);
              }
            });
          }
        });
      }, function(type, _ticketToken, callback){
        sails.log.warn('_ticketToken:::'+JSON.stringify(_ticketToken));
        Wx_config.update({id: wxid}, {jsapi_ticket: JSON.stringify(_ticketToken), jsapi_time: now}).exec(function (eu, ou) {
          callback(null);
        });
      });
      callback(api);
    });
  }
};
