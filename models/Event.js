var User = require("../models/User");

//Model code for Event object

var Event = (function Event() {
  var mongoose = require('mongoose');
  var Schema = require('mongoose').Schema;

  var todoSchema = new Schema({
    name      : String,     //required
    deadline    : Date,     //required (in database)
    status      : {type:Number, default:0}, // default unchecked (0: unchecked, 1: checked)
    priority    : {type:Number, default:0}  //default none
  });
  var categorySchema = new Schema({
    name      : String,     //required
    todos       : {type:[todoSchema], default:[]}
  });
  var costSchema = new Schema({
    name      : String,     //required
    amount      : Number,     //required
    description   : {type:String, default:""},
  });
  var attendeeSchema = new Schema({
    userId      : Schema.Types.ObjectId, //link to user database (default = nonexistent)
    name      : {type:String, default:""},
    email       : String,   //required
    attending     : {type:Number, default:0},
    //0 if invited (unknown reply), 1 if yes, 2 if no (internal only)
    note      : {type:String, default:""},
  });
  var eventSchema = new Schema({
    name      : String,     //required
    description   : {type:String, default:""},
    host      : Schema.Types.ObjectId,   //required, link to user database
    hostEmail     : String,     //required (in database)
    planners    : {type:[Schema.Types.ObjectId], default:[]},   //     ^

    start       : Date,     //required
    end       : Date,     //required (can be same as start)
    location    : {type:String, default:""},
    budget      : {type:Number, default:0},
    cost      : {type:[costSchema], default:[]},

    attendees     : {type:[attendeeSchema], default:[]},

    categories    : {type:[categorySchema], default:[]},
  });

  var _model = mongoose.model('event', eventSchema);

//PRIVATE METHODS
  var _ifEventExists = function(id, callback) {
    _model.count({_id : id}, function(err, count) {
      if (count == 1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  };

  var _getEvent = function(id, callback) {
    _ifEventExists(id, function(err, exists) {
      if (exists) {
        _model.findById(id, callback);
      } else {
        callback({msg: "No such event."});
      }
    });
  };

  // returns an object that is
  // {
  //  event: _event
  //  category: _category
  // }
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

  var _getEventsByUserId = function(userid, callback) {
    _model.find({$or:[{'host':userid}, {'planners':userid}]}, callback);
  };

//PUBLIC METHODS
  var _findById = function(id, callback) {
    _getEvent(id, callback);
  };

  /*
    event_name is a string,
    event_time is a Date object
  */
  var _createNewEvent = function(host_email, event_name, event_start, event_end, callback) {
    User.findByEmail(host_email, function(err, user) {
      if (err) {
        callback(err);
      } else {
        _model.create({
          'name' : event_name,
          'start' : event_start,
          'end' : event_end,
          'hostEmail' : host_email,
          'host' : user._id,
        }, callback);
      }
    });
  };

  var _clearAllEvents = function(callback) {
    _model.remove({}, callback);
  };

  var _getEventsByUser = function(email, callback) {
    User.findByEmail(email, function(err, user) {
      if (err) {
        callback(err);
      } else {
        _getEventsByUserId(user._id, callback);
      }
    });
  };

  var _getPublicEvents = function(callback) {
    // for now return all events (no private events for now)
    _model.find({}, callback);
  };

  var _getPublicEventById = function(eventid, callback) {
    _getEvent(eventid, function(err, event) {
      // TODO(erosolar): implement this check
      // if (!event.public is true) then throw error
      // otherwise just return the thing
      callback(err, event);
    });
  };

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

  // information is an object with keys in the schemas above
  // CANNOT USE THIS METHOD TO ADD PLANNERS OR COSTS OR INVITEES
  //    (OR ANYTHING IN A LIST)
  var _setInformation = function(eventid, information, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        _model.findByIdAndUpdate(eventid, information, callback);
      } else {
        callback({msg: "No such event."});
      }
    });
  };

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

  var _deletePlanner = function(eventid, plannerid, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        _model.findOneAndUpdate({'_id':eventid, 'planners':plannerid},
                    {$unset:{'planners':plannerid}},
                    {new:true},
                    function(err, result) {
          if (result) {
            callback(err, true);
          } else {
            callback({msg: "No such planner."});
          }
        });
      } else {
        callback({msg:"No such event."});
      }
    });
  };

  //description is optional
  var _addCost = function(eventid, name, amount, description, callback) {
    var cost = {
      'name': name,
      'amount': amount,
      'description':description || "",
    };
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        _model.findByIdAndUpdate(eventid, {$push:{cost: cost}}, {new:true}, callback);
      } else {
        callback({msg: "No such event."});
      }
    });
  };

  //TODO(erosolar): implement this
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

  var _addInvite = function(eventid, attendee_email, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        User.findByEmail(attendee_email, function(err, user) {
          if (err) {//no such user, create attendee
            _model.findByIdAndUpdate(eventid,
              {$push:{attendees:{'email': attendee_email}}}, callback);
          } else { //user exists, attach userid to attendee
            _model.findByIdAndUpdate(eventid,
              {$push:{attendees:{'email': attendee_email, 'userId': user._id}}}, callback);
          }
        });
      } else {
        callback({msg: "No such event."});
      }
    });
  };

  //note from attendee is optional
  var _markAttending = function(eventid, attendee_email, attendee_name, note_from_attendee, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        _model.update({'_id':eventid, 'attendees.email':attendee_email},
                {$set: {'attendees.$.attending':1,
                    'attendees.$.name':attendee_name,
                    'attendees.$.note':note_from_attendee || ""}},
                 function(err, result) {
                   if(result.nModified === 0) {
                     _model.update({'_id':eventid},
                           {$push: {'attendees':{'attending':1,
                                       'name':attendee_name,
                                       'email':attendee_email,
                                       'note':note_from_attendee}}}, callback);
                   } else {
                     callback(err, result);
                   }
                 });
      } else {
        callback({msg: "No such event."});
      }
    });
  };

  var _markNotAttending = function(eventid, attendee_email, attendee_name, note_from_attendee, callback) {
    _ifEventExists(eventid, function(err, exists) {
      if (exists) {
        _model.update({'_id':eventid, 'attendees.email':attendee_email},
                {$set: {'attendees.$.attending':2,
                    'attendees.$.note':note_from_attendee || ""}},
                    function(err, result) {
                      if(result.nModified === 0) {
                        callback({msg:"No such invitee."});
                      } else {
                        callback(err, result);
                      }
                    });
      } else {
        callback({msg: "No such event."});
      }
    });
  };

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

  var _getInvitedCount = function(eventid, callback) {
    _getEvent(eventid, function(err, event) {
      if (err) {
        callback(err);
      } else {
        callback(err, event.attendees.length);
      }
    });
  };

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

  return {
    findById            : _findById,
    createNewEvent      : _createNewEvent,
    clearAllEvents      : _clearAllEvents,
    getEventsByUser     : _getEventsByUser,
    getPublicEvents     : _getPublicEvents,
    getPublicEventById  : _getPublicEventById,
    deleteEvent         : _deleteEvent,
    setInformation      : _setInformation,
    addPlanner          : _addPlanner,
    deletePlanner       : _deletePlanner,
    addCost             : _addCost,
    deleteCost          : _deleteCost,
    addInvite           : _addInvite,
    markAttending       : _markAttending,
    markNotAttending    : _markNotAttending,
    getAttendingCount   : _getAttendingCount,
    getInvitedCount     : _getInvitedCount,
    getInviteeEmails    : _getInviteeEmails,
    getAttendeeEmails   : _getAttendeeEmails,
    addTodo             : _addTodo,
    addCategory         : _addCategory,
    checkTodo           : _checkTodo,
    uncheckTodo         : _uncheckTodo,
    deleteTodo          : _deleteTodo,
    deleteCategory      : _deleteCategory,
  };
})();
module.exports = Event;
