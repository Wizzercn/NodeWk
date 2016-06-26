/**
 * Created by Wizzer.cn on 1/18/16.
 */
var moment = require('moment');
module.exports = {
  index: function (req, res) {
    var id=req.query.id||'';
    var w=req.query.w||36;
    var h=req.query.w||36;
    var watermark=req.query.watermark||0;
    var type=req.query.type||'';//'' 默认文件路径,db :存数据库  shop:存数据库并生成大中小三图
    req.data.id=id;
    req.data.w=w;
    req.data.h=h;
    req.data.watermark=watermark;
    req.data.type=type;
    return res.view('private/img/image/index', req.data);
  }
};
