var pool = require('../dao/dbConnect.js');

var logger = require('../base/log.js')('err');

var book = {
	insert: function(insertBook,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var insert = 'INSERT INTO book SET ?';
			connection.query(insert,insertBook,function(err,results){
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
	getBookNum: function(callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			connection.query('SELECT COUNT(*) FROM book',function(err,results){
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
	getBookNumByKey: function(keyName,way,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}
			var queryKey = "";
			for(var i = 0; i<keyName.length;i++){
				queryKey = queryKey+"%"+keyName.charAt(i);
			}
			queryKey += "%";

			var query = "SELECT COUNT(*) FROM book WHERE "+ way +" LIKE " + "'"+queryKey+"'";
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
	getBookByKeyPage: function(keyName,way,page,pageNum,callback){
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

			var query = "SELECT * FROM book WHERE "+way+" LIKE " + "'"+queryKey+"'"+limit;
			
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
	deleteBookById: function(id,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var del = 'DELETE FROM book WHERE ?';
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

	queryBookById: function(id,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var query = 'SELECT * FROM book WHERE ?';
			connection.query(query,id,function(err,results){
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
	updateBookById: function(book,id,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var update = "UPDATE book SET ? WHERE id=" + "'"+id+"'";
			connection.query(update,book,function(err,results){
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

	addBookBorrowNumById: function(id,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var update = 'UPDATE book SET borr_num = borr_num+1 WHERE ?';
			connection.query(update,id,function(err,results){
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

	subBookBorrowNumById: function(id,callback){
		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var update = 'UPDATE book SET borr_num = borr_num-1 WHERE ?';
			connection.query(update,id,function(err,results){
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
	queryBookByValue: function(type,value,callback){

		pool.getConnection(function(err,connection){
			if(err){
				logger.error(err);
			}

			var query = 'SELECT * FROM book WHERE '+type+"= '"+value+"'";
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

	}
};


module.exports = book;