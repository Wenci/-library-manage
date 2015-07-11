var express = require('express');
var router = express.Router();

var logger = require('../base/log.js')("info");

var userDao = require('../dao/userDao.js');


var mailer = require('../base/mailer.js');

router.get('/', function(req, res) {
  	res.render('index', {
  		userName: req.cookies.uname
  	});
});

module.exports = router;
