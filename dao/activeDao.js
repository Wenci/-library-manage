var pool = require('./dbConnect.js');
var logger = require('../base/log.js')('err');

var active = {
	insert: function(active,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var insert = "INSERT INTO active_key SET ?";
			connection.query(insert,active,function(err,results){
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
	queryByKey: function(key,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var queryByKey = "SELECT * FROM active_key WHERE ?";
			connection.query(queryByKey,{key:key},function(err,results){
				if (err) {
					logger.error(err);
					results = "error";
				};
				connection.release();
				if (callback) {
					callback(results);
				};
			})
		});
	},
	del: function(key,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var del = "DELETE FROM active_key WHERE ?";
			connection.query(del,{key:key},function(err,results){
				if (err) {
					logger.error(err);
					results = "error";
				};
				connection.release();
				if (callback) {
					callback(results);
				};
			})
		});
	}

};

module.exports = active;