//Model code for a User object.
var User = (function User() {
  var mongoose = require('mongoose');
  var Schema = require('mongoose').Schema;
  var bcrypt = require('bcrypt-nodejs');

  // Schema for a user (someone who plans events with our app)
  var userSchema = new Schema({
    username  : String, //optional
    password  : {type:String, required:true},
    email     : {type:String, required:true},
  }, {versionKey: false});

  var _model = mongoose.model('user', userSchema);

//PRIVATE METHODS

// returns true/false: user with given email exists/doesn't exist
  var _ifUserExists = function(email, callback) {
    _model.count({'email':email}, function(err, count) {
      if (count == 1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  };

  // returns true/false: user with given username exists/doesn't exist
  var _ifUserExists_username = function(username, callback) {
    _model.count({'username':username}, function(err, count) {
      if (count == 1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  };

  // returns user with given email, if exists, or error if doesn't exist
  var _getUser = function(email, callback) {
    _ifUserExists(email, function(err, exists) {
      if (exists) {
        _model.findOne({'email':email}, callback);
      } else {
        callback({msg: "No such user."});
      }
    });
  };

  // returns user with given username, if exists, or error if doesn't exist
  var _getUser_username = function(username, callback) {
    _ifUserExists_username(username, function(err, exists) {
      if (exists) {
        _model.findOne({'username':username}, callback);
      } else {
        callback({msg: "No such user."});
      }
    });
  };

  // given the username of a user, fetches their email
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

  /** Finds a user, given their email
   *    Arguments:
   *      email: email of user to find
   *      callback: function to pass the found user to
   *    Returns:
   *      found user, or 'no such user' error if user doesn't exist
   */
  var _findByEmail = function(email, callback) {
    _getUser(email, callback);
  };

  /** Finds a user, given their username
   *    Arguments:
   *      username: username of user to find
   *      callback: function to pass the found user to
   *    Returns:
   *      found user, or 'no such user' error if user doesn't exist
   */
  var _findByUsername = function(username, callback) {
    //assuming usernames are unique
    _getUser_username(username, callback);
  };

  /** Verifies that a password for a given user is correct
   *    Arguments:
   *      username: username of user to verify password for
   *      candidatepw: password to verify
   *      callback: function to call after verification
   *    Returns:
   *      true if password is correct, false if password is incorrect;
   *      'no such user' error if user doesn't exist
   */
  var _verifyPasswordWithUsername = function(username, candidatepw, callback) {
    _usernameToEmail(username, function(err, email) {
      if (err) {
        callback({msg: "No such user."});
      } else {
        _verifyPassword(email, candidatepw, callback);
      }
    });
  };

  /** Verifies that a password for a given user is correct
   *    Arguments:
   *      email: email of user to verify password for
   *      candidatepw: password to verify
   *      callback: function to call after verification
   *    Returns:
   *      true if password is correct, false if password is incorrect;
   *      'no such user' error if user doesn't exist
   */
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

  /** Creates a new user in the database
   *    Arguments:
   *      email: email of new user
   *      password: password of new user
   *      username: username of new user ("" if none provided)
   *      callback: function to call after verification
   *    Returns:
   *      undefined
   */
  var _createNewUser = function(email, password, username, callback) { //username optional
    _ifUserExists(email, function(err, exists) {
      if (exists) {
        callback({ taken: true});
      } else {
        password = _generateHash(password);
        _model.create({
          'username' : username,
          'email'  : email,
          'password' : password,
        }, callback);
      }
    });
  };

  //TODO(erosales): Write tests for generateHash
  // Generate a hash of the password
  var _generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // TODO(erosales): Write tests for validPassword
  // Validate my password
  var _validPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
  };

  /** Removes all users from the database. Used for testing purposes.
   *  Arguments:
   *    callback: a function to call once the database is cleared
   *  Returns:
   *    undefined
   */
  var _clearAllUsers = function(callback) {
    _model.remove({}, callback);
  };

  return {
    findByEmail           	 			: _findByEmail,
    findByUsername          			: _findByUsername,
    verifyPasswordWithUsername    : _verifyPasswordWithUsername,
    verifyPassword          			: _verifyPassword,
    createNewUser           			: _createNewUser,
    clearAllUsers           			: _clearAllUsers,
    generateHash          				: _generateHash,
    validPassword           			: _validPassword,
  };
})();

module.exports = User;
