var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var saveToServer = require('./routes/saveToServer');
var getSaveFileList = require('./routes/getSaveFileList');
var loadFileFromServer = require('./routes/loadFileFromServer');
var submitComputExpressAndData = require('./routes/submitComputExpressAndData');
var toGetBiaoZhunFaExpress = require('./routes/toGetBiaoZhunFaExpress');
var toGetBiaoZhunFaConf = require('./routes/toGetBiaoZhunFaConf');
var computingPage = require('./routes/computingPage');

var app = express();
app.disable('view cache');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/saveToServer', saveToServer);
app.use('/getSaveFileList', getSaveFileList);
app.use('/loadFileFromServer', loadFileFromServer);
app.use('/submitComputExpressAndData', submitComputExpressAndData);
app.use('/toGetBiaoZhunFaExpress', toGetBiaoZhunFaExpress);
app.use('/toGetBiaoZhunFaConf', toGetBiaoZhunFaConf);
app.use('/computingPage', computingPage);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
