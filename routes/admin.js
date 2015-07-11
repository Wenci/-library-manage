var express = require('express');
var router = express.Router();

var sha1 = require('../base/sha1.js');
var adminDao = require('../dao/adminDao.js');

router.get('/',function(req,res){
	console.log(req.session.right);
	res.render('admin',{
		title: '后台管理',
		right:req.session.adminRight,
		js:['components/jquery/jquery.min.js']
	});
})


module.exports = router;