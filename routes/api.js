var User    = require('../models/user');
var config  = require('../config');
var express = require('express');
var jwt     = require('jsonwebtoken');
var router  = express.Router();
var secret  = config.secret;

var signup  = require('./api/signup');
var login   = require('./api/login');
var users   = require('./api/users');
var polls   = require('./api/polls');
var me      = require('./api/me');

router.post('/signup', signup);
router.post('/login' , login);
router.get ('/users' , users);

router.get('/me', me);

router.post('/polls', polls.post);
router.get ('/polls', polls.get);

module.exports = router;
