var express = require('express');
var router = express.Router();

var adminDao = require('../dao/adminDao.js');

var sha1Key = require('../config/sha1KeyConf.js');
var sha1 = require('../base/sha1.js');



router.get('/',function(req,res,next){
	if(!req.session || req.session.adminIsLogin != true || req.session.adminRight!=0){
		next();
	}else{
		res.render('adminAddAdmin.ejs',{
			title: '添加管理员',
			active: 5,
			css:['css/addadmin.min.css'],
			js: ['components/jquery/jquery.min.js','components/layer/src/layer.js','components/bootstrap/js/bootstrap.min.js','js/addadmin.min.js'],
			right:req.session.adminRight
		});
	}	
});




router.post('/',function(req,res){
	if(!req.session || req.session.adminIsLogin != true || req.session.adminRight!=0){
		next();
	}


	var account = req.body.account;
	var password = req.body.password;
	var myPassword = req.body.myPassword;
	var right = req.body.right;
	var myaccount = req.session.adminAccount;

	myPassword = sha1.getSha1(sha1Key+myPassword);

	adminDao.queryByAccount(myaccount,function(results){
		if(results === 'error'|| results.length ==0){
			res.send('error');
			res.end();
		}else if(results[0].password === myPassword){
			//console.log(message);
			adminDao.insert({
				account:account,
				password:sha1.getSha1(sha1Key+password),
				right:right
			},function(results){
				if(results === 'error'){
					res.send('error');
					res.end();
				}else if(results.affectedRows == 1){
					res.send('success');
					res.end();
				}
			});	

		}else{
			res.send("passwrong");
			res.end();
		}
	});

});


module.exports = router;