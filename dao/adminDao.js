var pool = require('./dbConnect.js');
var logger = require('../base/log.js')('err');


var admin = {
	insert: function(insertValue,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var insert = 'INSERT INTO admin SET ?';
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
	delByAccount: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var del = 'DELETE FROM admin WHERE ?';
			connection.query(del,{account:account},function(err,results){
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
	queryByAccount: function(account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var query = 'select * FROM admin WHERE account= ?';
			connection.query(query,[account],function(err,results){
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
	queryAllAdmin:function(callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var query = 'select * FROM admin';
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

	updateByValueByAccount: function(type,value,account,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var update = "UPDATE admin SET "+type+"= '"+value+"' WHERE account= '" + account+"'";
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
};


module.exports = admin;