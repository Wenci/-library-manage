var express = require('express');
var router = express.Router();

var sortDao = require('../dao/sortDao.js');
var bookDao = require('../dao/bookDao.js');

router.get('/',function(req,res,next){
	var id = req.query.id;
	sortDao.queryAllSort(function(results){
		if(results === 'error'){
			next();
			return;
		}
		
		var sort = results;

		bookDao.queryBookById({id:id},function(results){
			if(results === 'error' || results.length === 0){
				next();
				return;
			}
			res.render('editOneBook.ejs',{
				title: '修改图书',
				sort: sort,
				css: ['css/addbook.min.css'],
				js: ['components/jquery/jquery.min.js',
					'components/layer/src/layer.js',
					'js/editonebook.min.js'
				],
				book: results[0]
			});
			
		})
		
	});

});




router.post('',function(req,res){
	var book = {
		name : req.body.name,
		author: req.body.author,
		press: req.body.press,
		lib_id: req.body.libId,
		sort_id: req.body.sort,
		isbn: req.body.isbn,
		num: req.body.num,
	};
	var id =req.body.id;


	bookDao.updateBookById(book,id,function(results){
		if(results === "error" || results.affectedRows ===0 ){
			res.send("error");
		}else if(results.affectedRows ===1){
			res.send("success");
		}
		res.end();
	});
});

module.exports = router;