var express = require('express');
var router = express.Router();

var bookDao = require('../../dao/bookDao.js');
var sortDao = require('../../dao/sortDao.js');

router.post('/',function(req,res){
	var keyName = req.body.keyName.replace(/\s+/g,"");
	keyName = keyName.replace('/\s/',"");
	var page = req.body.page;
	var pageNum = req.body.pageNum;
	var way = req.body.way;
	/*console.log(page);*/

	bookDao.getBookByKeyPage(keyName,way,page,pageNum,function(results){
		var book = results;
		res.send({
				book: book
		});
		res.end();
	})

});


router.get("/",function(req,res){
	var keyName = req.query.keyName.replace(/\s+/g,"");
	var way = req.query.way.replace(/\s+/g,"");

	bookDao.getBookNumByKey(keyName,way,function(results){

		var num = results[0]['COUNT(*)'];

		bookDao.getBookByKeyPage(keyName,way,0,20,function(results){
			var book = results;

			sortDao.queryAllSort(function(results){
				var sort = results;
				res.render('findbook.ejs',{
					userName: req.cookies.uname,
					book:book,
					keyName: req.query.keyName
				})
			});
		})
	});
});

module.exports = router;