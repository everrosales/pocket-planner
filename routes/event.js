var express = require('express');
var router = express.Router({mergeParams:true});
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

router.param('category', function (req, res, next, categoryId) {
  if (categoryId) {
    req.category = categoryId;
    next();
  } else {
    utils.sendErrResponse(res, 404, 'Resource not found.');
  }
});

router.param('cost', function (req, res, next, costId) {
  if (costId) {
    req.cost = costId;
    next();
  } else {
    utils.sendErrResponse(res, 404, 'Resource not found.');
  }
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
    POST /events/:event/addcost
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding a cost to the Event
     - err: on failure, an error message
*/
router.post('/:event/addcost', function (req, res) {
  // add cost to the event
  if (!req.body.name || !req.body.amount) {
    utils.sendErrResponse(res, 400, 'Name and amount are required.');
  } else {
    Event.addCost(req.event._id, req.body.name, req.body.amount, req.body.description,
        function(err) {
          if (err) {
            utils.sendErrResponse(res, 500, err);
          } else {
            utils.sendSuccessResponse(res, true);
          }
        });
  }
});

/*
    POST /events/:event/addplanner
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding a planner to the Event
     - err: on failure, an error message
*/
router.post('/:event/addplanner', function(req, res) {
  // add another planner to the event
  if (!req.body.planner) {
    utils.sendErrResponse(res, 404, 'Planner is required');
  }
  Events.addPlanner(req.event._id, req.body.planner, function(err) {
    if (err) {
      utils.sendErrResponse(res, 404, err);
    } else {
      utils.sendSuccessResponse(res, true);
    }
  })
});

/*
    POST /events/:event/addinformation
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding information to the Event
     - err: on failure, an error message
*/
router.post('/:event/addinformation', function(req, res) {
  // add information to the event
  if (!req.body.information) {
    utils.sendErrResponse(res, 404, 'Information is required.');
  }
  Event.addInformation(req.event._id, information, function(err) {
    if (err) {
      utils.sendErrResponse(res, 500, err);
    } else {
      utils.sendSuccessResponse(res, true);
    }
  });
});

/*
    POST /events/:event/addcategory
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding information to the Event
     - err: on failure, an error message
*/
router.post('/:event/addcategory', function (req, res) {
  // Just add the category to the event.
  Event.addCategory(req.event._id, function(err, id) {
    if (err) {
      utils.sendErrResponse(res, 500, err);
    } else {
      utils.sendSuccessResponse(res, id);
    }
  });
});

/*
    POST /events/:event/addinvite
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding information to the Event
     - err: on failure, an error message
*/
router.post('/:event/addinvite', function (req, res) {
  if (!req.body.attendee) {
    utils.sendErrResponse(res, 400, 'Attendee email required.');
  }
  Event.addInvite(req.event._id, req.body.attendee, function(err) {
    if (err) {
      utils.sendErrResponse(res, 500, err);
    } else {
      utils.sendSuccessResponse(res, true);
    }
  });
});

/*
    POST /events/:event/category/:category/addtodo
    Request parameters:
     - event ID: the unique ID of the event we're going to modify
     - category: the category that we are going to add the todo to
    Response:
     - success: true if server succeeded in adding a todo to a category
     - err: on failure, an error message
*/
router.post('/:event/category/:category/addtodo', function (req, res) {
  if (!req.body.todo) {
    utils.sendErrResponse(res, 500, 'Todo is required.');
  }
  // Add Event todo
  // Event.addTodo()
  utils.sendErrResponse(res, 404, 'Route not configured');
});

/*
    DELETE /events/:event/cost/:cost
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
     - cost ID: the identifier for the cost of an event.
    Response:
     - success: true if the server succeeded in deleting the user's event's cost
     - err: on failure, an error message
*/
router.delete('/:event/cost/:cost', function(req, res) {
  // Delete cost
  utils.sendErrResponse(res, 404, 'Route not configured');
});

/*
    DELETE /events/:event/planner/:planner
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
     - planner ID: the unique ID of the planner who will be removed for the list of planners
    Response:
     - success: true if the server succeeded in deleting the planner from the event
     - err: on failure, an error message
*/
router.delete('/:event/planner/:planner', function(req, res) {
  // Delete Planner
  utils.sendErrResponse(res, 404, 'Route not configured');
});

/*
    DELETE /events/:event/category/:category
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
     - category ID: the unique ID of the category in the event.
    Response:
     - success: true if the server succeeded in deleting the event's category
     - err: on failure, an error message
*/
router.delete('/:event/category/:category', function (req, res) {
  // Delete category
  utils.sendErrResponse(res, 404, 'Route not configured');
});

/*
    DELETE /events/:event/category/:category/todo/:todo
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
    Response:
     - success: true if the server succeeded in deleting the user's event
     - err: on failure, an error message
*/
router.delete('/:event/category/:category/todo/:todo', function (req, res) {
    // Delete todo
    utils.sendErrResponse(res, 404, 'Route not configured');
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
// DISABLED FOR NOW...
// router.post('/:event', function(req, res) {
//     // Update an event
//     utils.sendErrResponse(res, 404, 'Route not configured');
// });

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
    Event.deleteEvent(req.currentUser._id, req.event._id, function(err) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, true);
      }
    });
});

/*
    GET /events
    No request parameters
    Response:
     - success: true if the server succeeded in getting the user's events
     - content: on success, an object with a single field 'events' which contains
            user's events
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
    GET /events/:event
    Parameters
     - event: event id whose record will be looked up
    Response:
     - success: true if the server succeeded in getting the user's events
     - content: on success, an object with a single field 'events' which contains
            user's events
     - err: on failure, an error message
*/
router.get('/:event', function(req, res) {
  if (!req.event) {
    utils.sendErrResponse(res, 404, "Invalid event id.");
  } else {
    utils.sendSuccessResponse(res, req.event);
  }
})

/*
    POST /events
    Request body:
     - content: the content of the event
    Response:
     - success: true if the server succeeded in recording the user's event
     - err: on failure, an error message
*/
router.post('/', function(req, res) {
    // Create a new event
    if (!req.body.email || !req.body.name || !req.body.time) {
      utils.sendErrResponse(res, 400, 'Email, name and time required in request');
    }

    Event.createNewEvent(req.body.email, req.body.name, req.body.time, function(err, event) {
      utils.sendSuccessResponse(res, event);
    });
});


module.exports = router;
