var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	if(!req.session || req.session.adminIsLogin != true){
		res.redirect('./login');
	}else{
		res.render('adminReturnBook.ejs',{
			title: '归还图书',
			active: 4,
			css:['css/findbook.min.css'],
			js: ['components/jquery/jquery.min.js','components/layer/src/layer.js','components/bootstrap/js/bootstrap.min.js','js/returnbook.min.js'],
			right:req.session.adminRight
		});
	}	
});



module.exports = router;