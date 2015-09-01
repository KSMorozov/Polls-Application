var User    = require('../../models/user');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var secret  = config.secret;

var me = function (req, res) {
  User.findOne({ username : req.user.username}, function (err, user) {
    res.json(user);
  });
};

module.exports = me;
