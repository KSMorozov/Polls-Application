var User    = require('../../models/user');

module.exports = {
  getall : function (req, res, next) {
    User.find(function (err, users) {
      if (err) res.send(err);
      res.json(users);
    });
  },
  getone : function (req, res, next) {
    User.findById(req.body.id, function (err, user) {
      if (err) return res.send(err);
      res.json(user);
    });
  }
};
