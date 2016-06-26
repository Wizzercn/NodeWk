/**
 * Created by Wizzer.cn on 9/9/15.
 */
module.exports = {
  login: function (req, res) {
    return res.view('private/login.ejs',{layout: 'layouts/login'});
  }
};
