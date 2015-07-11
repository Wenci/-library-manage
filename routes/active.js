var express = require('express');
var router = express.Router();

var activeDao = require('../dao/activeDao.js');
var userDao = require('../dao/userDao.js');

router.use('/',function(req,res){
	activeDao.queryByKey(req.query.key,function(results){
		if(results === 'error'){
			res.render('active_fail.ejs');
		}else if(results.length === 1){
			res.render('active_success.ejs');
			userDao.activeAccount(results[0].account);
			activeDao.del(results[0].key);
		}else{
			res.render('active_fail.ejs');
		}
		res.end();
	});
});

module.exports = router;