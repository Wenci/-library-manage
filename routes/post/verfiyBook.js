var express = require('express');
var router = express.Router();

var bookDao = require('../../dao/bookDao.js');

router.post('/',function(req,res){

	var type = req.body.type;
	var value = req.body.value;

	bookDao.queryBookByValue(type,value,function(results){

			if(results === "error"){
				res.send("error");
			}else if(results.length >=1 ){
				res.send("has")
			}else if(results.length==0){
				res.send("nothave");
			}

			res.end();

	});



});






module.exports = router;