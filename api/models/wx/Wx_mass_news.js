/**
 * Created by wizzer on 2016/5/9.
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
    thumb_media_id:{//图文消息缩略图的media_id
      type: 'string',
      required: true
    },
    author:{//图文消息的作者
      type:'string',
      size:30
    },
    title:{//图文消息的标题
      type:'string',
      required: true
    },
    content_source_url:{//“阅读原文”
      type:'string'
    },
    content:{//具备微信支付权限的公众号，可以使用a标签，其他公众号不能使用
      type:'text',
      required: true
    },
    digest:{//图文消息的描述
      type:'text'
    },
    show_cover_pic:{//是否显示封面，1为显示，0为不显示
      type:'integer'
    },
    createdBy:{
      type: 'integer'
    },
    createdAt:{
      type:'integer',
      defaultsTo:function(){
        return moment().format('X');
      }
    },
    wxid: {
      model: 'Wx_config'
    }
  }
};
