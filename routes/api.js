var User    = require('../models/user');
var config  = require('../config');
var express = require('express');
var router  = express.Router();
var secret  = config.secret;

router.post('/signup', function (req, res, next) {
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
});

module.exports = router;
