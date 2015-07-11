var pool = require('./dbConnect.js');



var logger = require('../base/log.js')("err");

var user = {
	insert: function(value,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			value.status = 0;
			var insert = 'INSERT INTO user SET ?';
			connection.query(insert,value,function(err,results){
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
	verify: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var select = 'SELECT * FROM user WHERE account= ?';
			connection.query(select,[account],function(err,results){
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
	activeAccount: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var activeAc = "UPDATE user SET status = 1 where account= ?";
			connection.query(activeAc,[account],function(err,results){
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
	queryAccount: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var queryAc = "SELECT * FROM user WHERE account= ?";
			connection.query(queryAc,[account],function(err,results){
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
	updateByValueByAccount: function(type,value,account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var update = "UPDATE user SET "+type+"= '"+value+"' WHERE account= '" + account+"'";
			console.log(update);
			connection.query(update,function(err,results){
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

	addBorrowNumByAccount: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var update = 'UPDATE user SET borrow_num = borrow_num+1 WHERE ?';
			connection.query(update,[account],function(err,results){
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
	subBorrowNumByAccount: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var update = 'UPDATE user SET borrow_num = borrow_num-1 WHERE ?';
			connection.query(update,[account],function(err,results){
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
};

module.exports = user;