var crypto = require('crypto');

var sha1Fn = {
	getSha1: function(value){
		var sha1 = crypto.createHash('sha1');
		sha1.update(value,"UTF-8");
		var temp = sha1.digest('hex');
		console.log(temp);
		return temp;
	}
}

module.exports = sha1Fn;