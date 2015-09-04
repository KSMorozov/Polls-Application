var User    = require('../../models/user');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var secret  = config.secret;

var login = function (req, res, next) {
  User.findOne({
    username: req.body.username
  })
  .select('username')
  .select('password')
  .exec(function(err, user) {
    if (err)   return next(err);
    if (!user) return res.sendStatus(401);
    user.comparePassword(req.body.password, function (err, isValid) {
      if (err) next(err);
      if (!isValid) return res.sendStatus(401);
      var token = jwt.sign({
          username : user.username,
          _id : user._id
        }, config.secret, {
        expiresInMinutes : 1440
      });
      res.json({ token : token });
    });
  });
};

module.exports = login;
