var express = require('express');
var router = express.Router();

var bookDao = require('../../dao/bookDao.js');
var onBorrowDao = require('../../dao/onBorrowDao.js');

router.post('',function(req,res){
	var id = req.body.id;

	onBorrowDao.queryByBookId({book_id:id},function(results){
		if(results === "error" || results.length >0){
			res.send('error1');
			res.end();
			return;
		}else if(results.length ===0){
			console.log("error");
			bookDao.deleteBookById({id:id},function(results){
				if(results === "error"){
					res.send('error');
					res.end();
				}else if(results.affectedRows === 1){
					res.send('success');
					res.end()
				}
			});
		}
		
	});

});


module.exports = router;