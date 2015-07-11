var express = require('express');
var router = express.Router();

var sha1 = require('../base/sha1.js');
var sha1Key = require('../config/sha1KeyConf.js');

var adminDao = require('../dao/adminDao.js');


router.get('/',function(req,res){
	if(!req.session || req.session.adminIsLogin != true){
		next();
	}
	res.render('adminChangePassword.ejs',{
		title: '修改密码',
		css:['css/adminchangepass.min.css'],
		js: ['components/jquery/jquery.min.js','components/layer/src/layer.js','components/bootstrap/js/bootstrap.min.js','js/adminchangepass.min.js'],

	});



});




router.post('/',function(req,res){
	var newValue;
	var account = req.session.adminAccount;
	
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;

	oldPassword = sha1.getSha1(sha1Key+oldPassword);

	adminDao.queryByAccount(account,function(results){
		if(results == "error"){
			res.send("error");
			res.end();
		}else{
			if(results[0].password == oldPassword){
				newValue = sha1.getSha1(sha1Key+newPassword);
				adminDao.updateByValueByAccount("password",newValue,account,function(results){
					if(results=="error"){
						res.send("error");
						res.end();
					}else{
						req.session.destroy();
						res.send("success");
						res.end();
					}
				});
			}else{
				res.send("passwrong");
				res.end();
			}
		}

	});


});



module.exports = router;