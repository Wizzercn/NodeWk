/**
 * Created by Wizzer.cn on 11/5/15.
 */
var moment = require('moment');
module.exports = {
  index: function (req, res) {
    Img_config.findOrCreate({id: 1}).exec(function (err, obj) {
      req.data.obj = obj;
      return res.view('private/conf/img/index', req.data);
    });
  },
  editDo: function (req, res) {
    var body = req.body;
    body.updatedAt=moment().format('X');
    Img_config.update({id: body.id}, body).exec(function (err, obj) {
      if (err)return res.json({code: 1, msg: sails.__('update.fail')});
      return res.json({code: 0, msg: sails.__('update.ok')});
    });
  }
};
