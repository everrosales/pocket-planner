var Event = require("../models/Event");

//Model code for a User object.
var User = (function User() {
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;

    var userSchema = new Schema({
        _id         : String, //same as email of user
        username    : String,
        password    : String,
        email       : String,
    }, {versionKey: false});

    var _model = mongoose.model('user', userSchema);

//PRIVATE METHODS

    var _ifUserExists = function(username, callback) {
        _model.count({username:username}, function(err, count) {
            if (count == 1) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    };

    var _getUser = function(email, callback) {
        _ifUserExists(email, function(err, exists) {
            if (exists) {
                _model.findById(username, callback);
            } else {
                callback({msg: "No such user."});
            }
        });
    };

    var _usernameToEmail = function(username, callback) {
        _model.findOne({username:username}, function(err, user) {
            if (err) {
                callback(err);
            } else {
                callback(err, user.email);
            }
        });
    };

//PUBLIC METHODS

    var _findByEmail = function(email, callback) {
        _getUser(email, callback);
    };

    var _findByUsername = function(username, callback) {
        //assuming usernames are unique
        _model.findOne({username:username}, callback);
    };

    var _verifyPasswordWithUsername = function(username, candidatepw, callback) {
        _usernameToEmail(username, function(err, email) {
            if (err) {
                callback({msg: "No such user."});
            } else {
                _verifyPassword(email, candidatepw, callback);
            }
        });
    };

    var _verifyPassword = function(email, candidatepw, callback) {
        _ifUserExists(email, function(err, exists) {
            if(exists) {
                _getUser(email, function(err, user) {
                    if (user.password === candidatepw) {
                        callback(null, true);
                    } else {
                        callback(null, false);
                    }
                });
            } else {
                callback({msg: "No such user."});
            }
        });
    };

    var _createNewUser = function(username, email, password, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                callback({ taken: true});
            } else {
                _model.create({
                    '_id' : username,
                    'username' : username,
                    'email'    : email,
                    'password' : password,
                }, callback);
            }
        });
    };

    // for testing, because apparently mocha tests aren't automatically independent >.<
    var _clearAllUsers = function(callback) {
        _model.remove({}, callback);
    };

    var _getEvents = function(username, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                Event.getEventsByUser(username, callback);
            } else {
                callback({msg: 'Invalid user.'});
            }
        });
    };

    var _addEvent = function(username, new_event, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                Event.createNewEvent(username, new_event, callback);
            } else {
                callback({msg: "Invalid user."});
            }
        });
    };

    var _removeEvent = function(username, eventId, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                Event.deleteEvent(username, tweetId, callback);
            } else {
                callback({msg: "Invalid user."});
            }
        });
    };

    return {
        findByEmail                     : _findByEmail,
        findByUsername                  : _findByUsername,
        verifyPasswordWithUsername      : _verifyPasswordWithUsername,
        verifyPassword                  : _verifyPassword,
        createNewUser                   : _createNewUser,
        clearAllUsers                   : _clearAllUsers,
        getEvents                       : _getEvents,
        addEvent                        : _addEvent,
        removeEvent                     : _removeEvent,
    };

})();

module.exports = User;
