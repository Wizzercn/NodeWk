/**
 * Created by Wizzer.cn on 3/9/16.
 */
var redis = require("redis");
var client = redis.createClient(sails.config.redis);
client.on("error", function (err) {
  sails.log("Redis error::" + err);
});
module.exports = {
  set: function (key, val, time,cb) {
    client.set(key, val, function (err, reply){
      if (time && time > 0) {
        client.expire(key, time);//单位:秒
      }
      cb(err,reply);
    });
  },
  get: function (key,cb) {
    client.get(key, function (err, reply) {
      cb(err,reply);
    });
  }
};
