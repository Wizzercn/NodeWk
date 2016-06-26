/**
 * Created by Wizzer.cn on 10/19/15.
 */
var StringUtil = require('../common/StringUtil');
module.exports = function (req, res, next) {
    var ip=StringUtil.getIp(req);
    var passed=false;
    sails.log.debug('ip::'+ip);
    Sys_ip.find({disabled:false}).exec(function(e,l){
        if(l&& l.length>0){
            l.forEach(function(o){
                if(o.ip.indexOf(':')>0){//ipv6
                    if(ip== o.ip)
                        passed=true;
                }else{
                    if(ip== '::ffff:'+o.ip||ip== '::ffff:127.0.0.1'||ip== o.ip)
                        passed=true;
                }
            });
            if(passed){
                return next();
            }else{
                return res.forbidden('IP受限');
            }
        }else{
            return next();
        }
    });
};
