var express = require('express');
var router = express.Router();

var sha1Key = require('../config/sha1KeyConf.js');
var sha1 = require('../base/sha1.js');

var adminDao = require('../dao/adminDao.js');


router.get('/',function(req,res){
	res.render('adminLogin.ejs');
});

router.post('/',function(req,res){
	var account = req.body.account;
	var password = req.body.password;

	password = sha1.getSha1(sha1Key+password);

	adminDao.queryByAccount(account,function(results){
		console.log(results);
		if(results === 'error' || results.length ==0){
			res.send('error');
		}else if(results[0].password === password){
			req.session.adminIsLogin = true;
			req.session.adminAccount = results[0].account;
			req.session.adminRight = results[0].right;
			
			res.send('success');
		}else{
			res.send('error');
		}
		res.end();
	});
});
module.exports = router;