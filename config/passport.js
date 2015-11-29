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
    passReqToCallback : true,
  },

  function(req, email, password, done) {
      process.nextTick(function() {
        console.log('here');
        User.findByUsername(email, function(err, user) {
          if (user) {
            console.log("This is going wrong: ");
            console.log(user);
            return done(null, false, {message: 'That email is already taken'});
          } else {
            User.createNewUser(email, password, email, function(err, newUser) {
              if (err) {
                console.log("This is going wrong: ");
                console.log(err);
                return done(err);
              }
              // req.login(newUser);
              req.user = newUser;
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
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false, { message: 'No user found.'});
      } else if (!User.validPassword(user, password)) {
        return done(null, false, { message: 'Wrong password.'});
      }
      return done(null, user);
    })
  }))
};

module.exports = internalPassport;
