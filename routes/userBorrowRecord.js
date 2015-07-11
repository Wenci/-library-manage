var express = require('express');
var router = express.Router();

var borrowRecordDao = require('../dao/borrowRecordDao.js');
var bookDao = require('../dao/bookDao.js');

var async = require('async');


router.get('/',function(req,res){

	res.render('userBorrowRecord.ejs',{
		userName: req.cookies.uname
	});

});

router.post('/',function(req,res){

	var account = req.session.account;
	var page = req.body.page;
	var pageNum = req.body.pageNum;

	borrowRecordDao.getRecordByKeyPage(account,page,pageNum,function(results){
		var borrow = results;


		var queryBook = function(n,callback){
			bookDao.queryBookById({id:results[n].book_id},function(results){
				callback(null, results[0]);
			});
		}


		async.timesSeries(results.length,queryBook,function(err,book){
			res.send({
				book:book,
				borrow:borrow
			});
			res.end();
		});



	});

});

module.exports = router;