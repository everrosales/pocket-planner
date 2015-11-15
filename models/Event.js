var User = require("../models/User");

//Model code for Event object

var Event = (function Event() {
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;

    var todoSchema = new Schema({
        name            : String,       //required
        deadline        : Date,         //required (in database)
        priority        : {type:Number, default:0}  //default none
    });
    var categorySchema = new Schema({
        name            : String,       //required
        todos           : {type:[todoSchema], default:[]}
    });
    var costSchema = new Schema({
        name            : String,       //required
        amount          : Number,       //required
        description     : {type:String, default:""},
    });
    var attendeeSchema = new Schema({
        userId          : Schema.Types.ObjectId, //link to user database (default = nonexistent)
        name            : {type:String, default:""},
        email           : String,   //required
        attending       : {type:Number, default:0},
        note            : {type:String, default:""},
        //0 if invited (unknown reply), 1 if yes, 2 if no (internal only)
    });
    var eventSchema = new Schema({
        name            : String,       //required
        description     : {type:String, default:""},
        host            : Schema.Types.ObjectId,     //required, link to user database
        hostEmail       : String,       //required (in database)
        planners        : {type:[Schema.Types.ObjectId], default:[]},   //       ^

        date            : Date,         //required
        location        : {type:String, default:""},
        budget          : {type:Number, default:0},
        cost            : {type:[costSchema], default:[]},

        attendees       : {type:[attendeeSchema], default:[]},

        categories      : {type:[categorySchema], default:[]},
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
    var _createNewEvent = function(host_email, event_name, event_time, callback) {
        User.findByEmail(host_email, function(err, user) {
            if (err) {
                callback(err);
            } else {
                _model.create({
                    'name' : event_name,
                    'date' : event_time,
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
    //      (OR ANYTHING IN A LIST)
    var _addInformation = function(eventid, information, callback) {
        _model.findByIdAndUpdate(eventid, information, callback);
    };

    var _addPlanner = function(eventid, planner_email, callback) {
        Users.findByEmail(planner_email, function(err, user) {
            if (err) {
                callback(err);
            } else {
                _model.findByIdAndUpdate(eventid, {$push: {planners:user._id}}, callback);
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
        _model.findByIdAndUpdate(eventid, {$push:{cost: cost}}, callback);
    };

    var _addInvite = function(eventid, attendee_email, callback) {
        Users.findByEmail(attendee_email, function(err, user) {
            if (err) {//no such user, create attendee
                _model.findByIdAndUpdate(eventid,
                    {$push:{attendees:{'email': email}}}, callback);
            } else { //user exists, attach userid to attendee
                _model.findByIdAndUpdate(eventid,
                    {$push:{attendees:{'email': email, 'userId': user._id}}}, callback);
            }
        });
    };

    //note from attendee is optional
    var _markAttending = function(eventid, attendee_email, attendee_name, note_from_attendee, callback) {
        _model.update({'_id':eventid, 'attendees.email':attendee_email},
                      {$set: {'attendees.$.attending':1,
                              'attendees.$.name':attendee_name,
                              'attendees.$.note':note_from_attendee || ""}},
                       callback);
    };

    var _markNotAttending = function(eventid, attendee_email, note_from_attendee, callback) {
        _model.update({'_id':eventid, 'attendees.email':attendee_email},
                      {$set: {'attendees.$.attending':2,
                              'attendees.$.note':note_from_attendee || ""}},
                       callback);
    };

    return {
        findById            : _findById,
        createNewEvent      : _createNewEvent,
        clearAllEvents      : _clearAllEvents,
        getEventsByUser     : _getEventsByUser,
        deleteEvent         : _deleteEvent,
        addInformation      : _addInformation,
        addPlanner          : _addPlanner,
        addCost             : _addCost,
        addInvite           : _addInvite,
        markAttending       : _markAttending,
        markNotAttending    : _markNotAttending,
    };
})();
module.exports = Event;
