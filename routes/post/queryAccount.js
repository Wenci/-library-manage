var express = require('express');
var router = express.Router();

var userDao = require('../../dao/userDao.js');

var logger = require('../../base/log.js')('err');

router.post('/',function(req,res){
	var account = req.body.account;

	userDao.queryAccount(account,function(results){
		if(results === "error"){
			res.send("error");
		}else if(results.length === 1 && results[0].account === account){
			if(results[0].status === 1){
				res.send('active');
			}else{
				res.send('nActive');
			}
		}else{
			res.send('fail');
		}
		res.end();
	});
});


module.exports = router;