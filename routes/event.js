var express = require('express');
var router = express.Router({mergeParams:true});
var utils = require('../utils/utils');
var mailer = require('../config/mailer.js');
var ejs = require('ejs');

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

var isAuthorized = function(req, res) {
  if(req.isAuthenticated()) {
    // Do the comparison of req.user and event to insure that the user is
    // authenticated and authorized
    if (req.event.host.equals(req.user._id) || req.event.planners.indexOf(req.user._id) > -1) {
      return true;
    } else {
      utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
      return false;
    }
  } else {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    return false;
  }
}

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


// Routes that do not always require authentication

// GET requests
/*
    GET /events/public
    No request parameters
    Response:
     - success: true if the server succeeded in getting the user's events
     - content: on success, an object with a single field 'events' which contains
            user's events
     - err: on failure, an error message
*/
router.get('/public', function(req, res) {
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

/*
    GET /events/:event/attend
    Parameters
     - event: event id whose record will be looked up
    Response:
     - success: true if the server succeeded in getting the user's events
     - content: on success, an object with a single field 'events' which contains
            user's events
     - err: on failure, an error message
*/
router.get('/:event/attend', function(req, res) {
  res.render('rsvp');
});

/*
    GET /events/:event/details
    Parameters
     - event: event id whose record will be looked up
    Response:
     - success: returns details if the server succeeded in getting the events details
     - content: on success, an object with a single field 'event' which contains
            the events details
     - err: on failure, an error message
*/
router.get('/:event/details', function(req, res) {
  if (req.event) {
    // Remove the details that we shouldnt send.
    var event = utils.packageEventDetails(req);
    utils.sendSuccessResponse(res, {'event' : event});
  } else {
    utils.sendErrResponse(res, 500, 'Couldnt find the event');
  }
})

// POST requests

/*
    POST /events/:event/attend[?accesscode=]
    Request parameters:
     - event ID: the unique ID of the event we're going to change
     - accesscode: access code needed to attend private events
    Response:
     - success: true if server succeeded in adding attendee to the Event
     - err: on failure, an error message
*/
router.post('/:event/attend', function(req, res) {
  // Mark attendance for event
  if (!req.body.email || !req.body.name) {
    utils.sendErrResponse(res, 500, 'Email and name required.');
  } else {
    // TODO(ersosales): handle private events in the same function
    if (req.body.attending == 'true') {
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

// PUT requests

// DELETE requests

// Register the middleware handlers above
router.all('*', requireAuthentication);

/*
  At this point, all requests are authenticated and checked:
  1. Clients must be logged into some account
  2. If accessing or modifying a specific resource, the client must own that event
  3. Requests are well-formed
*/

// GET requests
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
  Event.getEventsByUser(req.user.email, function(err, my_events) {
      if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
      } else {
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
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
  if (!req.event) {
    utils.sendErrResponse(res, 404, "Invalid event id.");
  } else {
    Event.getPlanners(req.event._id, function(err, new_planners) {
      if (err) {
        utils.sendErrResponse(res, 500, "An unknown error occurred.");
      } else {
        req.event.planners = new_planners;
        var totalCosts = 0;
        req.event.cost.forEach(function(cost) {
          totalCosts += cost.amount;
        });
        var freeBudget = req.event.budget - totalCosts;
        utils.sendSuccessResponse(res, {event:req.event, planners:new_planners, 'freeBudget': freeBudget});
      }
    });
  }
});


// POST requests
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
      var is_private;
      Event.createNewEvent(req.body.email, req.body.name, req.body.start_date, req.body.end_date, req.body.is_private, function(err, event) {
        utils.sendSuccessResponse(res, event);
      });
    }
});

/*
  POST /events/:event/categories/:category/todos/:todo/assign
  Request body:
    - planner_email: the planner to assign to the todo
  Response:
    - success: true if the server succeeded in assigning the planner to the todo
    - err: on failure, an error message
*/
router.post('/:event/categories/:category/todos/:todo/assign', function(req, res){
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
  if(!req.body.planner_email){
    utils.sendErrResponse(res, 400, 'Planner email required.');
  } else {
    Event.assignTodo(req.event._id, req.category._id, req.todo._id, req.body.planner_email, function(err){
      if (err) {
        utils.sendErrResponse(err, 500, err);
      }else{
        utils.sendSuccessResponse(res, true);
      }
    });
  }
});

/*
    POST /events/:event/costs
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding a cost to the Event
     - err: on failure, an error message
*/
router.post('/:event/costs', function (req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
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
    POST /events/:event/planners
    Request parameters:
     - event ID: the unique ID of the event we're going to change
     - planner_email: the email of the planner being added
    Response:
     - success: true if server succeeded in adding a planner to the Event
     - err: on failure, an error message
*/
router.post('/:event/planners', function(req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
  // add another planner to the event
  if (!req.body.planner_email) {
    utils.sendErrResponse(res, 404, 'Planner is required');
  }else{
    Event.addPlanner(req.event._id, req.body.planner_email, function(err) {
      if (err) {
        utils.sendErrResponse(res, 404, err);
      } else {
        utils.sendSuccessResponse(res, true);
      }
    });
  }
});


/*
    POST /events/:event/categories
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding information to the Event
     - err: on failure, an error message
*/
router.post('/:event/categories', function (req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
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
    POST /events/:event/invite
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding information to the Event
     - err: on failure, an error message
*/
router.post('/:event/invite', function (req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
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
    POST /events/:event/categories/:category/todos
    Request parameters:
     - event ID: the unique ID of the event we're going to modify
     - category: the category that we are going to add the todo to
    Response:
     - success: true if server succeeded in adding a todo to a category
     - err: on failure, an error message
*/
router.post('/:event/categories/:category/todos', function (req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
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

var mailerCallback = function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log('Email sent.');
  }
};

/*
    Send email from user to user, and bcc all planners + invitees or attendees

    POST /events/:event/email
    Request body:
     - subject: email subject
     - message: email message
     - date: if given, when the emails will be sent
     - invitation: if true, send invitation emails
     - attendee: if true, bcc message to only attendees
    Response:
     - success: true if email sent or scheduled
     - err: on failure, an error message
*/
router.post('/:event/email', function(req, res) {
  var addressesCallback = function(err, email_addresses) {

      Event.getPlannerEmails(req.event, function(err, planner_addresses) {
        if (err) {
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
          email_addresses.push(req.event.hostEmail);
          Array.prototype.push.apply(email_addresses, planner_addresses);
          ejs.renderFile(
              __dirname + '/../views/emails/' + (req.body.invitation=="true" ? 'invitation.ejs':'message.ejs'),
              { event: req.event, message: req.body.message, url: req.protocol + '://' + req.get('host') },
              function(err, email_html) {
                if (err) {
                  utils.sendErrResponse(res, 500, 'An unknown error occurred.');
                } else {
                  var email = {
                    from: req.user.email,
                    to: req.user.email,
                    bcc: email_addresses,
                    subject: req.body.subject,
                    html: email_html,
                    generateTextFromHTML: true
                  };

                  if (req.body.date) {
                    var date = new Date(req.body.date);
                    if (date < new Date()) {
                      utils.sendErrResponse(res, 400, 'Cannot send emails to the past');
                    } else {
                      mailer.sendEmailAt(email, date, mailerCallback);
                      utils.sendSuccessResponse(res, true);
                    }
                  } else {
                    mailer.sendEmail(email, mailerCallback);
                    utils.sendSuccessResponse(res, true);
                  }
                }
              });
        }
      });
    }


  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
  if (!req.body.subject) {
    utils.sendErrResponse(res, 400, 'Email subject is required.');
  } else if (req.body.attendee=="true") {
    Event.getAttendeeEmails(req.event, addressesCallback);
  } else {
    Event.getInviteeEmails(req.event, addressesCallback);
  }
});

// PUT requests
/*
    PUT /events/:event
    Request parameters:
     - event ID: the unique ID of the event we're going to change
    Response:
     - success: true if server succeeded in adding information to the Event
     - err: on failure, an error message
*/
router.put('/:event', function(req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
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
    PUT /events/:event/categories/:category
    Request parameters:
     - event ID: the unique ID of the event we're going to modify
     - category: the category we're going to modify
     - new_name: the new name for the category
    Response:
     - success: true if server succeeded in changing name of category
     - err: on failure, an error message
*/
router.put('/:event/categories/:category', function(req, res) {
  if (!req.body.new_name) {
    utils.sendErrResponse(res, 500, 'You must specify a new name.');
  } else {
    Event.editCategory(req.event, req.category, req.body.new_name, function(err, success) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, success);
      }
    });
  }
});

/*
    PUT /events/:event/categories/:category/todos/:todo?status=[check|uncheck|edit]
    Request parameters:
     - event ID: the unique ID of the event we're going to modify
     - category: the category that we are going to modify
     - todo: todo which is going to be updated
     - status: one of three options:
          check: given todo will be checked
          uncheck: given todo will be unchecked
          edit: given todo will have updated information
     - information: required if status==edit, object containing fields to change
    Response:
     - success: true if server succeeded in marking todo
     - err: on failure, an error message
*/
router.put('/:event/categories/:category/todos/:todo', function(req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
  if (!req.body.status || (req.body.status != 'check' && req.body.status != 'uncheck' && req.body.status != 'edit')) {
    utils.sendErrResponse(res, 500, 'Status missing from the URL');
  }
  if (req.body.status == 'check') {
    Event.checkTodo(req.event, req.category, req.todo, function(err, success) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, success);
      }
    });
  } else if (req.body.status == 'uncheck') {
    Event.uncheckTodo(req.event, req.category, req.todo, function(err, success) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, success);
      }
    });
  } else if (req.body.status == 'edit') {
    Event.editTodo(req.event, req.category, req.todo, req.body.information, function(err, success) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, success);
      }
    });
  } else {
    utils.sendErrResponse(res, 500, 'Something went wrong');
  }
});

/*
PUT
/events/:event/categories/:category
*/
router.put('/:event/categories/:category', function(req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }

});


// DELETE requests

/*
    DELETE /events/:event/costs/:cost
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
     - cost ID: the identifier for the cost of an event.
    Response:
     - success: true if the server succeeded in deleting the user's event's cost
     - err: on failure, an error message
*/
router.delete('/:event/costs/:cost', function(req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
  // Delete cost
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
    DELETE /events/:event/planners/:planner
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
     - planner ID: the unique ID of the planner who will be removed for the list of planners
    Response:
     - success: true if the server succeeded in deleting the planner from the event
     - err: on failure, an error message
*/
router.delete('/:event/planners/:planner', function(req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
  // Delete Planner
  utils.sendErrResponse(res, 404, 'Route not configured');
});

/*
    DELETE /events/:event/categories/:category
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
     - category ID: the unique ID of the category in the event.
    Response:
     - success: true if the server succeeded in deleting the event's category
     - err: on failure, an error message
*/
router.delete('/:event/categories/:category', function (req, res) {
  if (! isAuthorized(req, res)) {
    // Error response has already sent in isAuthorized.
    return false;
  }
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
    DELETE /events/:event/categories/:category/todos/:todo
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
    Response:
     - success: true if the server succeeded in deleting the user's event
     - err: on failure, an error message
*/
router.delete('/:event/categories/:category/todos/:todo', function (req, res) {
    if (! isAuthorized(req, res)) {
      // Error response has already sent in isAuthorized.
      return false;
    }
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
    DELETE /events/:event
    Request parameters:
     - event ID: the unique ID of the event within the logged-in user's collection
    Response:
     - success: true if the server succeeded in deleting the user's event
     - err: on failure, an error message
*/
router.delete('/:event', function(req, res) {
    if (! isAuthorized(req, res)) {
      // Error response has already sent in isAuthorized.
      return false;
    }
    // Delete the event and verify that its owned by the user
    Event.deleteEvent(req.user._id, req.body.event_id, function(err) {
      if (err) {
        utils.sendErrResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, true);
      }
    });
});

module.exports = router;
