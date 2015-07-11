var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao.js');


var sha1 = require('../base/sha1.js');
var sha1Key = require('../config/sha1KeyConf.js');



router.get('/',function(req,res){
	var account = req.session.account;

	userDao.queryAccount(account,function(results){
		if(results == "error"){
			next("dberror");
		}else{
			console.log(results);
			res.render('userPersonal.ejs',{
				userName: req.cookies.uname,
				user:results[0]
			});
		}
	});


});

router.post('/',function(req,res){
	var type = req.body.type;
	var newValue;
	var account = req.session.account;
	if(type == "password"){
		var oldPassword = req.body.oldPassword;
		var newPassword = req.body.newPassword;

		oldPassword = sha1.getSha1(sha1Key+oldPassword);

		userDao.verify(account,function(results){
			if(results == "error"){
				res.send("error");
				res.end();
			}else{
				if(results[0].password == oldPassword){
					newValue = sha1.getSha1(sha1Key+newPassword);
					userDao.updateByValueByAccount(type,newValue,account,function(results){
						if(results=="error"){
							res.send("error");
							res.end();
						}else{
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
	}else{
		newValue = req.body.newValue;
		userDao.updateByValueByAccount(type,newValue,account,function(results){
			if(results=="error"){
				res.send("error");
				res.end();
			}else{
				res.send("success");
				res.end();
			}
		});
	}


});





module.exports = router;