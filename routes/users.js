var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var passport = require('passport');

var User = require('../models/User');

/*
    For both login and create user, we want to send an error code if the user
    is logged in, or if the client did not provide a username and password.
    This function returns true if an error code was sent; the caller should
    return immediately in this case.
*/
var isLoggedInOrInvalidBody = function(req, res) {
    if (req.currentUser) {
        utils.sendErrResponse(res, 403, "There is already a user logged in.");
        return true;
    } else if (!(req.body.username && req.body.password)) {
        utils.sendErrResponse(res, 400, 'Username or password not provided.');
        return true;
    }
    return false;
};

var userLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // If someone tries to hit this page without being authenticated redirect to home page
  res.redirect('/');
}

/*
    This function checks to see that the provided username-password combination
    is valid. for empty username/password, or if the combination is not correct,
    an error will be returned.

    A user already logged in is not allowed to call the login API again; an
    attempt to do so will result in an error code 403.

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
router.post('/login', passport.authenticate('local-login', {//function(req, res) {
  successRedirect : '/users/loginsuccess',
  failureRedirect : '/users/loginfail',
  failureFlash : true,
}));

/*
  GET /users/loginsuccess
  Response:
    - success: sets the corresponding session information
*/
router.get('/loginsuccess', userLoggedIn, function(req, res) {
  // While this looks bad, the userLoggedIn middleware will redirect
  // if the user is not authenticated
  if (req.user) {
    req.session.username = req.user.username;
    utils.sendSuccessResponse(res, { user: req.user.username });
  } else {
    utils.sendErrResponse(res, 403, "Username or password invalid.");
  }
});

router.get('/loginfail', function(req, res) {
  utils.sendSuccessResponse(res, {message: 'Login failed'});
});

/*
    POST /users/logout
    Request body: empty
    Response:
     - success: true if logout succeeded; false otherwise
     - err: on error, an error message
*/
router.post('/logout', function(req, res) {
    if (req.currentUser) {
        req.session.destroy();
        utils.sendSuccessResponse(res);
    } else {
        utils.sendErrResponse(res, 403, "There is no user currently logged in.");
    }
});

/*
    Create a new user in the system.

    All usernames in the system must be distinct. If a request arrives with a
    username that already exists, the response will be an error.

    This route may only be called without an existing user logged in. If an
    existing user is already logged in, it will result in error code 403.

    Does NOT automatically log in the user.

    POST /users
    Request body:
     - username
     - password
    Response:
     - success: true if user creation succeeded, false otherwise
     - err: on error, an error message
*/
router.post('/', passport.authenticate('local-signup', {//function(req, res) {
    successRedirect : '/users/signupsuccess', // Redirect to main page
    failureRedirect : '/users/signupfail',
    failureFlash : true,
  }));

// Redirected here to display message saying that signup was successful
router.get('/signupsuccess', function(req, res) {
  utils.sendSuccessResponse(res, {message: 'Signup success.'});
});

// Redirect here to display message saying that signup fail
router.get('/signupfail', function(req, res) {
  utils.sendSuccessResponse(res, {message: 'Signup fail.'});
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
    if (req.currentUser) {
        utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
    } else {
        utils.sendSuccessResponse(res, { loggedIn : false });
    }
});

module.exports = router;
