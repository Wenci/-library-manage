var express = require('express');
var router = express.Router();

var cookieDao = require('../dao/cookieDao.js');

router.use('/',function(req,res,next){
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
			req.session.account = results[0].account;
			next();
		}else{
			res.redirect('/login');
			res.end();
		}
	});
});


module.exports = router;