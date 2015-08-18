var User    = require('../../models/user');

var users = function (req, res, next) {
  User.find(function (err, users) {
    if (err) res.send(err);
    res.json(users);
  });
};

module.exports = users;
