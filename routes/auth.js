var express = require('express');
var config = require('../config');
var router  = express.Router();
var secret  = config.secret;

var signup  = require('./auth/signup');
var login   = require('./auth/login');

router.post('/signup'    , signup);
router.post('/login'     , login);

module.exports = router;
