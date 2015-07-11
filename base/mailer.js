var mailConf = require('../config/mailConf.js');
var nodemailer = require('nodemailer');

var logger = require('./log.js')('err');

var mailer = {
	sendActiveMail: function(userMail,key,host){

		// create reusable transporter object using SMTP transport
		var transporter = nodemailer.createTransport(mailConf);

		// NB! No need to recreate the transporter object. You can use
		// the same transporter object for all e-mails
		var html = "<b>这是西南大学软工图书管理系统激活邮件</b><br><b>请点击下面的链接激活<b/><br><a href='http://"+host+":3000/active?key="+key+"'>点我进行激活</a>";
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Libray Management ✔ <zengxb94@qq.com>', // sender address
		    to: userMail, // list of receivers
		    subject: 'Hello ✔', // Subject line
		    text: '这是激活邮件', // plaintext body
		    html: html // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        logger.warn(error);
		    }
		});
	}
}
module.exports = mailer;