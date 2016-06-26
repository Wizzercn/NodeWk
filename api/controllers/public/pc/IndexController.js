/**
 * Created by Wizzer.cn on 9/9/15.
 */
module.exports = {
  index: function (req, res) {
    return res.view('public/pc/index.ejs',req.data);
  },
  framework:function(req,res){
    return res.view('public/pc/framework.ejs',req.data);
  },
  nodeshop:function(req,res){
    return res.view('public/pc/nodeshop.ejs',req.data);
  },
  about:function(req,res){
    return res.view('public/pc/about.ejs',req.data);
  }
};
