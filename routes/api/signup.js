var User    = require('../../models/user');

signup = function (req, res, next) {
  var user = new User({
    username : req.body.username,
    password : req.body.password
  });

  user.save(function (err) {
    if (err) res.send(err);
    res.json({
      message : 'User has been created!'
    });
  });
};

module.exports = signup;
