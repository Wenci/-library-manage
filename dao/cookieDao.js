var pool = require('../dao/dbConnect.js');
var logger = require('../base/log.js')('err');

var cookie = {
	insert: function(cookie,callback){

		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var insert = 'INSERT INTO cookie SET ?';
			connection.query(insert,cookie,function(err,results){
				if (err) {
					logger.error(err);
					results = 'error';
				}
				connection.release();
				if(callback){
					callback(results);
				}
			});
		});
	},

	updateByAccount: function(cookie,callback){
		pool.getConnection(function(err,connection){
			if (err) {
				logger.error(err);
			};
			var update = 'UPDATE cookie SET cookie = ? WHERE account = ?';
			connection.query(update,[cookie.cookie,cookie.account],function(err,results){
				if(err){
					logger.error(err);
					results = 'error';
				}
				connection.release();
				if(callback){
					callback(results);
				}
			});
		});
	},

	queryCookieByCookie: function(cookie,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var select = 'SELECT * FROM cookie WHERE ?';
			connection.query(select,cookie,function(err,results){
				if(err){
					logger.error(err);
					results ='error';
				}
				connection.release();
				if(callback){
					callback(results);
				}
			});
		});
	},

	queryCookieByAccount: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var select = 'SELECT * FROM cookie WHERE ?';
			connection.query(select,account,function(err,results){
				if(err){
					logger.error(err);
					results = 'error';
				}
				connection.release();
				if(callback){
					callback(results);
				}
			});
		});
	}



};

module.exports = cookie;