var User    = require('../../models/user');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var secret  = config.secret;

var login = function (req, res) {
  User.findOne({
    username: req.body.username
  })
  .select('username')
  .select('password')
  .exec(function(err, user) {
    if (err)   throw err;
    if (!user) res.send({ message : 'Authentication failed. User not found.' });
    else if (user) {
      user.comparePassword(req.body.password, function (err, isValid) {
        if (err) throw err;
        if (!isValid) res.send({
          message : 'Authentication failed. Invalid password.'
        });
        else {
          var token = jwt.sign({
              username : user.username,
              _id : user._id
            }, config.secret, {
            expiresInMinutes : 1440
          });
          res.json({
            message : 'Successfully Autheticated, token signed.',
            token   : token
          });
        }
      });
    }
  });
};

module.exports = login;
