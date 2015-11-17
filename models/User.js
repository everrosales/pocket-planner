//Model code for a User object.
var User = (function User() {
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;
    var bcrypt = require('bcrypt-nodejs');

    var userSchema = new Schema({
        username    : String,
        password    : String,
        email       : String,
    }, {versionKey: false});

    var _model = mongoose.model('user', userSchema);

//PRIVATE METHODS

    var _ifUserExists = function(email, callback) {
        _model.count({'email':email}, function(err, count) {
            if (count == 1) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    };

    var _ifUserExists_username = function(username, callback) {
        _model.count({'username':username}, function(err, count) {
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
                _model.findOne({'email':email}, callback);
            } else {
                callback({msg: "No such user."});
            }
        });
    };

    var _getUser_username = function(username, callback) {
        _ifUserExists_username(username, function(err, exists) {
            if (exists) {
                _model.findOne({'username':username}, callback);
            } else {
                callback({msg: "No such user."});
            }
        });
    };

    var _usernameToEmail = function(username, callback) {
        _getUser_username(username, function(err, user) {
            if(err) {
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
        _getUser_username(username, callback);
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
                    if (_validPassword(user, candidatepw)) {
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

    var _createNewUser = function(email, password, username, callback) { //username optional
        _ifUserExists(email, function(err, exists) {
            if (exists) {
                callback({ taken: true});
            } else {
              password = _generateHash(password);
                _model.create({
                    'username' : username,
                    'email'    : email,
                    'password' : password,
                }, callback);
            }
        });
    };

    //TODO(erosales): Write tests for generateHash
    // Generate a hash of the password
    var _generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    // TODO(erosales): Write tests for validPassword
    // Validate my password
    var _validPassword = function(user, password) {
      return bcrypt.compareSync(password, user.password);
    }

    // for testing, because apparently mocha tests aren't automatically independent >.<
    var _clearAllUsers = function(callback) {
        _model.remove({}, callback);
    };

    return {
        findByEmail                     : _findByEmail,
        findByUsername                  : _findByUsername,
        verifyPasswordWithUsername      : _verifyPasswordWithUsername,
        verifyPassword                  : _verifyPassword,
        createNewUser                   : _createNewUser,
        clearAllUsers                   : _clearAllUsers,
        generateHash                    : _generateHash,
        validPassword                   : _validPassword,
    };
})();

module.exports = User;
