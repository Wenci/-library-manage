var express = require('express');
var router = express.Router();


var onBorrorDao = require('../../dao/onBorrowDao.js');
var bookDao = require('../../dao/bookDao.js');
var userDao = require('../../dao/userDao.js');


router.post('/',function(req,res){

	if(!req.session.isLogin || req.session.isLogin!= true){
		res.send('login');
		res.end();
		return;
	}

	var account = req.session.account;
	var book_id = req.body.bookId;
	console.log(book_id);
	userDao.queryAccount(account,function(results){
		if(results === 'error'|| results.length ==0){
			res.send('error');
			res.end();
		}else if(results[0].borrow_num>=5){
			res.send('5');
			res.end();
		}else{
			bookDao.queryBookById({id:book_id},function(results){
				console.log(results[0]);
				if(results[0].num-results[0].borr_num <=0 ){
					res.send('notmore');
					res.end();
					return;
				}
				onBorrorDao.insert({
					account:account,
					book_id:book_id,
					borrow_date:new Date()
				},function(results){
					if(results!="error" && results.affectedRows ===1){
						res.send('success');
					}else{
						res.send('error');
					}
					res.end();
					userDao.addBorrowNumByAccount(account);
					bookDao.addBookBorrowNumById({id:book_id});
				});
			});
		}
	})


});




module.exports = router;