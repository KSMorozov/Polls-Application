var express = require('express');
var config = require('../config');
var router  = express.Router();
var secret  = config.secret;

var users   = require('./api/users');
var polls   = require('./api/polls');
var me      = require('./api/me');

router.get ('/users'     , users.getall);
router.get ('/users/:id' , users.getone);

router.get('/me', me);

router.post('/polls', polls.post);
router.get ('/polls', polls.get);

module.exports = router;
