var User    = require('../models/user');
var config  = require('../config');
var express = require('express');
var jwt     = require('jsonwebtoken');
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

router.get('/users', function (req, res, next) {
  User.find(function (err, users) {
    if (err) res.send(err);
    res.json(users);
  });
});

router.post('/login', function (req, res) {
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
          var token = jwt.sign({ username : user.username }, config.secret, {
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
});

module.exports = router;
