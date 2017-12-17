var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
//var index = require('./routes/index');
//var users = require('./routes/users');

var passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Models
var models = require('./model/user');

var db = require('./config/connectdb');

//require('./script/create_database');

require('./config/passport')(passport, models(db.sequelize, db.Sequelize)); // pass passport for configuration

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 

//Routes
//app.use('/', index);
//app.use('/users', users)
require('./routes/users')(app,passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app
module.exports = app;