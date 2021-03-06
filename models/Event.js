var User = require("../models/User");

//Model code for Event object

var Event = (function Event() {
  var mongoose = require('mongoose');
  var Schema = require('mongoose').Schema;
  var validator = require('validator');

  // Schema for a todo (a task that should be accomplished)
  var todoSchema = new Schema({
    name          : {type:String, required:true, maxlength:100},
    deadline      : {type:Date, required:true},
    status        : {type:Number, default:0}, // (0: unchecked, 1: checked)
    priority      : {type:Number, default:0}, //default none
    assignee      : {type:String, default:""}
  });
  // Schema for a category (a collection of related todos)
  var categorySchema = new Schema({
    name          : {type:String, required:true, maxlength:100},
    todos         : {type:[todoSchema], default:[]}
  });
  // Schema for a cost object (a description of a particular expense)
  var costSchema = new Schema({
    name          : {type:String, required:true, maxlength:100},
    amount        : {type:Number, required:true},
    description   : {type:String, default:""},
  });
  // Schema for an attendee (someone attending an event)
  var attendeeSchema = new Schema({
    userId        : {type:Schema.Types.ObjectId, ref:'user'}, //link to user database (default = nonexistent)
    name          : {type:String, default:"", maxlength:100},
    email         : {type:String, required:true, validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not an email address.'
    }},
    attending     : {type:Number, default:0},
    //0 if invited (unknown reply), 1 if yes, 2 if no (internal only)
    note          : {type:String, default:"", maxlength:300},
  });
  // Schema for an entire event, including (multiples of) the above schemas
  var eventSchema = new Schema({
    name          : {type:String, required:true, maxlength:100},
    description   : {type:String, default:""},
    private       : {type:Boolean, default:false},
    host          : {type:Schema.Types.ObjectId, required:true, ref:User}, //link to user database
    hostEmail     : {type:String, required:true, validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not an email address.'
    }},
    planners      : {type:[{type:Schema.Types.ObjectId, ref:'user'}], default:[]},  //     ^

    start         : {type:Date, required:true},
    end           : {type:Date, required:true}, // can be same as, but not earlier than, start
    location      : {type:String, default:"", maxlength:100},
    budget        : {type:Number, default:0},
    cost          : {type:[costSchema], default:[]},

    attendees     : {type:[attendeeSchema], default:[]},

    categories    : {type:[categorySchema], default:[]},
  });

  var _model = mongoose.model('event', eventSchema);

//PRIVATE METHODS
// returns true/false: event with given id exists/doesn't exist
  var _ifEventExists = function(id, callback) {
    _model.count({_id : id}, function(err, count) {
      if (count == 1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  };

  // returns event with given id, if exists, or error if doesn't exist
  var _getEvent = function(id, callback) {
    _ifEventExists(id, function(err, exists) {
      if (exists) {
        _model.findById(id, callback);
      } else {
        callback({msg: "No such event."});
      }
    });
  };

  // returns {event: <event>, category:<category>} for given eventid, categoryid
  var _getCategory = function(eventId, categoryId, callback) {
    _getEvent(eventId, function(err, event) {
      if (event) {
        if (event.categories.id(categoryId)) {
          callback(err, {
            "event": event,
            "category": event.categories.id(categoryId)});
        } else {
          callback({msg: "Category doesn\'t exist"});
        }
      } else {
        callback(err);
      }
    });
  };

  // returns all events that a given user is planning (or helping to plan)
  var _getEventsByUserId = function(userid, callback) {
    _model.find({$or:[{'host':userid}, {'planners':userid}]}, callback);
  };

//PUBLIC METHODS

  /** Finds and passes through an event
   *  Arguments:
   *    id: the id of the event to be found
   *    callback: a function to pass the found event to
   *  Returns:
   *    event, if found, else 'no event found' error
   */
  var _findById = function(id, callback) {
    _getEvent(id, callback);
  };

  /** Creates a new event in the database
   *  Arguments:
   *    host_email: the email of the main planner for the new event
   *    event_name: the name of the event (a string)
   *    event_start: when the event starts (a Date object)
   *    event_end: when the event ends (also a Date object)
   *    is_private: true if the event is private
   *    callback: a function to call once the event is created
   *  Returns:
   *    undefined.
   */
  var _createNewEvent = function(host_email, event_name, event_start, event_end, is_private, callback) {
    User.findByEmail(host_email, function(err, user) {
      if (err) {
        callback(err);
      } else {
        _model.create({
          'name' : event_name,
          'start' : event_start,
          'end' : event_end,
          'private' : is_private,
          'hostEmail' : host_email,
          'host' : user._id,
        }, function(err, newEvent) {
          if (err && err.name === 'ValidationError' && err.errors.email) {
            callback({msg:err.errors.email.message});
          } else {
            callback(err, newEvent);
          }
        });
      }
    });
  };

  /** Removes all events from the database. Used for testing purposes.
   *  Arguments:
   *    callback: a function to call once the database is cleared
   *  Returns:
   *    undefined
   */
  var _clearAllEvents = function(callback) {
    _model.remove({}, callback);
  };

  /** Gets all events being planned by a particular user
   *  Arguments:
   *    email: the email of the planner for whom to find events
   *    callback: a function to pass found events to
   *  Returns:
   *    list of found events (or [] if no events found), or error if
   *    user doesn't exist.
   */
  var _getEventsByUser = function(email, callback) {
    User.findByEmail(email, function(err, user) {
      if (err) {
        callback(err);
      } else {
        _getEventsByUserId(user._id, callback);
      }
    });
  };

  /** Finds all public events (events that anyone can see)
   *  Arguments:
   *    callback: a function to pass found events to
   *  Returns:
   *    list of events found (or [] if no public events found)
   */
  var _getPublicEvents = function(callback) {
    _model.find({private:false}, callback);
  };

  /** Finds a specific public event by id
   *  Arguments:
   *    event_id: the id of the event to be found
   *    callback: a function to pass the found event to
   *  Returns:
   *    event, if exists and is public. else, 'event not found' error
   */
  var _getPublicEventById = function(eventid, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      }
      if (event.private) {
        callback({msg:"No such event."});
      } else {
        callback(err, event);
      }
    });
  };

  /** Removes an event from the database
   *  Arguments:
   *    userid: the id of the user trying to delete the event
   *    eventid: the id corresponding to the event that should be deleted
   *    callback: a function to call once the event is deleted
   *  Returns:
   *    undefined on success; 'incorrect authority' error if user doesn't
   *    have proper authority (isn't planning given event), or 'no such event'
   *    error if event not found.
   */
  var _deleteEvent = function(userid, eventid, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        _getEvent(eventid, function(err, found_event) {
          if (found_event.host.equals(userid)) {
            _model.findByIdAndRemove(eventid, callback);
          } else {
            callback({msg:"You do not have the authority to delete this Event."});
          }
        });
      } else {
        callback({msg:"No such event."});
      }
    });
  };

  /** Updates or adds information to an event in the database
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    information: an object containing the fields that should be changed and
   *      their new values (eg {name: "new name"})
   *        Note: this cannot be used with array fields (eg. planners, costs,
   *          etc) - use the specified methods for adding/removing those.
   *    callback: a function to call once the event is updated
   *  Returns:
   *    undefined on success; 'no such event' error if event not found.
   */
  var _setInformation = function(eventid, information, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        _model.findByIdAndUpdate(eventid, information, callback);
      } else {
        callback({msg: "No such event."});
      }
    });
  };

  /** Adds a planner to an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    planner_email: the email of the planner being added
   *    callback: a function to call once the planner is added
   *  Returns:
   *    undefined on success; 'no such event' error if event not found.
   */
  var _addPlanner = function(eventid, planner_email, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        User.findByEmail(planner_email, function(err, planner) {
          if (err) {
            callback(err);
          } else {
            _model.findByIdAndUpdate(eventid, {$push:{'planners':planner._id}},{new:true}, callback);
          }
        });
      } else {
        callback({msg:"No such event."});
      }
    });
  };

  var _getPlanners = function(eventid, callback) {
    _getEvent(eventid, function(err, found_event) {
      if (err) {
        callback(err);
      } else {
        found_event.populate('planners', function(err, new_event) {
          if (err) {
            callback(err);
          } else {
            callback(err, new_event.planners.map(function(planner) {
              return {email:planner.email, _id:planner._id, username:planner.username};
            }));
          }
        });
      }
    });
  };

  /** Gets emails of all planners of an event (not including host)
   *  Arguments:
   *    eventid: the id of the event to get planners' emails from
   *    callback: a function to pass the list of planner emails to
   *  Returns:
   *    a list of planners' emails if event exists ([] if none), or 'no such event'
   *    error if event not found.
   */
  var _getPlannerEmails = function(eventid, callback) {
    _getEvent(eventid, function(err, found_event) {
      if (err) {
        callback(err);
      } else {
        found_event.populate('planners', function(err, new_event) {
          if (err) {
            callback(err);
          } else {
            callback(err, new_event.planners.map(function(planner) {
              return planner.email;
            }));
          }
        });
      }
    });
  };

  /** Removes a planner from an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    plannerid: the id of the planner to be removed
   *    callback: a function to call once the event is updated
   *  Returns:
   *    undefined on success; 'no such planner' error if planner not attached
   *    to event; 'no such event' error if event not found.
   */
  var _deletePlanner = function(eventid, plannerid, callback) {
    _getEvent(eventid, function(err, found_event) {
      if (err) {
        callback(err);
      } else {
        if (found_event.planners.indexOf(plannerid) != -1) {
          found_event.planners.pull(plannerid);
          found_event.save(function(err) {
            if (err) {
              callback(err, false);
            } else {
              callback(err, true);
            }
        });
        } else {
          callback({msg: "No such planner."});
        }
      }
    });
  };

  /** Adds a cost to an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    name: the name of the cost object (eg. "venue")
   *    amount: how much the cost is (in dollars)
   *    description: a description of the cost object
   *    callback: a function to call once the event is updated
   *  Returns:
   *    undefined on success; 'no such event' error if event not found.
   */
  var _addCost = function(eventid, name, amount, description, callback) {
    var cost = {
      'name': name,
      'amount': amount,
      'description':description || "",
    };
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        event.cost.push(cost);
        event.save(function(err) {
          callback(err);
        });
      }
    });
  };

  /** Removes a cost from an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    costid: the id of the cost to be removed
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true if deleted successfully; false if error while deleting; error if
   *    event not found
   */
  var _deleteCost = function(eventId, costid, callback) {
    _getEvent(eventId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        result.cost.id(costid).remove();
        result.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Returns the sum of all costs in an event
   *  Arguments:
   *    eventid: the id of the event to get information from
   *    callback: a function to pass information to
   *  Returns:
   *    total cost; 'no such event' error if event not found.
   */
  var _getTotalCost = function(eventId, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        total = 0;
        event.cost.map(function(one_cost) {
          return one_cost.amount;
        }).each(function(one_cost) {
          total+= one_cost;
        });
        callback(err, total);
      }
    });
  };

  /** Returns the budget remaining for an event
   *  Arguments:
   *    eventid: the id of the event to get information from
   *    callback: a function to pass information to
   *  Returns:
   *    budget - total cost; 'no such event' error if event not found.
   */
  var _getBudgetRemaining = function(eventId, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        _getTotalCost(eventId, function(err, total) {
          callback(err, event.budget - total);
        });
      }
    });
  };

  /** Adds an invitee to an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    attendee_email: the email of the invited person being added
   *    callback: a function to call once the event is updated
   *  Returns:
   *    undefined on success; 'no such event' error if event not found.
   */
  var _addInvite = function(eventid, attendee_email, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        var attendee = { 'email': attendee_email };
        User.findByEmail(attendee_email, function(err, user) {
          if (!err) { //user exists, attach userid to attendee
            attendee.userId = user._id;
          }
          event.attendees.push(attendee);
          event.save(function(err) {
            if (err && err.name === 'ValidationError') {
              for (var item in err.errors) {
                if (err.errors[item].value === attendee_email) {
                  callback({msg:err.errors[item].message});
                  return;
                }
              }
            }
            callback(err);
          });
        });
      }
    });
  };

  /** Removes an invitee from an Event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    attendee: the email of the invited person being removed
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true on success; false if err while saving;
   *    'no such event' error if event not found.
   */
  var _deleteInvitee = function(eventid, attendeeId, callback) {
    _getEvent(eventid, function(err, found_event) {
      if(err) {
        callback(err);
      } else {
        // (event -> category -> todo).remove()
        if (found_event.attendees.id(attendeeId)) {
          found_event.attendees.id(attendeeId).remove();
          found_event.save(function(err) {
            if (err) {
              callback(err, false);
            } else {
              callback(err, true);
            }
          });
        } else {
          callback({msg: "No such invitee."});
        }
      }
    });
  };

  /** Marks an invitee (or person in general) as attending an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    attendee_email: the email of the attendee being marked
   *    attendee_name: the name of the person attending
   *    note_from_attendee: a note from the person attending (optional)
   *    callback: a function to call once the planner is added
   *  Returns:
   *    undefined on success; 'no such event' error if event not found.
   */
  var _markAttending = function(eventid, attendee_email, attendee_name, note_from_attendee, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        var query = event.attendees.filter(function(p) { return p.email === attendee_email; });
        if (query.length < 1) {
          var attendee = { 'email': attendee_email };
        } else {
          var attendee = query[0];
        }
        attendee.attending = 1;
        attendee.name = attendee_name;
        attendee.note = note_from_attendee;
        User.findByEmail(attendee_email, function(err, user) {
          if (!err) { //user exists, attach userid to attendee
            attendee.userId = user._id;
          }
          if (query.length < 1) {
            event.attendees.push(attendee);
          }
          event.save(function(err) {
            if (err && err.name === 'ValidationError') {
              for (var item in err.errors) {
                if (err.errors[item].value === attendee_email) {
                  callback({msg:err.errors[item].message});
                  return;
                }
              }
            }
            callback(err);
          });
        });
      }
    });
  };

  /** Marks an invitee (or person in general) as not attending an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    attendee_email: the email of the attendee being marked
   *    attendee_name: the name of the person (not) attending
   *    note_from_attendee: a note from the person (not) attending (optional)
   *    callback: a function to call once the planner is added
   *  Returns:
   *    undefined on success; 'no such event' error if event not found;
   *    'no such attendee' error if attendee_email not found
   */
  var _markNotAttending = function(eventid, attendee_email, attendee_name, note_from_attendee, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        var query = event.attendees.filter(function(p) { return p.email === attendee_email; });
        if (query.length < 1) {
          callback({msg: "You can only decline an event that you were invited to."});
        } else {
          var attendee = query[0];
          attendee.attending = 2;
          attendee.name = attendee_name;
          attendee.note = note_from_attendee;
          event.save(function(err) {
            callback(err);
          });
        }
      }
    });
  };

  /** Gets the number of people attending an event
   *  Arguments:
   *    eventid: the id of the event to get information from
   *    callback: a function to pass information to
   *  Returns:
   *    number of people attending; 'no such event' error if event not found.
   */
  var _getAttendingCount = function(eventid, callback) {
    _getEvent(eventid, function(err, given_event) {
      if (err) {
        callback(err);
      } else {
        var attending = given_event.attendees.filter(function(attendee) {
          if (attendee.attending == 1) {
            return true;
          } else {
            return false;
          }
        });
        callback(err, attending.length);
      }
    });
  };

  /** Gets the number of people invited to an event
   *  Arguments:
   *    eventid: the id of the event to get information from
   *    callback: a function to pass information to
   *  Returns:
   *    number of people invited; 'no such event' error if event not found.
   */
  var _getInvitedCount = function(eventid, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        callback(err, event.attendees.length);
      }
    });
  };

  /** Gets the emails of people invited to an event
   *  Arguments:
   *    eventid: the id of the event to get information from
   *    callback: a function to pass information to
   *  Returns:
   *    list of emails of people invited (or [] if none); 'no such event'
   *    error if event not found.
   */
  var _getInviteeEmails = function(eventid, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        callback(err, event.attendees.map(function(attendee) {
          return attendee.email;
        }));
      }
    });
  };

  /** Gets the emails of people attending an event
   *  Arguments:
   *    eventid: the id of the event to get information from
   *    callback: a function to pass information to
   *  Returns:
   *    list of emails of people attending (or [] if none); 'no such event'
   *    error if event not found.
   */
  var _getAttendeeEmails = function(eventid, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        callback(err, event.attendees.filter(function(attendee) {
          if (attendee.attending === 1) {
            return true;
          } else {
            return false;
          }
        }).map(function(attendee) {
          return attendee.email;
        }));
      }
    });
  };

  /** Adds a category to an event (to put todos in)
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    category_name: the name of the category to be added
   *    callback: a function to call once the event is updated
   *  Returns:
   *    undefined on success; 'no such event' error if event not found.
   */
  var _addCategory = function(eventid, category_name, callback) {
    _getEvent(eventid, function(err, event) {
      if (event) {
        event.categories.push({name: category_name});
        var newCategory = event.categories[event.categories.length - 1];
        event.save(function(err) {
          if (err) {
            callback(err);
          } else {
            callback(err, newCategory);
          }
        });
      } else {
        callback(err);
      }
    });
  };

  /** Changes the name of a category
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    categoryid: the id of the category to be updated
   *    new_category_name: the intended new name of the category
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true on success; false if error occured while saving; 'no such event'
   *    error if event not found.
   */
  var _editCategory = function(eventid, categoryId, new_category_name, callback) {
    _getCategory(eventid, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        result.event.categories.id(result.category._id).set('name', new_category_name);
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Removes a category from an event
   *  Arguments:
   *    eventId: the id of the event to be updated
   *    categoryId: the id of the category to be removed
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true if deleted successfully; false if error while deleting; error if
   *    event not found
   */
  var _deleteCategory = function(eventId, categoryId, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        result.event.categories.id(result.category._id).remove();
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Adds a todo to an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    categoryid: the id of the category to which to add the todo
   *    todo_name: the name of the todo to be added
   *    todo_deadline: a date by which the todo should be done
   *    todo_priority: the priority of the todo
   *    callback: a function to call once the event is updated
   *  Returns:
   *    undefined on success; 'no such event' error if event not found.
   */
  var _addTodo = function(eventId, categoryId, todo_name, todo_deadline, todo_priority, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        result.event.categories.id(result.category._id).todos.push({
          name: todo_name,
          deadline: todo_deadline,
          priority: todo_priority
        });
        var newTodoIndex = result.event.categories.id(result.category._id).todos.length - 1;
        var newTodo = result.event.categories.id(result.category._id).todos[newTodoIndex];
        result.event.save(function(err) {
          if (err) {
            callback(err);
          } else {
            callback(err, newTodo);
        }
      });
      }
    });
  };

  /** Moves a todo from one category to another
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    old_categoryId: the id of the category from which the todo is being moved
   *    new_categoryId: the id of the category to which the todo is being moved
   *    todoId: the id of the todo to be moved
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true if event saved successfully; false if error while saving;
   *    'no such event' error if event not found.
   */
  var _moveTodo = function(eventId, old_categoryId, new_categoryId, todoId, callback) {
    _getCategory(eventId, old_categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        todo = result.event.categories.id(result.category._id).todos.id(todoId);
        stripped_todo = {name:todo.name,
                         deadline:todo.deadline,
                         status:todo.status, // (0: unchecked, 1: checked)
                         priority:todo.priority};
        result.event.categories.id(new_categoryId).todos.push(stripped_todo);
        result.event.categories.id(result.category._id).todos.id(todoId).remove();
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Edits the name, deadline, and priority of a todo
   *  Arguments:
   *    eventId: the id of the event to be updated
   *    categoryId: the id of the category that this todo is in
   *    todoId: the todo to be updated
   *    information: an object containing fields to be updated (ex. {name:<new name>})
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true on success; false if error while saving event;
   *    'no such event' error if event not found.
   */
  var _editTodo = function(eventId, categoryId, todoId, information, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        // (event -> category -> todo).set(fieldsj
        result.event.categories.id(result.category._id).todos.id(todoId).set(information);
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Assigns the todo to a planner
   *  Arguments:
   *    eventId: the id of the event to be updated
   *    categoryId: the id of the category that this todo is in
   *    todoId: the todo to be updated
   *    planner_email: the email of the planner you wish to assign this todo to
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true on success; false if error while saving event;
   *    'no such event' error if event not found.
   */
  var _assignTodo = function(eventId, categoryId, todoId, planner_email, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        _getPlannerEmails(eventId, function(err, email_list) {
          if (email_list.indexOf(planner_email) != -1 || result.event.hostEmail == planner_email) {
            result.event.categories.id(result.category._id).todos.id(todoId).set('assignee', planner_email);
            result.event.save(function(err) {
              if (err) {
                callback(err, false);
              } else {
                callback(err, true);
              }
            });
          } else {
            callback({msg:"Not a valid planner email"});
          }
        });
      }
    });
  };

  var _removeAssignee = function(eventId, categoryId, todoId, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        result.event.categories.id(result.category._id).todos.id(todoId).set('assignee', undefined);
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Marks a todo as completed
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    categoryid: the id of the category to which to add the todo
   *    todoId: the id of the todo to be updated
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true if success; false if error during deletion; 'no such event'
   *    error if event not found.
   */
  var _checkTodo = function(eventId, categoryId, todoId, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        result.event.categories.id(categoryId).todos.id(todoId).status = 1;
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Marks a todo as uncompleted
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    categoryid: the id of the category to which to add the todo
   *    todoId: the id of the todo to be updated
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true if success; false if error during deletion; 'no such event'
   *    error if event not found.
   */
  var _uncheckTodo = function(eventId, categoryId, todoId, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if (err) {
        callback(err);
      } else {
        result.event.categories.id(categoryId).todos.id(todoId).status = 0;
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  /** Removes a todo from an event
   *  Arguments:
   *    eventid: the id of the event to be updated
   *    categoryid: the id of the cost to be removed
   *    todoId: the id of the todo to be removed
   *    callback: a function to call once the event is updated
   *  Returns:
   *    true if deleted successfully; false if error while deleting; error if
   *    event not found
   */
  var _deleteTodo = function(eventId, categoryId, todoId, callback) {
    _getCategory(eventId, categoryId, function(err, result) {
      if(err) {
        callback(err);
      } else {
        // (event -> category -> todo).remove()
        result.event.categories.id(result.category._id).todos.id(todoId).remove();
        result.event.save(function(err) {
          if (err) {
            callback(err, false);
          } else {
            callback(err, true);
          }
        });
      }
    });
  };

  return Object.freeze({
    findById            : _findById,
    createNewEvent      : _createNewEvent,
    clearAllEvents      : _clearAllEvents,
    getEventsByUser     : _getEventsByUser,
    getPublicEvents     : _getPublicEvents,
    getPublicEventById  : _getPublicEventById,
    deleteEvent         : _deleteEvent,
    setInformation      : _setInformation,
    addPlanner          : _addPlanner,
    getPlanners         : _getPlanners,
    getPlannerEmails    : _getPlannerEmails,
    deletePlanner       : _deletePlanner,
    addCost             : _addCost,
    deleteCost          : _deleteCost,
    addInvite           : _addInvite,
    deleteInvitee       : _deleteInvitee,
    markAttending       : _markAttending,
    markNotAttending    : _markNotAttending,
    getAttendingCount   : _getAttendingCount,
    getInvitedCount     : _getInvitedCount,
    getInviteeEmails    : _getInviteeEmails,
    getAttendeeEmails   : _getAttendeeEmails,
    addTodo             : _addTodo,
    moveTodo            : _moveTodo,
    addCategory         : _addCategory,
    editCategory        : _editCategory,
    editTodo            : _editTodo,
    assignTodo          : _assignTodo,
    removeAssignee      : _removeAssignee,
    checkTodo           : _checkTodo,
    uncheckTodo         : _uncheckTodo,
    deleteTodo          : _deleteTodo,
    deleteCategory      : _deleteCategory,
  });
})();
module.exports = Event;
