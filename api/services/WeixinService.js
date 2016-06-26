/**
 * Created by Wizzer.cn on 10/26/15.
 */
var sha1 = require('sha1'), xml2js = require('xml2js');
module.exports = {
  /**
   * 签名验证
   * @param req
   * @param token
   * @returns {boolean}
   */
  checkSignature: function (req, token) {
    var signature = req.query.signature,
      timestamp = req.query.timestamp,
      nonce = req.query.nonce,
      echostr = req.query.echostr;
    // 按照字典排序
    var array = [token, timestamp, nonce];
    array.sort();
    // 连接
    var str = sha1(array.join(""));
    // 对比签名
    return str == signature;
  },
  /**
   * 监听用户消息
   * @param req
   * @param callback
   */
  loop: function (req, callback) {
    var body = req.body.toString('utf-8');
    var data = {};
    xml2js.parseString(body, function (err, json) {
      if (err) {
      } else {
        data.type = json.xml.MsgType.toString();
        data.openid = json.xml.FromUserName.toString();
        if (data.type == 'text') {
          data.txt = json.xml.Content.toString();
        } else if (data.type == 'image') {
          data.pic = json.xml.PicUrl.toString();
        } else if (data.type == 'event') {
          data.event = json.xml.Event.toString();
          if (data.event == 'CLICK') {
            data.eventKey = json.xml.EventKey.toString();
          }
        }
        return callback(data);
      }
    });
  },
  /**
   * 发送文本消息
   * @param res
   * @param msg
   */
  sendTextMsg: function (res, msg) {
    var time = Math.round(new Date().getTime() / 1000);

    var funcFlag = msg.funcFlag ? msg.funcFlag : 0;

    var output = "" +
      "<xml>" +
      "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
      "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
      "<CreateTime>" + time + "</CreateTime>" +
      "<MsgType><![CDATA[text]]></MsgType>" +
      "<Content><![CDATA[" + msg.content + "]]></Content>" +
      "<FuncFlag>" + funcFlag + "</FuncFlag>" +
      "</xml>";

    res.type('xml');
    res.send(output);
  },
  /**
   * 发送图文消息
   * @param res
   * @param msg
   */
  sendNewsMsg: function (res, msg) {
    var time = Math.round(new Date().getTime() / 1000);
    var articlesStr = "";
    for (var i = 0; i < msg.articles.length; i++) {
      articlesStr += "<item>" +
        "<Title><![CDATA[" + msg.articles[i].title + "]]></Title>" +
        "<Description><![CDATA[" + msg.articles[i].description + "]]></Description>" +
        "<PicUrl><![CDATA[" + msg.articles[i].picUrl + "]]></PicUrl>" +
        "<Url><![CDATA[" + msg.articles[i].url + "]]></Url>" +
        "</item>";
    }

    var funcFlag = msg.funcFlag ? msg.funcFlag : 0;
    var output = "" +
      "<xml>" +
      "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
      "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
      "<CreateTime>" + time + "</CreateTime>" +
      "<MsgType><![CDATA[news]]></MsgType>" +
      "<ArticleCount>" + msg.articles.length + "</ArticleCount>" +
      "<Articles>" + articlesStr + "</Articles>" +
      "<FuncFlag>" + funcFlag + "</FuncFlag>" +
      "</xml>";

    res.type('xml');
    res.send(output);
  }
};
