var express = require('express');
var router = express.Router();
//DB
var userDao = require('../../dao/userDao.js');
var activeDao = require('../../dao/activeDao.js');

var logger = require('../../base/log.js')('all');

//加密
var sha1 = require('../../base/sha1.js');
var sha1Key = require('../../config/sha1KeyConf.js');

var mail = require('../../base/mailer.js');

var user = {};

router.post('/',function(req,res){

	var attrValue = ['account','password','name','sex','phone'];
	for (var i = 0; i < attrValue.length; i++) {
		if(req.body[attrValue[i]] === "" || req.body[attrValue[i]] === "undefine"){
			continue;
		}
		user[attrValue[i]] = req.body[attrValue[i]];
	};
	user.password = sha1.getSha1(sha1Key+user.password);
	userDao.insert(user,function(results){
		if(results === "error"){
			res.send('未知错误服务器错误');
	
		}else if(results.affectedRows === 1){
			var key = sha1.getSha1(new String(+new Date())+user.acctount);
			var activeValue = {
				account: user.account,
				key: key
			};
			activeDao.insert(activeValue,function(results){
				if(results.affectedRows === 1 ){
					mail.sendActiveMail(user.account,key,req.hostname);
					res.send('<center>注册成功,激活邮件已经发送</center><br><center>请前往邮箱进行激活</center>');
				}else{
					res.send('注册失败');
				}
				res.end();
			});
		}else{
			res.send('注册失败');
			res.end();
		}
		
	});
});


router.get('/',function(req,res){
	
	res.render('register.ejs');

});

module.exports = router;