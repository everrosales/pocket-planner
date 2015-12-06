var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var passport = require('passport');
var validator = require('validator');

var User = require('../models/User');

/*
  For both login and create user, we want to send an error code if the user
  is logged in, or if the client did not provide a user email and password.
  This function returns true if an error code was sent; the caller should
  return immediately in this case.
*/
var isLoggedInOrInvalidBody = function(req, res) {
  if (req.isAuthenticated()) {
    utils.sendErrResponse(res, 403, "There is already a user logged in.");
    return true;
  } else if (!(req.body.username && req.body.password)) {
    utils.sendErrResponse(res, 400, 'Username or password not provided.');
    return true;
  } else if (!validator.isEmail(req.body.username)) {
    utils.sendErrResponse(res, 403, 'Username must be an email address.');
    return true;
  }
  return false;
};

/*
  This function checks to see that the provided username-password combination
  is valid. for empty username/password, or if the combination is not correct,
  an error will be returned.

  This route may only be called without an existing user logged in. If an
  existing user is already logged in, it will result in error code 403.

  POST /users/login
  Request body:
   - username
   - password
  Response:
   - success: true if login succeeded; false otherwise
   - content: on success, an object with a single field 'user', the object
       of the logged in user.
   - err: on error, an error message
*/
router.post('/login', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else if (!user) {
      utils.sendErrResponse(res, 403, info);
    } else {
      req.login(user, function(err) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
          utils.sendSuccessResponse(res, { user: req.user.username });
        }
      });
    }
  })(req, res);
});

/*
  POST /users/logout
  Request body: empty
  Response:
   - success: true if logout succeeded; false otherwise
   - err: on error, an error message
*/
router.post('/logout', function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    utils.sendSuccessResponse(res);
  } else {
    utils.sendErrResponse(res, 403, "There is no user currently logged in.");
  }
});

/*
  Create a new user in the system. Automatically logs in the user.

  All usernames in the system must be distinct. If a request arrives with a
  username that already exists, the response will be an error.

  This route may only be called without an existing user logged in. If an
  existing user is already logged in, it will result in error code 403.

  POST /users
  Request body:
   - username
   - password
  Response:
   - success: true if user creation succeeded, false otherwise
   - err: on error, an error message
*/
router.post('/', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else if (!user) {
      utils.sendErrResponse(res, 403, info);
    } else {
      req.login(user, function(err) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
          utils.sendSuccessResponse(res, { user: req.user.username });
        }
      });
    }
  })(req, res);
});

/*
  Determine whether there is a current user logged in

  Get /users/current
  No request parameters
  Response:
   - success.loggedIn: true if there is a user logged in; false otherwise
   - success.user: if success.loggedIn, the currently logged in user
*/
router.get('/current', function(req, res) {
  if (req.isAuthenticated()) {
    utils.sendSuccessResponse(res, { loggedIn : true, user : req.user.username });
  } else {
    utils.sendSuccessResponse(res, { loggedIn : false });
  }
});

module.exports = router;
