var pool = require('../dao/dbConnect.js');

var logger = require('../base/log.js')('err');

var onBorrow = {
	queryByBookId: function(BookId,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var query = 'SELECT * FROM onborrow WHERE ?';
			connection.query(query,BookId,function(err,results){
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
	insert: function(insertValue,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var insert = 'INSERT INTO onborrow SET ?';
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
	delById:function(id,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var del = 'DELETE FROM onborrow WHERE ?';
			connection.query(del,id,function(err,results){
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
	queryByAccount: function(account,page,pageNum,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var startNum = page==0?0:page*pageNum-1;

			var limit = "LIMIT "+ startNum + "," + pageNum;

			var query = "SELECT * FROM onborrow WHERE account = '"+account+"' ORDER BY borrow_date DESC "+limit;
			console.log(query);
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
	getNumByKey: function(keyName,way,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var queryKey = "";
			for(var i = 0; i<keyName.length;i++){
				queryKey = queryKey+"%"+keyName.charAt(i);
			}
			queryKey += "%";

			var query = "SELECT COUNT(*) FROM onborrow WHERE "+ way +" LIKE " + "'"+queryKey+"'";
			console.log(query);
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

	getRecordByKeyPage: function(keyName,way,page,pageNum,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var queryKey = "";
			for(var i = 0; i<keyName.length;i++){
				queryKey = queryKey+"%"+keyName.charAt(i);
			}
			queryKey += "%";
			
			var startNum = page==0?0:page*pageNum-1;

			var limit = "LIMIT "+ startNum + "," + pageNum;

			var query = "SELECT * FROM onborrow WHERE "+way+" LIKE " + "'"+queryKey+"' ORDER BY "+ way + " "+limit;
			
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


module.exports = onBorrow;