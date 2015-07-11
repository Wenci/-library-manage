var express = require('express');
var router =express.Router();


router.get('/',function(req,res){

	res.render('adminEditBook.ejs',{
		title: '编辑图书',
		active: 3,
		css:['css/editbook.min.css'],
		js: ['components/jquery/jquery.min.js','components/layer/src/layer.js','components/bootstrap/js/bootstrap.min.js','js/editbook.min.js'],
		right:req.session.adminRight
	});



});




module.exports = router;