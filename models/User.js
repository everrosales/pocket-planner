var Tweet = require("../models/Tweet");

// Model code for a User object. Each User stores a username and a password, as
// well as a list of other users this user is subscribed to.
var User = (function User() {
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;

    var userSchema = new Schema({
        _id        : String, //stores username. using _id allows us to use findById (a nice feature).
        username   : String, //copy of username here, to maintain backwards functionality.
        password   : String,
        subscribes : [String]
    }, {versionKey: false});
    var _model = mongoose.model('user', userSchema);

    var _ifUserExists = function(username, callback) {
        _model.count({username:username}, function(err, count) {
            if (count == 1) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    };

    var _getUser = function(username, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                _model.findById(username, callback);
            } else {
                callback({msg: "No such user!"});
            }
        });
    };

    var _findByUsername = function(username, callback) {
        _getUser(username, callback);
    };

    var _verifyPassword = function(username, candidatepw, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                _getUser(username, function(err, user) {
                    if (user.password === candidatepw) {
                        callback(null, true);
                    } else {
                        callback(null, false);
                    }
                });
            } else {
                callback({msg: "No such user!"});
            }
        });
    };

    var _createNewUser = function(username, password, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                callback({ taken: true});
            } else {
                _model.create({
                    '_id' : username,
                    'username' : username,
                    'password' : password,
                    'subscribes' : []
                }, callback);
            }
        });
    };

    var _addSubscribe = function(subscriber, subscribee, callback) {
        _ifUserExists(subscribee, function(err, exists) {
            if (exists) {
                _model.findByIdAndUpdate(subscriber,
                    {$push: {subscribes: subscribee}},
                    {safe: true, upsert: true}, callback);
            } else {
                callback({msg: "invalid subscribee user."});
            }
        });
    };

    var _removeSubscribe = function(subscriber, subscribee, callback) {
        _ifUserExists(subscribee, function(err, exists) {
            if (exists) {
                _model.findByIdAndUpdate(subscriber,
                    {$pull: {subscribes: subscribee}}, callback);
            } else {
                callback({msg: "invalid subscribee user."});
            }
        });
    };

    var _getSubscribes = function(username, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                _getUser(username, function(err, user) {
                    callback(null, user.subscribes);
                });
            } else {
                callback({msg: "Invalid user."});
            }
        });
    };

    // for testing, because apparently mocha tests aren't automatically independent >.<
    var _clearAllUsers = function(callback) {
        _model.remove({}, callback);
    };

    var _getTweet = function(username, tweetId, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                Tweet.findById(tweetId, function(err, tweet) {
                    if (err === null && tweet.author === username) {
                        callback(null, tweet);
                    } else {
                        callback({ msg: 'Invalid tweet.'});
                    }
                });
            } else {
                callback({msg: 'Invalid user.'});
            }
        });
    };

    var _getTweets = function(username, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                Tweet.getTweetsByUser(username, callback);
            } else {
                callback({msg: 'Invalid user.'});
            }
        });
    };

    var _getSubscribedTweets = function(username, callback) {
        _ifUserExists(username, function(err, exists) {
            if(exists) {
                _getUser(username, function(err, user){
                    var subscribes = user.subscribes;
                    Tweet.getSubscribedTweets(subscribes, callback);
                });
            } else {
                callback({msg: "Invalid user."});
            }
        });
    };

    var _addTweet = function(username, tweet, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                Tweet.createNewTweet(username, tweet, callback);
            } else {
                callback({msg: "Invalid user."});
            }
        });
    };

    var _removeTweet = function(username, tweetId, callback) {
        _ifUserExists(username, function(err, exists) {
            if (exists) {
                Tweet.deleteTweet(username, tweetId, callback);
            } else {
                callback({msg: "Invalid user."});
            }
        });
    };

    return {
        findByUsername : _findByUsername,
        verifyPassword : _verifyPassword,
        createNewUser : _createNewUser,
        addSubscribe : _addSubscribe,
        removeSubscribe: _removeSubscribe,
        getSubscribes : _getSubscribes,
        clearAllUsers : _clearAllUsers,
        getTweet : _getTweet,
        getTweets : _getTweets,
        getSubscribedTweets : _getSubscribedTweets,
        addTweet : _addTweet,
        removeTweet : _removeTweet,
    };

})();

module.exports = User;
