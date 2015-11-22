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
    if (!req.isAuthenticated()) {
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

router.param('todo', function(req, res, next, todoId) {
  if (todoId) {
    req.todo = todoId;
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
  }else{
    Events.addPlanner(req.event._id, req.body.planner, function(err) {
      if (err) {
        utils.sendErrResponse(res, 404, err);
      } else {
        utils.sendSuccessResponse(res, true);
      }
    })
  }

});

/*
    POST /events/:event/setInformation
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding information to the Event
     - err: on failure, an error message
*/
router.post('/:event/setInformation', function(req, res) {
  // add information to the event
  if (!req.body.information) {
    utils.sendErrResponse(res, 404, 'Information is required.');
  }else{
    Event.setInformation(req.event._id, req.body.information, function(err) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, true);
      }
    });
  }

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
  if (!req.body.name) {
    utils.sendErrResponse(res, 500, 'Name is required.');
  }else{
    //console.log(req);
    // Just add the category to the event.
    Event.addCategory(req.event._id, req.body.name, function(err, id) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, id);
      }
    });
  }

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
  if (!req.body.name || !req.body.deadline) {
    utils.sendErrResponse(res, 500, 'Name and deadline are required.');
  }else{
    Event.addTodo(req.event, req.category, req.body.name, req.body.deadline, req.body.priority,
        function(err, newTodo) {
          if (err) {
            utils.sendErrResponse(res, 500, err);
          } else {
            utils.sendSuccessResponse(res, newTodo);
          }
        }
    );
  }
  // Add Event todo

});

/*
    POST /events/:event/category/:category/todo/:todo/check
    Request parameters:
     - event ID: the unique ID of the event we're going to modify
     - category: the category that we are going to modify
     - todo: todo which is going to be marked as checked

    Response:
     - success: true if server succeeded in marking todo
     - err: on failure, an error message
*/
router.post('/:event/category/:category/todo/:todo/check', function(req, res) {
  Event.checkTodo(req.event, req.category, req.todo, function(err, success) {
    if (err) {
      utils.sendErrResponse(res, 500, err);
    } else {
      utils.sendSuccessResponse(res, success);
    }
  });
});

/*
    POST /events/:event/category/:category/todo/:todo/uncheck
    Request parameters:
     - event ID: the unique ID of the event we're going to modify
     - category: the category that we are going to modify
     - todo: todo which is going to be marked as unchecked

    Response:
     - success: true if server succeeded in marking todo
     - err: on failure, an error message
*/
router.post('/:event/category/:category/todo/:todo/uncheck', function(req, res) {
  Event.uncheckTodo(req.event, req.category, req.todo, function(err, success) {
    if (err) {
      utils.sendErrResponse(res, 500, err);
    } else {
      utils.sendSuccessResponse(res, success);
    }
  });
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
  console.log(req.cost._id);
  Event.deleteCost(req.event._id, req.cost,
      function(err) {
        if (err) {
          utils.sendErrResponse(res, 500, err);
        } else {
          utils.sendSuccessResponse(res, true);
        }
      });
  }

);

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
  Event.deleteCategory(req.event, req.category, function(err, success) {
    if (err) {
      utils.sendErrResponse(res, 500, err);
    } else {
      utils.sendSuccessResponse(res, success);
    }
  });
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
    Event.deleteTodo(req.event, req.category, req.todo, function(err, success) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, success);
      }
    });
});

/*
    POST /events/:Event
    Request parameters:
     - event ID: the unique ID of the event we're going to update
    Response:
     - success: true if server succeeded in updating Event
     - err: on failure, an error message
*/
router.post('/:event', function(req, res) {
  if (!req.body.information) {
    utils.sendErrResponse(res, 500, 'Information required.');
  } else {
    // Update an event
    Event.setInformation(req.event, req.body.information, function(err, event) {
      if (err) {
        callback(err);
      } else {
        callback(err, event);
      }
    });
  }
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
    Event.deleteEvent(req.currentUser._id, req.body.event_id, function(err) {
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
    // Find all of the events that are visible to the user
    Event.getEventsByUser(req.currentUser.email, function(err, my_events) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            my_events.forEach(function(event) {
                //TODO(erosales): Change this according to what is actualy stored to check user
                if (event.author === req.currentUser.username) {
                    event.is_mine = true;
                } else {
                    event.is_mine = false;
                }
            });
            my_events = my_events.reverse();
            utils.sendSuccessResponse(res, my_events);
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
    if (!req.body.email || !req.body.name || !req.body.start_date || !req.body.end_date) {
      utils.sendErrResponse(res, 400, 'Email, name, and time required.');
    }else{
      Event.createNewEvent(req.body.email, req.body.name, req.body.start_date, req.body.end_date, function(err, event) {
        utils.sendSuccessResponse(res, event);
      });
    }


});
module.exports = router;
