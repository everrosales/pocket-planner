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
    if (!req.currentUser) {
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        next();
    }
};

/*
    Grab a event from the store whenever one is referenced with an ID in the
    request path (any routes defined with :event as a parameter).
*/
router.param('event', function(req, res, next, eventId) {
    Event.getPublicEventById(eventId, function(err, event) {
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
  if (!req.body.email || !req.body.name) {
    utils.sendErrResponse(res, 500, 'Email and name required.');
  } else {
    if (req.body.attending) {
      Event.markAttending(req.event, req.body.email, req.body.name, req.body.note, function(err, result) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
          //loadHomePage();
          utils.sendSuccessResponse(res, result);
        }
      });
    } else {
      Event.markNotAttending(req.event, req.body.email, req.body.name, req.body.note, function(err, result) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
          //loadHomePage();
          utils.sendSuccessResponse(res, result);
        }
      });
    }
  }

});

router.get('/', function(req, res) {
  // Get all public Events
  Event.getPublicEvents(function(err, my_events) {
      if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
      } else {
          my_events = my_events.reverse();
          utils.sendSuccessResponse(res, my_events);
      }
  });
});

router.get('/:event/details', function(req, res) {
    utils.sendSuccessResponse(res, {'event' : req.event });
})

/*
    GET /attend/:event
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
    Response:
     - success: page displaying the event attendance options
     - err: on failure, an error message
*/
router.get('/:event', function(req, res, next) {
  // Get the event attendance opions for a particular event
  // This is a bit roundabout (come back and simpliy this)
  console.log('serving attend page');
  // var eventObj = {
  //   _id : req.event._id,
  //   name : req.event.name,
  //   hostEmail : req.event.hostEmail,
  //   start : req.event.start,
  //   start_time : 0,
  //   end : req.event.end,
  //   end_time : 0,
  //   location : req.event.location,
  //   description : req.event.description,
  //   date : new Date(),
  // }
  var evt = req.event;
  evt.start = new Date(evt.start);
  evt.start_time = evt.start.toLocaleTimeString();
  var tmp_time = evt.start_time.split(' ');
  var am_pm = tmp_time[1];
  tmp_time = evt.start_time.split(':');
  evt.start_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
  evt.start = evt.start.toLocaleDateString();

  evt.end = new Date(evt.end);
  evt.end_time = evt.end.toLocaleTimeString();
  tmp_time = evt.end_time.split(' ');
  am_pm = tmp_time[1];
  tmp_time = evt.end_time.split(':');
  evt.end_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
  evt.end = evt.end.toLocaleDateString();
  //console.log(evt.end.toLocaleDateString());
  res.render('rsvp', {date: new Date(), locals: evt});
});

module.exports = router;
