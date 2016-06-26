/**
 * Created by Wizzer.cn on 10/1/15.
 */
var md5 = require('md5');
module.exports = {
  /**
   * 计算树路径自动补0
   * @param num
   * @param n
   * @returns {*}
   */
  getPath: function (num, n) {
    var str = num.toString();
    var len = str.length;
    while (len < n) {
      str = '0' + str;
      len++;
    }
    return str;
  },
  /**
   * 取随机字符串
   * @param len
   * @returns {string}
   */
  randomString: function (len) {
    len = len || 6;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  getUuid: function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      var r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  /**
   * 取随机数
   * @param min
   * @param max
   * @returns {*}
   */
  randomInt: function (min, max) {
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
  },
  /**
   * 取5的倍数随机数
   * @param min
   * @param max
   * @returns {*}
   */
  randomInt5: function (min, max) {
    var s = [];
    for (var i = min; i <= max; i = i + 5) {
      s.push(i);
    }
    var Range = s.length - 1;
    var Rand = Math.random();
    var p = Math.round(Rand * Range);
    if (s[p]) {
      return (s[p]);
    } else {
      return (max);
    }
  },
  randomNum: function (num) {
    var Num = "";
    for (var i = 0; i < num; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    return Num;
  },
  /**
   * 密码加密
   * @param password
   * @param loginname
   * @param createAt
   * @returns {string}
   */
  password: function (password, loginname, createAt) {
    var p = md5(md5(password) + loginname + createAt);
    return 'w' + p.substring(0, p.length - 1);
  },
  /**
   * 补0
   * @param num
   * @param n
   * @returns {*}
   */
  getSn: function (num, n) {
    var len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  },
  /**
   * 字符串转int价格
   * @param str
   * @returns {*}
   */
  getPrice: function (str) {
    if (typeof str == 'undefined' || str == '' || str == null || str == 'null' || str == 'undefined') {
      return 0;
    }
    if (str.indexOf('.') > 0) {
      var s = str.substring(0, str.indexOf('.'));
      var p = str.substring(str.indexOf('.') + 1);
      if (p.length > 1) {
        return parseInt(s + p.substring(0, 2));
      } else if (p.length == 1) {
        return parseInt(s + p + '0');
      } else {
        return parseInt(s + '00');
      }
    } else {
      return parseInt(str + '00');
    }
  },
  /**
   * int转字符串价格
   * @param str
   * @returns {string}
   */
  setPrice: function (str) {
    if (typeof str == 'string' && str.length > 2) {
      return str.substring(0, str.length - 2) + '.' + str.substring(str.length - 2);
    }else if(typeof str == 'string' && str.length == 2){
      return '0.'+str;
    }else if(typeof str == 'string' && str.length == 1){
      return '0.0'+str;
    }else if(typeof str == 'string'){
      return '0.00';
    }
    if (typeof str == 'number') {
      var s = str.toString();
      return this.setPrice(s);
    }
    return '0.00';
  },
  getInt: function (str) {
    if (typeof str == 'undefined' || str == '' || str == null || str == 'null' || str == 'undefined') {
      return 0;
    }
    return parseInt(str);
  },
  getFloat: function (str) {
    if (typeof str == 'undefined' || str == '' || str == null || str == 'null' || str == 'undefined') {
      return 0;
    }
    return parseFloat(str);
  },
  /**
   * 对数组进行排序
   * @param key
   * @param desc
   * @returns {Function}
   */
  arrSort: function (key, desc) {
    return function (a, b) {
      return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
  },
  getIp:function(req){
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  }
};
