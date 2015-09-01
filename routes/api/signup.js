var User    = require('../../models/user');

signup = function (req, res, next) {
  var user = new User({
    username : req.body.username,
    password : req.body.password
  });

  user.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return next(err);
    }
    res.send(201);
  });
};

module.exports = signup;
