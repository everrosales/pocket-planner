//Model code for Event object

var Event = (function Event() {
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;

    var todoSchema = new Schema({
        name            : String,
        deadline        : Date,
        priority        : Number
    });

    var categorySchema = new Schema({
        name            : String,
        todos           : [todoSchema],
    });

    var costSchema = new Schema({
        name            : String,
        amount          : Number,
        description     : String,
    });

    var eventSchema = new Schema({
        name            : String,
        description     : String,
        host            : ObjectId,     //link to user database
        otherPlanners   : [ObjectId],   // ^

        date            : Date,
        location        : String,
        budget          : String,
        cost            : [costSchema],

        attendees       : [String],

        categories      : [categorySchema],
    });
});








// Model code for a Tweet object. Each Tweet stores its author's username,
// some content, some tags, and a unique ID number.
var Tweet = (function Tweet() {
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;

    var tweetSchema = new Schema({
        _id        : Number,
        content    : String,
        author     : String,
        old_author : String,
        tags       : [String]
    }, { versionKey: false});
    var _model = mongoose.model('tweet', tweetSchema);
    var _ifTweetExists = function(id, callback) {
        _model.count({_id : id}, function(err, count) {
            if (count == 1) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    };

    var _getTweet = function(id, callback) {
        _ifTweetExists(id, function(err, exists) {
            if (exists) {
                _model.findById(id, callback);
            } else {
                callback({msg: "No such tweet."});
            }
        });
    };

    var _findById = function(id, callback) {
        _getTweet(id, callback);
    };

    /*
        tweet is an object {content: "blah", tags: 'blah'}
    */
    var _createNewTweet = function(username, tweet, callback, old_author) {
        _model.findOne( {}, { _id: 1 } ).sort( { _id: -1 } ).exec(function(err, ref_tweet) {
            var id;
            if (ref_tweet) {
                id = ref_tweet._id + 1;
            } else {
                id = 0;
            }

            _model.create({
                'author' : username,
                'old_author' : old_author || "",
                'content' : tweet.content,
                'tags' : tweet.tags || [],
                '_id' : id}, function(err, result) {
                    callback(err, (id));
                }
            );
        });
    };

    var _reTweet = function(username, tweetId, callback) {
        _ifTweetExists(tweetId, function(err, exists) {
            if (exists) {
                _getTweet(tweetId, function(err, tweet) {
                    if (tweet.author !== username && tweet.old_author !== username) {
                        if(tweet.old_author) {
                            _createNewTweet(
                                username,
                                { content: tweet.content, tags: tweet.tags },
                                callback,
                                tweet.old_author);
                        } else {
                            _createNewTweet(
                                username,
                                { content: tweet.content, tags: tweet.tags },
                                callback,
                                tweet.author);
                        }
                    } else {
                        callback({msg: "You can't retweet your own tweet!", retweet_fail : true});
                    }
                });
            } else {
                callback({msg: "Invalid tweet."});
            }
        });
    };

    // for testing, because apparently mocha tests aren't automatically independent >.<
    var _clearAllTweets = function(callback) {
        _model.remove({}, callback);
    };

    var _getTweets = function(callback) {
        _model.find({}).lean().exec(callback);
    };

    var _getTweetsByUser = function(username, callback) {
        _model.find({ author : username }).lean().exec(callback);
    };

    var _getTweetsByTag = function(tag, callback) {
        _model.find({ tags : tag }).lean().exec(callback);
    };

    var _getSubscribedTweets = function(subscribees, callback) {
        _model.find({author: {$in: subscribees}}).lean().exec(callback);
    };

    var _deleteTweet = function(username, tweetId, callback) {
        _ifTweetExists(tweetId, function(err, exists) {
            if (exists) {
                _getTweet(tweetId, function(err, tweet) {
                    if (tweet.author == username) {
                        _model.remove({_id:tweetId}, callback);
                    } else {
                        callback({ msg : "You are not the author of this tweet."});
                    }
                });
            } else {
                callback({msg : 'Invalid tweet.'});
            }
        });
    };

    return {
        findById : _findById,
        createNewTweet : _createNewTweet,
        reTweet : _reTweet,
        clearAllTweets : _clearAllTweets,
        getTweets : _getTweets,
        getTweetsByUser : _getTweetsByUser,
        getTweetsByTag : _getTweetsByTag,
        getSubscribedTweets : _getSubscribedTweets,
        deleteTweet : _deleteTweet,
    };
})();

module.exports = Tweet;
