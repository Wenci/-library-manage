var express = require('express');
var router = express.Router();

var adminDao = require('../../dao/adminDao.js');

var logger = require('../../base/log.js')('err');

router.post('/',function(req,res){
	if(!req.session || req.session.adminIsLogin != true || req.session.adminRight!=0){
		next();
	}

	var account = req.body.account;

	adminDao.queryByAccount(account,function(results){
		if(results === "error"){
			res.send("error");
		}else if(results.length === 1){
			res.send("has");
		}else{
			res.send('ok');
		}
		res.end();
	});
});


module.exports = router;