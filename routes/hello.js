var express = require('express');
var router  = express.Router();

router.get('/', function (req, res, next) {
  res.render('hello', { title : 'Hello, World! B O Y S'});
});

module.exports = router;
