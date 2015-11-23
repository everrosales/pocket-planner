var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var User = require('../models/User');
var Event = require('../models/Event');

/*
    Require authentication on all access to /events/*
    clients who are not logged in will receive 403 error
*/
var requireAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  }
};

/*
    Grab a event from the store whenever one is referenced with an ID in the
    request path (any routes defined with :event as a parameter).
*/
router.param('event', function(req, res, next, eventId) {
    Event.findById(eventId, function(err, event) {
        if (event) {
            req.event = event;
            next();
        } else {
            utils.sendErrResponse(res, 404, 'Resource not found.');
        }
    });
});

/*
    Add a accessCode param to the request and then pass the request along.
*/
router.param('accessCode', function(req, res, next, accessCode) {
    if (accessCode) {
      req.accessCode = accessCode;
      next();
    } else {
      utils.sendErrResponse(res, 404, 'Resource not found.');
    }
});

/*
    POST /attend/:Event/:accesscode
    Request parameters:
     - event ID: the unique ID of the event we're going to reevent
     - username: the user who is reeventing the Event
    Response:
     - success: true if server succeeded in reeventing Event
     - err: on failure, an error message
*/
router.post('/:event/:accessCode', function(req, res) {
    // Mark attendance for event for private events given an access code.
    utils.sendErrResponse(res, 404, 'Route not configured');
});

/*
    POST /attend/:Event
    Request parameters:
     - event ID: the unique ID of the event we're going to reevent
     - username: the user who is reeventing the Event
    Response:
     - success: true if server succeeded in reeventing Event
     - err: on failure, an error message
*/
router.post('/:event', function(req, res) {
  // Mark attendance for event
  if (!req.body.email) {
    utils.sendErrResponse(res, 500, 'Email required.');
  } else {
    if (req.body.attending) {
      Event.markAttending(req.event, req.body.email, req.body.name, req.body.note, function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(err, result);
        }
      });
    } else {
      Event.markNotAttending(req.event, req.body.email, req.body.name, req.body.note, function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(err, result);
        }
      });
    }
  }
  utils.sendErrResponse(res, 404, 'Route not configured');
});

/*
    GET /attend/:event
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
    Response:
     - success: page displaying the event attendance options
     - err: on failure, an error message
*/
router.get('/:event', function(req, res) {
  // Get the event attendance opions for a particular event
  res.render('attend', {});
});

module.exports = router;
