var pool = require('./dbConnect.js');
var logger = require('../base/log.js')('err');

var record = {
	insert: function(insertValue,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var insert = 'INSERT INTO borrow_record SET ?';
			connection.query(insert,insertValue,function(err,results){
				if(err){
					logger.error(err);
					results = "error";
				}
				connection.release();
				if(callback){
					callback(results);
				}
			});
		});
	},

	getRecordByKeyPage: function(account,page,pageNum,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			
			var startNum = page==0?0:page*pageNum-1;

			var limit = "LIMIT "+ startNum + "," + pageNum;

			var query = "SELECT * FROM borrow_record WHERE account='" +account+"' ORDER BY borrow_date DESC "+limit;
			
			console.log(query);
			connection.query(query,function(err,results){
				if(err){
					logger.error(err);
					results = "error";
				}
				connection.release();
				console.log(results);
				if(callback){
					callback(results);
				}
			});
		});
	},

};






module.exports = record;