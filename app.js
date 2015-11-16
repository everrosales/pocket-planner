var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
require('handlebars/runtime');

// Import route handlers
var index = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');

// Import Tweet User Model
var User = require('./models/User');

var app = express();

//Database setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/fritter');
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
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(email, password, done) {
  User.verifyPassword(email, password, function(err, user) {
    return done(err, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findByEmail(email, function(err, user) {
    done(err, user);
  });
});
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
app.use('/tweets', tweets);

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
