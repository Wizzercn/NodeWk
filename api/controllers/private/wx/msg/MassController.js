/**
 * Created by wizzer on 2016/5/6.
 */
var moment = require('moment');
var emoji = require('emoji');
var StringUtil = require('../../../../common/StringUtil');
var fs = require('fs-extra');
module.exports = {
  index: function (req, res) {
    var wxid = req.params.id || '';
    Wx_config.find({select: ['id', 'appname']}).exec(function (err, list) {
      req.data.wxlist = list;
      if (!wxid && list && list.length > 0) {
        wxid = list[0].id;
      }
      req.data.wxid = wxid;
      return res.view('private/wx/msg/mass/index', req.data);
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
  news: function (req, res) {
    req.data.wxid = req.params.id || '';
    return res.view('private/wx/msg/mass/news', req.data);
  },
  newsData: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var order = req.body.order || [];
    var wxid = req.body.wxid;
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (wxid) {
      where.wxid = wxid;
    }
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Wx_mass_news.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Wx_mass_news.find(where)
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
  addNews: function (req, res) {
    req.data.wxid = req.params.id || '';
    req.session.wxid = req.params.id || '0';
    return res.view('private/wx/msg/mass/add', req.data);
  },
  uploadThumb: function (req, res) {
    var wxid = req.params.id || '';
    if(!wxid||wxid=='0'){
      return res.json({code: 2, msg: '请配置公众号'});
    }
    req.file('Filedata').upload({
      maxBytes: 2048000
    }, function (err, uploadedFiles) {
      if (err) {
        return res.json({code: 2, msg: sails.__('file.upload.err') + ' ' + err});
      } else {
        var type = uploadedFiles[0].type;
        var fd = uploadedFiles[0].fd;
        var filename = uploadedFiles[0].filename;
        if (uploadedFiles.length === 0) {
          return res.json({code: 2, msg: sails.__('file.upload.err')});
        } else if (type.indexOf('image') != 0) {
          return res.json({code: 3, msg: sails.__('file.upload.only.image')});
        } else {
          if (err)return res.json({code: 2, msg: sails.__('file.upload.err') + ' ' + err});
          WechatService.init_id(wxid, function (api) {
            api.uploadMedia(fd, 'thumb', function (e, r) {
              sails.log.debug('thumb:::' + JSON.stringify(r));
              if (!e) {
                return res.json({
                  code: 0,
                  msg: sails.__('file.upload.ok'),
                  filename: filename,
                  media_id: r.thumb_media_id
                });
              } else {
                return res.json({code: 2, msg: sails.__('file.upload.err') + ' ' + e});
              }
            });
          });
        }
      }
    });
  },
  addDo: function (req, res) {
    var body = req.body;
    body.createdBy = req.session.user.id;
    Wx_mass_news.create(body).exec(function (e, o) {
      if (e)return res.json({code: 1, msg: sails.__('add.fail')});
      return res.json({code: 0, msg: sails.__('add.ok')});
    });
  },
  deleteNews: function (req, res) {
    var ids = req.params.id || req.body.ids;
    Wx_mass_news.destroy({id: ids}).exec(function (err) {
      if (err) {
        return res.json({code: 1, msg: sails.__('delete.fail')});
      } else {
        return res.json({code: 0, msg: sails.__('delete.ok')});
      }
    });
  },
  select: function (req, res) {
    req.data.wxid = req.params.id || '';
    return res.view('private/wx/msg/mass/select', req.data);
  },
  send: function (req, res) {
    req.data.wxid = req.params.id || '';
    return res.view('private/wx/msg/mass/send', req.data);
  },
  sendDo: function (req, res) {
    sails.log.debug(req.body);
    var wxid = req.body.wxid || '';
    if(!wxid){
      return res.json({code: 1, msg: '请配置公众号'});
    }
    var type = req.body.type || '';//text  news
    var content = req.body.content || '';//news==ids
    var scope = req.body.scope || '';//some==ids
    var openids = req.body.openids || '';// one  more
    var openidList = [];
    async.waterfall([function (cb) {
      //获取接收人清单
      if (scope == 'all') {
        //范围是全部 取关注的人员openid数组
        Wx_user.find({select: ['openid'], where: {wxid: wxid, subscribe: 1}}).exec(function (e, l) {
          var str = [];
          if (l) {
            l.forEach(function (lo) {
              str.push(lo.openid);
            });
          }
          return cb(null, str);
        });
      } else {
        //openid列表转为数组，排除空元素
        var returnStr = [];
        if (openids.indexOf(',') > 0) {
          var str = [];
          str = openids.split(",");
          str.forEach(function (so) {
            if (so && so.length > 1) {
              returnStr.push(so);
            }
          });
        } else {
          returnStr.push(openids);
        }
        return cb(null, returnStr);
      }
    }, function (olist, cb) {
      //根据发送类型 获取media_id
      openidList = olist;
      sails.log.debug('openidList::' + JSON.stringify(openidList));
      if (type == 'news') {
        var ids = content.split(',');
        Wx_mass_news.find({id: ids}).exec(function (ne, nlist) {
          if (nlist && nlist.length > 0) {
            var articles = [];
            ids.forEach(function (id) {
              nlist.forEach(function (news) {
                if (StringUtil.getInt(id) == news.id) {
                  articles.push(news);
                }
              });
            });
            WechatService.init_id(wxid, function (api) {
              api.uploadNews({articles: articles}, function (une, unr) {
                if (une) return cb(null, '');
                return cb(null, unr.media_id);
              });
            });
          } else return cb(null, '');
        });
      } else return cb(null, '');
    }, function (media_id, cb) {
      sails.log.debug('media_id::' + media_id);
      //创建发送表
      req.body.createdBy = req.session.user.id;
      req.body.status = 0;
      req.body.media_id = media_id || '';
      Wx_mass.create(req.body).exec(function (e, o) {
        if (e)return cb(null, 0);
        return cb(null, o.id);
      });
    }, function (massId, cb) {
      //分割openlist 每10000个一个数组
      var list = [];
      for (var i = 0; i < openidList.length; i = i + 10000) {
        list.push(openidList.slice(i, i + 10000));
      }
      var t1 = 0;
      WechatService.init_id(wxid, function (api) {
        list.forEach(function (l) {
          if (type == 'news') {
            api.massSendNews(req.body.media_id, l, function (errNews, resultNews) {
              sails.log.debug('massSendNews::' + JSON.stringify(resultNews));
              if (!errNews) {
                Wx_mass_send.create({
                  massId: massId,
                  receivers: l.toString(),
                  status: resultNews.errcode > 0 ? 2 : 1,
                  msg_id: resultNews.msg_id,
                  errcode: resultNews.errcode,
                  errmsg: resultNews.errmsg,
                  createdBy: req.session.user.id,
                  wxid: wxid
                }).exec(function (se, so) {
                  t1++;
                  if (t1 == list.length || list.length == 0)
                    return cb(null, '');
                });
              } else {
                t1++;
                if (t1 == list.length || list.length == 0)
                  return cb(null, '');
              }
            });
          } else {
            api.massSendText(req.body.content, l, function (errText, resultText) {
              sails.log.debug('massSendText::' + JSON.stringify(resultText));
              if (!errText) {
                Wx_mass_send.create({
                  massId: massId,
                  receivers: l.toString(),
                  status: resultText.errcode > 0 ? 2 : 1,
                  msg_id: resultText.msg_id,
                  errcode: resultText.errcode,
                  errmsg: resultText.errmsg,
                  createdBy: req.session.user.id,
                  wxid: wxid
                }).exec(function (se, so) {
                  t1++;
                  if (t1 == list.length || list.length == 0)
                    return cb(null, '');
                });
              } else {
                t1++;
                if (t1 == list.length || list.length == 0)
                  return cb(null, '');
              }
            });
          }
        });
      });
    }], function (err, result) {
      if (err) return res.json({code: 1, msg: '操作失败'});
      return res.json({code: 0, msg: '操作成功'});
    });
  },
  massData: function (req, res) {
    var pageSize = parseInt(req.body.length);
    var start = parseInt(req.body.start);
    var page = start / pageSize + 1;
    var draw = parseInt(req.body.draw);
    var order = req.body.order || [];
    var wxid = req.body.wxid;
    var columns = req.body.columns || [];
    var sort = {};
    var where = {};
    if (wxid) {
      where.wxid = wxid;
    }
    if (order.length > 0) {
      sort[columns[order[0].column].data] = order[0].dir;
    }
    Wx_mass.count(where).exec(function (err, count) {
      if (!err && count > 0) {
        Wx_mass.find(where)
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
  detail: function (req, res) {
    var id = req.params.id;
    Wx_mass.findOne(id).exec(function (e, o) {
      req.data.obj = o || {};
      Wx_mass_send.find({massId: id}).exec(function (es, ls) {
        req.data.sends =ls|| [];
        if (o && o.type == 'news') {
          var ids=o.content.split(',');
          Wx_mass_news.find({id: ids}).exec(function (el, l) {
            var str=[];
            ids.forEach(function(o){
              l.forEach(function(o2){
                if(o2.id==StringUtil.getInt(o)){
                  str.push(o2);
                }
              });
            });
            req.data.news=str||[];
            return res.view('private/wx/msg/mass/detail', req.data);
          });
        } else {
          req.data.news = [];
          return res.view('private/wx/msg/mass/detail', req.data);
        }
      });
    });
  }
};
