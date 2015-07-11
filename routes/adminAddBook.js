var express = require('express');
var router = express.Router();



router.get('/',function(req,res,next){
	var sortDao = require('../dao/sortDao.js');
	sortDao.queryAllSort(function(results){
		if(results === 'error'){
			next();
			return;
		}
		
		console.log(req.session.right);
		res.render('adminAddBook.ejs',{
			title: '添加图书',
			sort: results,
			css: ['css/addbook.min.css'],
			js: ['components/jquery/jquery.min.js',
				'components/layer/src/layer.js',
				'js/addbook.min.js'
			],
			active: 1,
			right:req.session.adminRight
		});
	});

});

router.post('/',function(req,res){
	var bookDao = require('../dao/bookDao.js');
	
	var data = {};
	if(req.session && req.session.adminIsLogin === true){
		var book = {
			name : req.body.name,
			author: req.body.author,
			press: req.body.press,
			lib_id: req.body.libId,
			sort_id: req.body.sort,
			isbn: req.body.isbn,
			num: req.body.num,
			create_time: new Date()
		};
		console.log(book);
		bookDao.insert(book,function(results){
			if(results=== 'error'){
				
				data.type = 1; 
				
			}else if(results.affectedRows === 1){
				
				data.type = 2;
			}else{
				
				data.type = 1;
			}
			res.send(data);
			res.end();
			
		});
	}else{
		data.type = 0;
		res.send(data);
		res.end();
	}
});



module.exports = router;