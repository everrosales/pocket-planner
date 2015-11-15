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
    Event.findById(eventId, function(err, event) {
        if (event) {
            req.event = event;
            next();
        } else {
            utils.sendErrResponse(res, 404, 'Resource not found.');
        }
    });
});

// Register the middleware handlers above
router.all('*', requireAuthentication);

/*
  At this point, all requests are authenticated and checked:
  1. Clients must be logged into some account
  2. If accessing or modifying a specific resource, the client must own that event
  3. Requests are well-formed
*/

/*
    GET /events
    No request parameters
    Response:
     - success: true if the server succeeded in getting the user's events
     - content: on success, an object with a single field 'events' which contains
            user's events, all events, and events from users this user is
            subscribed to (three lists)
     - err: on failure, an error message
*/
router.get('/', function(req, res) {
    var response_data = {};
    // Find all of the events that are visible to the user
    User.getEvents(req.currentUser.username, function(err, my_events) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            my_events.forEach(function(event) {
                if (event.author === req.currentUser.username) {
                    event.is_mine = true;
                } else {
                    event.is_mine = false;
                }
            });
            response_data.my_events = my_events.reverse();
            utils.sendSuccessResponse(res, response_data);
        }
    });
});

/*
    POST /events
    Request body:
     - content: the content of the event
    Response:
     - success: true if the server succeeded in recording the user's event
     - err: on failure, an error message
*/
router.post('/', function(req, res) {
    if (!req.body.content) {
        utils.sendErrResponse(res, 400, 'Content required in request.');
    }
    // Create a new event
});

/*
    POST /events/:Event
    Request parameters:
     - event ID: the unique ID of the event we're going to reevent
     - username: the user who is reeventing the Event
    Response:
     - success: true if server succeeded in reeventing Event
     - err: on failure, an error message
*/
router.post('/:event', function(req, res) {
    // Update an event
});

/*
    DELETE /events/:event
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
    Response:
     - success: true if the server succeeded in deleting the user's event
     - err: on failure, an error message
*/
router.delete('/:event', function(req, res) {
    // Delete the event and verify that its owned by the user
});

module.exports = router;
