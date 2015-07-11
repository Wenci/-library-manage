var express = require('express');
var router = express.Router();

var userDao = require('../../dao/userDao.js');
var cookieDao = require('../../dao/cookieDao.js');

var sha1 = require('../../base/sha1.js');
var sha1Key = require('../../config/sha1KeyConf.js');

router.post('/',function(req,res){
	var account = req.body.account;
	var password = req.body.password;
	password = sha1.getSha1(sha1Key+password);


	userDao.verify(account,function(result){

		if(result === "error"){
			res.send("error");
	
		}else if (result.length === 0) {
			res.send("error");
	
		}else if(result[0].password === password&&result[0].status==1){
			var maxTime = 12*30*24*60*60*1000;
			res.cookie('lo',"1",{path:'/',maxAge:maxTime,httpOnly: true});
			res.cookie('uname',result[0].name,{path:'/',maxAge:maxTime,httpOnly: true});
			var userCookieKey = sha1.getSha1(sha1Key+result[0].account);
			res.cookie('lok',userCookieKey,{path:'/',maxAge:maxTime,httpOnly: true});
			req.session.isLogin = true;
			req.session.account = account;
			
			res.send("success");
	
		}else{
			res.send("error");
			
		}
		res.end();
		if(userCookieKey){
			cookieDao.queryCookieByAccount({account:result[0].account},function(results){
				if(results === "error"){
					return;
				}else if(results.length >= 1){
					cookieDao.updateByAccount({account:result[0].account,cookie:userCookieKey});
				}else{
					cookieDao.insert({account:result[0].account,cookie:userCookieKey});
				}
			})
		}
	})

});

router.get('/',function(req,res){
	
	res.render('login.ejs');
});


module.exports = router;