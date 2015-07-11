var express = require('express');
var router = express.Router();

var onBorrowDao = require('../../dao/onBorrowDao.js');
var bookDao = require('../../dao/bookDao.js');

var async = require('async');

router.post('/',function(req,res){
	var keyName = req.body.keyName.replace(/\s+/g,"");
	keyName = keyName.replace('/\s/',"");
	var page = req.body.page;
	var pageNum = req.body.pageNum;
	var way = req.body.way;
	
	onBorrowDao.getNumByKey(keyName,way,function(results){

		var num = results[0]['COUNT(*)'];

		onBorrowDao.getRecordByKeyPage(keyName,way,page,pageNum,function(results){
			var borrow = results;
			var queryBook = function(n,callback){
				bookDao.queryBookById({id:results[n].book_id},function(results){
					callback(null, results[0]);
				});
			}

			async.timesSeries(results.length,queryBook,function(err,book){
				res.send('userBorrow.ejs',{
					num: num,
					book:book,
					borrow:borrow
				});
				res.end();
			});

		})
	});

});




module.exports = router;