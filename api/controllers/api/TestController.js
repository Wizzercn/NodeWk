/**
 * Created by wizzer on 2016/8/23.
 */
var StringUtil = require('../../common/StringUtil');
var moment = require('moment');
module.exports = {
    sayHi: function (req, res) {
        return res.json({code: 0, msg: 'hi wizzer'});
    }
};