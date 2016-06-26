/**
 * 通过Img_image表ID读取图片文件
 * Created by Wizzer.cn on 1/18/16.
 */
var moment = require("moment");
module.exports = {
  /**
   * type: s 小图 m 中图 l 大图
   * @param req
   * @param res
   * @returns {*}
   */
  file: function (req, res) {

    var id=req.params.id||'';
    var type=req.query.type||'';
    if(id.indexOf('.')>0){
      id=id.substring(0,id.indexOf('.'));
      Img_image.findOne(id).exec(function(e,o){
        if(o){
          var modi=req.get('If-Modified-Since');
          var up=moment(o.updatedAt*1000).toDate().toUTCString();
          if(modi == up){//缓存
            return res.send(304);
          }
          var path=o.src;
          if(type=='s'&& o.s_src){
            path=o.s_src;
          }else if(type=='m'&& o.m_src){
            path=o.m_src;
          }else if(type=='l'&& o.l_src){
            path=o.l_src;
          }
          res.set('Last-Modified',up);
          return res.status(200).sendfile(sails.config.appPath+path);
        }else{
          return res.send(404,'not exist');
        }
      });
    }else{
      return res.send(404,'not exist');
    }

  }
};
