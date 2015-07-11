var express = require('express');
var router = express.Router();

var async = require('async');

var bookDao = require('../../dao/bookDao.js');
var onBorrowDao = require('../../dao/onBorrowDao.js');
var recordDao = require('../../dao/borrowRecordDao.js');
var userDao = require('../../dao/userDao.js');

router.post('/',function(req,res){

	if(!req.session.adminIsLogin || req.session.adminIsLogin != true){
		res.send('notlogin');
		res.end();
	}
	var borrowId = req.body.borrowId;
	var bookId = req.body.bookId;
	var task = [];
	var borow;


	task[0] = function(callback){
		onBorrowDao.queryByBookId({id:borrowId},function(results){
			if(results=="error"){
				callback("error",results);
			}else{
				borrow = results[0];
				callback(null,results);
			}
		});
	};


	task[1] = function(callback){
		var record = borrow;

		record['return_date'] = new Date();

		recordDao.insert(record,function(results){
			if(results=="error"){
				callback("error",results);
			}else{
				callback(null,results);
			}
	
		})
	};

	task[2] = function(callback){
		onBorrowDao.delById({id:borrowId},function(results){
			callback(null,results);
		});
	}

	task[3] = function(callback){
		bookDao.subBookBorrowNumById({id:bookId},function(results){
			callback(null,results);
		});
	};


	async.series(task,function(err,results){
		for(var i =0;i<results.length;i++){
			if(results[i] == "error"){
				res.send("error");
				res.end();
				return;
			}
		}
		userDao.subBorrowNumByAccount(results[0][0].account);
		res.send("success");
		res.end();
	});



	function isError(err){
		if(err == "error"){
			res.send("error");
			res.end();
		}
	}
	
});









module.exports = router;