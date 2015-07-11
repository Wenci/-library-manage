var express = require('express');
var router = express.Router();

router.use('/',function(req,res,next){
	if(req.session){
		if(req.session.adminIsLogin === true){
			next();
		}else{
			res.redirect('/admin/login');
		}
	}else{
		res.redirect('/admin/login');
	}
});


module.exports = router;