var pool = require('./dbConnect.js');
var logger = require('../base/log.js')('err');

var sort = {
	insert: function(insertValue,callback){
		poo.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var inert = 'INSERT INTO b_sort SET ?';
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

	queryAllSort: function(callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var query = 'SELECT * FROM b_sort';
			connection.query(query,function(err,results){
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

	
}

module.exports = sort;