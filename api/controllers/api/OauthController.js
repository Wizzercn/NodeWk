/**
 * Created by wizzer on 2016/5/23.
 */
var StringUtil = require('../../common/StringUtil');
var moment = require('moment');
var jwt = require('jwt-simple');
module.exports = {
  token: function (req, res) {
    try {
      var client_id = req.body.client_id || '';
      var client_secret = req.body.client_secret || '';
      Api_token.findOne({client_id: client_id}).exec(function (e, o) {
        if (e||!o) {
          return res.json({code: 1, msg: 'client_id has error'});
        }
        if (o.disabled) {
          return res.json({code: 2, msg: 'client_id has disabled'});
        }
        if (client_secret != o.client_secret) {
          return res.json({code: 3, msg: 'client_secret has error'});
        }
        var expires = moment().add(1,'days').valueOf();
        var token = jwt.encode(
          {
            iss: o.id,
            exp: expires
          },
          sails.config.system.MyConfig.jwtTokenSecret||''
        );
        return res.json({code:0,msg:'success',data:{
          token : token,
          expires : expires,
          appid : o.id
        }});
      });
    } catch (err) {
      return res.json({code: 4, msg: 'params error'});
    }
  }
};
