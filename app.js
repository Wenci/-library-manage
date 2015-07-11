

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//session
var sessionConf = require('./config/sessionConf.js');
var session = require('express-session');

//log4js 日志

var logger = require('./base/log.js')("all");
var loggerWrong = require('./base/log.js')("err");
var log4js = require('log4js');

//路由
var isLogin = require('./routes/isLogin.js');
var routes = require('./routes/index');
var users = require('./routes/user');
var login = require('./routes/post/login.js');
var register = require('./routes/post/register.js');
var active = require('./routes/active.js');
var queryAccount = require('./routes/post/queryAccount.js');


var admin = require('./routes/admin.js');
var adminLogin = require('./routes/adminLogin.js');
var adminLogout = require('./routes/adminLogout.js');
var adminIsLogin = require('./routes/adminIsLogin.js');
var addBook = require('./routes/adminAddBook.js');
var adminFindBook = require('./routes/adminFindBook.js');
var adminReturnBook = require('./routes/adminReturnBook.js');
var adminOnBorrow = require('./routes/post/adminOnBorrow.js');
var adminAddAdmin = require('./routes/adminAddAdmin.js');
var adminDelAdmin = require('./routes/adminDelAdmin.js');
var queryAdminAccount = require('./routes/post/queryAdminAccount.js');
var adminChangePass = require('./routes/adminChangePassword.js');



var verfiyBook = require('./routes/post/verfiyBook.js');

var returnBookPost = require('./routes/post/adminReturnBook.js');

var findBook = require('./routes/post/findBook.js');
var adminEditBook = require('./routes/adminEditBook.js');
var deleteBook = require('./routes/post/deleteBook.js');
var editOneBook = require('./routes/editOneBook.js');

var borrow = require('./routes/post/borrow.js');
var userFindBook = require('./routes/post/userFindBook.js');
var confirmPass = require('./routes/post/confirmPass.js');

var userBorrow = require('./routes/userBoorrow.js');
var userLogOut = require('./routes/userLogOut.js');
var userPersonal = require('./routes/userPersonal.js');
var userBorrowRecord = require('./routes/userBorrowRecord.js');



var app = express();


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(favicon(__dirname + '/build/img/favicon.ico'));

//app.use(logger('dev'));

//log
app.use(log4js.connectLogger(logger));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '.')));

//session
app.use(session(sessionConf));



app.use('/active', active);
app.use('/login', login)
app.use('/register', register);
app.use('/queryAccount', queryAccount);

app.use('/user/logout', userLogOut);
app.use('/fn/verifybook', verfiyBook);

app.use('/fn/findbook', findBook);
app.use('/admin/login',adminLogin);
app.use('/admin/*', adminIsLogin);
app.use('/admin/logout', adminLogout);
app.use('/admin/panel', admin);
app.use('/admin/findbook', adminFindBook);
app.use('/admin/addbook', addBook);
app.use('/admin/editbook', adminEditBook);
app.use('/admin/returnbook', adminReturnBook);
app.use('/admin/returnbookpost',returnBookPost);
app.use('/admin/addadmin',adminAddAdmin);
app.use('/admin/deladmin',adminDelAdmin);
app.use('/admin/queryadminaccount',queryAdminAccount);
app.use('/admin/changepass',adminChangePass);
//fn
app.use('/fn/*', adminIsLogin);
app.use('/fn/deletebook',deleteBook);
app.use('/fn/editonebook',editOneBook);
app.use('/fn/onborrow', adminOnBorrow);
//app.use('/admin/findbook', adminFindBook);
app.use('/*',isLogin);
app.use('/', routes);
/*app.use('/users', users);
app.use('/login', login);*/
app.use('/borrow',borrow);
app.use('/confirmpass',confirmPass);
app.use('/userfindbook', userFindBook);
app.use('/user/borrow', userBorrow);
app.use('/user/personal', userPersonal);
app.use('/user/borrowrecord', userBorrowRecord);




/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        logger.error(err);

        res.status(err.status || 500);

        res.render('error');
    });
}



// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

app.listen(3000);

//module.exports = app;
