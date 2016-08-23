/**
 * Created by wizzer on 2016/5/23.
 */
var url = require('url');
var jwt = require('jwt-simple');
module.exports = function (req, res, next) {
  var token = (req.body && req.body.token) || req.query.token || req.headers["x-token"];
  if (token) {
    try {
      var decoded = jwt.decode(token, sails.config.system.MyConfig.jwtTokenSecret||'RrRO6ZNVLayReZD4KwaBQ7J3uM94Wk6D');
      if (decoded.exp <= Date.now()) {
        // Api_token.findOne({client_id})

        return res.json({code:1,msg:'token has expired'});
      }
      req.appid = decoded.iss;
      return next()
    } catch (err) {
      return res.json({code:2,msg:'token has error'});
    }
  } else {
    return res.json({code:3,msg:'token is Required'});
  }
};
