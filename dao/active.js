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
					connection.release();
					return;
				}
				if(callback){
					callback(results);
				}
			});
		});
	},
	del: function(key,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var del = "DELETE FROM active_key WHERE key= ?";
			console.log(del);
			connection.query(del,[key],function(err,resultds){
				if (err) {
					logger.error(err);
					connection.release();
					return;
				};
				if (callback) {
					callback(results);
				};
			})
		});
	}
};

module.exports = active;