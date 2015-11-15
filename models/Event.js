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
        userId          : ObjectId, //link to user database
        name            : String,   //required
        email           : String,   //required
        attending       : {type:Number, default:0}
        //0 if invited (unknown reply), 1 if yes, 2 if no (internal only)
    });
    var eventSchema = new Schema({
        name            : String,       //required
        description     : {type:String, default:""},
        host            : ObjectId,     //required, link to user database
        hostEmail       : String,       //required (in database)
        otherPlanners   : {type:[ObjectId], default:[]},   //       ^

        date            : Date,         //required
        location        : {type:String, default:""},
        budget          : {type:Number, default:0},
        cost            : {type:[costSchema], default:[]},

        attendees       : {type:[String], default:[]},

        categories      : {type:[categorySchema], default:[]},
    });

    var _model = mongoose.model('event', eventSchema);

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
                }, function(err, result) {
                    callback(err, result._id);
                });
            }
        });
    };

    var _clearAllEvents = function(callback) {
        _model.remove({}, callback);
    };

    var _getEventsByUser = function(userid, callback) {
        _model.find({});
    };

    var _deleteEvent = function(eventid, callback) {
        //blah
    };

    // information is an object with keys in the schemas above
    var _addInformation = function(information, callback) {
        //blah
    };

    var _addInvite = function(attendee_email, callback) {
        //blah
    };

    var _markAttending = function(attendee, callback) {
        //blah
    };

    var _markNotAttending = function(attendee, callback) {
        //blah
    };

    return {
        ifEventExists       : _ifEventExists,
        getEvent            : _getEvent,
        findById            : _findById,
        createNewEvent      : _createNewEvent,
        clearAllEvents      : _clearAllEvents,
        getEventsByUser     : _getEventsByUser,
        deleteEvent         : _deleteEvent,
        addInformation      : _addInformation,
    };
})();
module.exports = Event;
