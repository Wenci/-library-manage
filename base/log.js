var log = require('log4js');
//var conf = require('../config/conLogConf.js');
log.configure('./config/logConf.json');

module.exports = function(name){
	
	return log.getLogger(name);
}

