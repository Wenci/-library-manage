var config = require('../config/dbConf.js');
var mysql = require('mysql');
var pool = mysql.createPool(config);


module.exports = pool;