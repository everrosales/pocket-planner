var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
require('handlebars/runtime');
require('./config/passport')(passport)

// Import route handlers
var index = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/event');
var attend = require('./routes/attend');

// Import User Model
var User = require('./models/User');

var app = express();

//Database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pocketplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret : 'sneakittysneaksneak', resave : true, saveUninitialized : true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
var LocalStrategy = require('passport-local').Strategy;

//TODO remove old fritter authen
app.use(function(req, res, next) {
    if (req.session.username) {
        User.findByUsername(req.session.username, function(err, user) {
            if (user) {
                req.currentUser = user;
            } else {
                req.session.destroy();
            }
            next();
        });
    } else {
        next();
    }
});

//Map to imported route handlers
app.use('/', index);
app.use('/users', users);
app.use('/events', events);
app.use('/attend', attend);

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
