var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')

const bodyparser = require('body-parser');


require('./server/models/db');

var indexRouter = require('./server/routes/index');

// Init Express App
var app = express();

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup i.e loading view engine
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: "Shh, its a secret!"}));

app.use('/', indexRouter);


// Body Parser Middleware
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
