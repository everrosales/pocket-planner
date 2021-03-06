var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

var internalPassport = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    User.findByEmail(email, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
      process.nextTick(function() {
        User.findByUsername(email, function(err, user) {
          if (user) {
            return done(null, false, 'A user with that email already exists.');
          } else {
            User.createNewUser(email, password, email, function(err, newUser) {
              if (err) {
                return done(null, false, err.msg);
              }
              return done(null, newUser);
            });
          }
        });
      });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    User.findByEmail(email, function(err, user) {
      if (!user) {
        return done(null, false, 'No user found.');
      } else if (!User.validPassword(user, password)) {
        return done(null, false, 'Wrong password.');
      }
      return done(null, user);
    });
  }));
};

module.exports = internalPassport;
