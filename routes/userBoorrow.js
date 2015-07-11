var express = require('express');
var router = express.Router();

var onBorrowDao = require('../dao/onBorrowDao.js');
var bookDao = require('../dao/bookDao.js');
var async = require('async');


router.get('/',function(req,res){

	var account  = req.session.account; 
	onBorrowDao.queryByAccount(account,0,20,function(results){

		var borrow = results;

		var queryBook = function(n,callback){
			bookDao.queryBookById({id:results[n].book_id},function(results){
				callback(null, results[0]);
			});
		}

		async.timesSeries(results.length,queryBook,function(err,book){
			res.render('userBorrow.ejs',{
				book:book,
				borrow:borrow,
				userName: req.cookies.uname
			});
		});

	});

});





module.exports = router;