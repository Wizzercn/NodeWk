/**
 * Created by Wizzer.cn on 10/25/15.
 */
var moment = require('moment');
var emoji = require('emoji');
module.exports = {
  index: function (req, res) {
    var wxid = req.params.id || '';
    Wx_config.find({select: ['id', 'appname']}).exec(function (err, list) {
      req.data.wxlist = list;
      if (!wxid && list && list.length > 0) {
        wxid = list[0].id;
      }
      req.data.wxid = wxid;
      return res.view('private/wx/user/index', req.data);
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
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (wxid) {
      where.wxid = wxid;
    }
    if (nickname) {
      where.nickname = {'like': '%' + nickname + '%'};
    }
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Wx_user.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Wx_user.find(where)
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
  down: function (req, res) {
    var wxid = req.body.wxid||'';
    if(!wxid){
      return res.json({code: 1, msg: '同步失败,请配置公众号'});
    }
    WechatService.init(req, res, function (api) {
      if (api) {
        Wx_user.getFollow('',api, 0,wxid);
        return res.json({code: 0, msg: '同步成功,请稍等几秒后刷新本页面'});
      } else {
        return res.json({code: 1, msg: '同步失败,微信帐号信息配置错误'});

      }
    });

  }
};
