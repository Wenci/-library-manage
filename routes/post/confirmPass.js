var express = require('express');
var router = express.Router();

var cookieDao = require('../../dao/cookieDao.js');
var userDao = require('../../dao/userDao.js');

var sha1 = require('../../base/sha1.js');
var sha1Key = require('../../config/sha1KeyConf.js');

router.post('/',function(req,res){

	var password = req.body.password;
	var loginKey = req.cookies.lok;
	if(!loginKey){
		res.redirect('/login');
		res.end();
		return;
	}
	cookieDao.queryCookieByCookie({cookie:loginKey},function(results){
		if(results === "error"){
			res.redirect('/login');
			res.end();
		}else if(results.length === 1&&results[0].cookie === loginKey){
			password = sha1.getSha1(sha1Key+password);
			var account = results[0].account;
			userDao.verify(results[0].account,function(result){

					if(result === "error"){
						res.send("error");
				
					}else if (result.length === 0) {
						res.send("error");
				
					}else if(result[0].password === password){
						var maxTime = 12*30*24*60*60*1000;
						req.session.isLogin = true;
						req.session.account = account;
						
						res.send("success");
				
					}else{
						res.send("error");
						
					}
					res.end();
			});

		}else{
			res.redirect('/login');
			res.end();
		}
	});


});





module.exports = router;