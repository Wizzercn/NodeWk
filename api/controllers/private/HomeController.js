/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  index: function (req, res) {
    var data=req.data;
    sails.log.debug('data::'+JSON.stringify(data));
    return res.view('private/index.ejs',data);

  }
};

