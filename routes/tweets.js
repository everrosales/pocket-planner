var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var User = require('../models/User');
var Tweet = require('../models/Tweet');

/*
    Require authentication on all access to /tweets/*
    clients who are not logged in will receive 403 error
*/
var requireAuthentication = function(req, res, next) {
    if (!req.currentUser) {
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        next();
    }
};

/*
    Grab a tweet from the store whenever one is referenced with an ID in the
    request path (any routes defined with :tweet as a parameter).
*/
router.param('tweet', function(req, res, next, tweetId) {
    Tweet.findById(tweetId, function(err, tweet) {
        if (tweet) {
            req.tweet = tweet;
            next();
        } else {
            utils.sendErrResponse(res, 404, 'Resource not found.');
        }
    });
});

// Register the middleware handlers above
router.all('*', requireAuthentication);

/*
  At this point, all requests are authenticated and checked:
  1. Clients must be logged into some account
  2. If accessing or modifying a specific resource, the client must own that tweet
  3. Requests are well-formed
*/

/*
    GET /tweets
    No request parameters
    Response:
     - success: true if the server succeeded in getting the user's tweets
     - content: on success, an object with a single field 'tweets' which contains
            user's tweets, all tweets, and tweets from users this user is
            subscribed to (three lists)
     - err: on failure, an error message
*/
router.get('/', function(req, res) {
    var response_data = {};
    User.getTweets(req.currentUser.username, function(err, my_tweets) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            my_tweets.forEach(function(tweet) {
                if (tweet.author === req.currentUser.username) {
                    tweet.is_mine = true;
                } else {
                    tweet.is_mine = false;
                }
            });
            response_data.my_tweets = my_tweets.reverse();
        }
        Tweet.getTweets(function(err, all_tweets) {
            if (err) {
                utils.sendErrResponse(res, 500, 'An unknown error occurred.');
            } else {
                all_tweets.forEach(function(tweet) {
                    if (tweet.author === req.currentUser.username) {
                        tweet.is_mine = true;
                    } else {
                        tweet.is_mine = false;
                    }
                });
                response_data.all_tweets = all_tweets.reverse();
            }
            User.getSubscribedTweets(req.currentUser.username, function(err, subscribed_tweets) {
                if (err) {
                    utils.sendErrResponse(res, 500, 'An unknown error occurred.');
                } else {
                    subscribed_tweets.forEach(function(tweet) {
                        if (tweet.author === req.currentUser.username) {
                            tweet.is_mine = true;
                        } else {
                            tweet.is_mine = false;
                        }
                    });
                    response_data.subscribed_tweets = subscribed_tweets.reverse();
                }
                User.getSubscribes(req.currentUser.username, function(err, my_subscribes) {
                    if (err) {
                        utils.sendErrResponse(res, 500, 'An unknown error occured.');
                    } else {
                        response_data.my_subscribes = my_subscribes.sort();
                    }
                    utils.sendSuccessResponse(res, response_data);
                });
            });
        });
    });
});

/*
    POST /tweets
    Request body:
     - content: the content of the tweet
    Response:
     - success: true if the server succeeded in recording the user's tweet
     - err: on failure, an error message
*/
router.post('/', function(req, res) {
    if (!req.body.content) {
        utils.sendErrResponse(res, 400, 'Content required in request.');
    }
    User.addTweet(req.currentUser.username, {
        content: req.body.content,
        tags: req.body.tags,
    }, function(err, tweet) {
        if (err) {
            console.log(err);
            utils.sendErrResponse(res, 500, 'An unknown error occured.');
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});

/*
    POST /tweets/:Tweet
    Request parameters:
     - tweet ID: the unique ID of the tweet we're going to retweet
     - username: the user who is retweeting the Tweet
    Response:
     - success: true if server succeeded in retweeting Tweet
     - err: on failure, an error message
*/
router.post('/:tweet', function(req, res) {
    Tweet.reTweet(
        req.currentUser.username,
        req.tweet._id,
        function(err, tweet) {
            if (err) {
                if (err.retweet_fail) {
                    utils.sendErrResponse(res, 500, 'Can\'t retweet own tweet');
                } else {
                    utils.sendErrResponse(res, 500, 'An unknown error occured.');
                }
            } else {
                utils.sendSuccessResponse(res);
            }
        }
    );
});

/*
    DELETE /tweets/:tweet
    Request parameters:
     - tweet ID: the unique ID of the tweet within the logged-in user's collection
    Response:
     - success: true if the server succeeded in deleting the user's tweet
     - err: on failure, an error message
*/
router.delete('/:tweet', function(req, res) {
    User.removeTweet(
        req.currentUser.username,
        req.tweet._id,
        function(err) {
            if (err) {
                utils.sendErrResponse(res, 500, 'An unknown error occured.');
            } else {
                utils.sendSuccessResponse(res);
            }
    });
});

module.exports = router;
