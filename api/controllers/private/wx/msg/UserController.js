/**
 * Created by wizzer on 2016/5/6.
 */
var moment = require('moment');
var emoji = require('emoji');
var StringUtil = require('../../../../common/StringUtil');
module.exports = {
  index: function (req, res) {
    var wxid = req.params.id || '';
    Wx_config.find({select: ['id', 'appname']}).exec(function (err, list) {
      req.data.wxlist = list;
      if (!wxid && list && list.length > 0) {
        wxid = list[0].id;
      }
      req.data.wxid = wxid;
      return res.view('private/wx/msg/user/index', req.data);
    });
  },
  data: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var order = req.body.order || [];
    var wxid = req.body.wxid;
    var nickname = req.body.nickname;
    var content = req.body.content;
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (wxid) {
      where.wxid = wxid;
    }
    if (nickname) {
      where.nickname = {'like': '%' + nickname + '%'};
    }
    if (content) {
      where.content = {'like': '%' + content + '%'};
    }
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Wx_msg.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Wx_msg.find(where)
          .sort(sort)
          .paginate({page: page, limit: pageSize})
          .exec(function (err, list) {
            return res.json({
              "draw": draw,
              "recordsTotal": pageSize,
              "recordsFiltered": count,
              "data": list
            });
          });
      } else {
        return res.json({
          "draw": draw,
          "recordsTotal": pageSize,
          "recordsFiltered": 0,
          "data": []
        });
      }
    });
  },
  reply:function(req,res){
    var id=req.params.id;
    var type=req.query.type;
    Wx_msg.findOne(id).exec(function(e,o){
      req.data.obj=o||{};
      req.data.type=type||0;
      return res.view('private/wx/msg/user/reply', req.data);
    });
  },
  replyData: function (req, res) {
    var openid = req.query.openid;
    var start=StringUtil.getInt(req.query.start);
    var pageSize=StringUtil.getInt(req.query.pageSize)||5;
    var sort = {createdAt:'desc'};
    var where = {};
    if (openid) {
      where.openid = openid;
    }
    Wx_msg.getPageList(pageSize,start,where,sort, function (obj) {
      return res.json(obj);
    });
  },
  replyDo: function (req, res) {
    var id=req.body.id;
    var openid=req.body.openid;
    var wxid=req.body.wxid;
    var uid=req.body.uid;
    var content=req.body.content;
    WechatService.init_id(wxid, function (api) {
      api.sendText(openid, content, function(err,result){
        if(result&&result.errcode==0){
          Wx_msg_reply.create({
            msgid:id,
            uid:uid,
            openid:openid,
            type:'text',
            content:content,
            createdBy:req.session.user.id,
            createdAt: moment().format('X'),
            wxid:wxid
          }).exec(function(e,o){
            if(o){
              Wx_msg.update(id,{replyId: o.id}).exec(function(eu,ou){});
            }
            return res.json({code:0,msg:'发送成功'});
          });
        }else
          return res.json({code:1,msg:'发送失败'});
      });
    });
  }
};
