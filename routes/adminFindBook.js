var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	if(!req.session || req.session.adminIsLogin != true){
		res.redirect('./login');
	}else{
		res.render('adminFindBook.ejs',{
			title: '查找图书',
			active: 2,
			css:['css/findbook.min.css'],
			js: ['components/jquery/jquery.min.js','components/layer/src/layer.js','components/bootstrap/js/bootstrap.min.js','js/findbook.min.js'],
			right:req.session.adminRight
		});
	}	
});



module.exports = router;