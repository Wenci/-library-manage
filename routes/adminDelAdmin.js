var express = require('express');
var router = express.Router();

var adminDao = require('../dao/adminDao.js');


router.get('/',function(req,res,next){
	if(!req.session || req.session.adminIsLogin != true || req.session.adminRight!=0){
		
		next();
	}else{
		adminDao.queryAllAdmin(function(results){
			if(results=="error"){
				next();
			}else{
				res.render('adminDelAdmin.ejs',{
					title: '删除管理员',
					active: 5,
					css:['css/deladmin.min.css'],
					js: ['components/jquery/jquery.min.js','components/layer/src/layer.js','components/bootstrap/js/bootstrap.min.js','js/deladmin.min.js'],
					right:req.session.adminRight,
					admin:results
				});
			}
		});
		
	}	
});


router.post("",function(req,res){
	if(!req.session || req.session.adminIsLogin != true || req.session.adminRight!=0){
		res.send("notlogin");
		res.end();
	}else{
		var account = req.body.account;
		if(account == req.session.adminAccount){
			res.send("your");
			res.end();
			return;
		}
		adminDao.queryByAccount(account,function(results){
			if(results=="error" || results.length ==0){
				res.send("error");
				res.end();
				return;
			}else if(results[0].right<= req.session.adminRight){
				res.send("notright");
				res.end();
				return;
			}

			adminDao.delByAccount(account,function(results){
				if(results=="error" || results.length ==0){
					res.send("error");
					res.end();
					return;
				}else if(results.affectedRows ==1 ){
					res.send("success");
					res.end();
					return;
				}
			});
		});
	}
});

module.exports = router;