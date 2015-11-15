var assert = require("assert");

var User = require("../models/User");

var Tweet = require("../models/Tweet");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/fritter');

// Array is the module under test.
describe('Array', function() {
  // indexOf is the method under test.
  describe('#indexOf()', function () {

    // This is a test, we indicate what we're testing for.
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });


    // Another test.
    it('should find values that exist', function() {
      assert.equal(0, [1, 2, 3].indexOf(1));
      assert.equal(2, [1, 2, 3].indexOf(3));
    });

  }); // End describe indexOf.

  // map is the method under test.
  describe('#map', function() {

    // This is a test.
    it('should map values given a function', function() {
      assert.deepEqual([2, 4, 6], [1, 2, 3].map(function(x) { return 2 * x; }));
    });


    // Another test.
    it('should work on empty arrays', function() {
      assert.deepEqual([], [].map(function(x) { return 2 * x; }));
    });

  }); // End describe map.

}); // End describe Array.

describe('User', function() {
    beforeEach(function(done) {
        User.clearAllUsers(function() {
            Tweet.clearAllTweets(done);
        });
    });

    afterEach(function(done) {
        User.clearAllUsers(function() {
            Tweet.clearAllTweets(done);
        });
    });

    describe('#createNewUser', function() {
        it('should return a null error if user created successfully', function(done) {
            User.createNewUser('erosolar', 'blah', function(error, result) {
                assert.deepEqual(error, null);
                done();
            });
        });
        it('should return a "taken" error if username already exists', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.createNewUser('erosolar', 'blah2', function(error, result) {
                    assert.deepEqual(error.taken, true);
                    done();
                });
            });
        });
    });

    describe('#findByUsername', function() {
        it('should return the user if user exists', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.findByUsername('erosolar', function(error, result) {
                    assert.deepEqual(error, null);
                    assert.deepEqual(result.username, 'erosolar');
                    assert.deepEqual(result.password, 'blah');
                    done();
                });
            });
        });
        it('should return a no user error if no user exists', function(done) {
            User.findByUsername('erosolar', function(error, result) {
                assert.deepEqual(error.msg, "No such user!");
                done();
            });
        });
    });

    describe('#addTweet', function() {
        it('should throw an error if no user exists', function(done) {
            User.addTweet('invalidUsername', {content:"hi"}, function(error, result) {
                assert.deepEqual(error.msg, "Invalid user.");
                done();
            });
        });
        it('should not throw an error if tweet created successfully', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.addTweet('erosolar', {content:"hi"}, function(error, result) {
                    assert.deepEqual(error, null);
                    done();
                });
            });
        });
    });

    describe('#getTweet', function() {
        it('should return a tweet if tweet exists', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.addTweet('erosolar', {content : "hi"}, function(err, id) {
                    User.getTweet('erosolar', id, function(error, result) {
                        assert.deepEqual(error, null);
                        assert.deepEqual(result.content, "hi");
                        assert.deepEqual(result._id, id);
                        done();
                    });
                });
            });
        });
        it('should return a no such tweet error if no tweet exists', function(done) {
            User.createNewUser('erosolar', 'blah', function(err, id) {
                User.getTweet('erosolar', id, function(error, result) {
                    assert.deepEqual(error.msg, "Invalid tweet.");
                    done();
                });
            });
        });
        it('should return a no such user error if no user exists', function(done) {
            User.getTweet('erosolar', 0, function(error, result) {
                assert.deepEqual(error.msg, "Invalid user.");
                done();
            });
        });
    });

    describe('#getTweets', function() {
        it('should return empty array if no tweets', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.getTweets('erosolar', function(error, result) {
                    assert.deepEqual(error, null);
                    assert.deepEqual(result, []);
                    done();
                });
            });
        });
        it('should return no user error if no user exists', function(done) {
            User.getTweets('erosolar', function(error, result) {
                assert.deepEqual(error.msg, 'Invalid user.');
                done();
            });
        });
        it('should return a list of tweets if there are tweets', function(done) {
            sample_tweet = { content : "hi" };
            User.createNewUser('erosolar', 'blah', function() {
                User.addTweet('erosolar', sample_tweet, function(err, id) {
                    sample_tweet._id = id;
                    sample_tweet.author = 'erosolar';
                    sample_tweet.old_author = "";
                    sample_tweet.tags = [];
                    User.getTweets('erosolar', function(error, result) {
                        assert.deepEqual(error, null);
                        assert.deepEqual(result.length, 1);
                        assert.deepEqual(result[0], sample_tweet);
                        done();
                    });
                });
            });
        });
    });

    describe('#removeTweet', function() {
        it('should return invalid user error if no user exists', function(done) {
            User.removeTweet('erosolar', 0, function(error, result) {
                assert.deepEqual(error.msg, 'Invalid user.');
                done();
            });
        });
        it('should return invalid tweet error if no tweet exists', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.removeTweet('erosolar', 0, function(error, result) {
                    assert.deepEqual(error.msg, 'Invalid tweet.');
                    done();
                });
            });
        });
        it('should return nothing if tweet removed successfully', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.addTweet('erosolar', {content:"hi"}, function(err, id) {
                    User.removeTweet('erosolar', id, function(error, result) {
                        assert.deepEqual(error, null);
                        done();
                    });
                });
            });
        });
        it('should affect future getTweet calls', function(done) {
            User.createNewUser('erosolar', 'blah', function() {
                User.addTweet('erosolar', {content:"hi"}, function(err, id) {
                    User.removeTweet('erosolar', id, function() {
                        User.getTweet('erosolar', id, function(error, result) {
                            assert.deepEqual(error.msg, 'Invalid tweet.');
                            done();
                        });
                    });
                });
            });
        });
    });
});

describe('Tweet', function() {
    beforeEach(function(done) {
        Tweet.clearAllTweets(done);
    });
    afterEach(function(done) {
        Tweet.clearAllTweets(done);
    });

    describe('#createNewTweet', function() {
        it('should return null error when tweet created', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi', tags:["tag1"]}, function(err, result) {
                // console.log(err);
                // assert.deepEqual(err, undefined);
                done();
            });
        });
    });

    describe('#findById', function() {
        it('should return a tweet if tweet exists', function(done) {
            Tweet.createNewTweet('erosolar', {content:"hi", tags:["tag1"]}, function(err, id) {
                Tweet.findById(id, function(err, result) {
                    assert.deepEqual(err, null);
                    assert.deepEqual(result.author, 'erosolar');
                    assert.deepEqual(result.content, 'hi');
                    assert.deepEqual(result.tags.toObject(), ["tag1"]);
                    done();
                });
            });
        });
        it('should return an error if no tweet exists', function(done) {
            Tweet.findById(0, function(err, result) {
                assert.deepEqual(err.msg, "No such tweet.");
                done();
            });
        });
    });

    describe('#reTweet', function() {
        it('should return error if no such tweet exists', function(done) {
            Tweet.reTweet('erosolar', 0, function(err, result) {
                assert.deepEqual(err.msg, "Invalid tweet.");
                done();
            });
        });
        it('should return error if same user', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi', tags:["tag1"]}, function(err, id) {
                Tweet.reTweet('erosolar', id, function(err, result) {
                    assert.deepEqual(err.msg, "You can't retweet your own tweet!");
                    assert.deepEqual(err.retweet_fail, true);
                    done();
                });
            });
        });
        it('should return error if same original author', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi', tags:['tag1']}, function(err, id) {
                Tweet.reTweet('bob', id, function(err, id) {
                    Tweet.reTweet('erosolar', id, function(err, result) {
                        assert.deepEqual(err.msg, "You can't retweet your own tweet!");
                        assert.deepEqual(err.retweet_fail, true);
                        done();
                    });
                });
            });
        });

        it('should return id of new tweet if tweet retweeted successfully', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi', tags:["tag1"]}, function(err, id) {
                Tweet.reTweet('brad', id, function(err, new_id) {
                    assert.deepEqual(err, null);
                    assert.deepEqual(new_id, id+1);
                    done();
                });
            });
        });
        it('should correctly store old author in tweet', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi', tags:["tag1"]}, function(err, id) {
                Tweet.reTweet('brad', id, function(err, id) {
                    Tweet.findById(id, function(err, result) {
                        assert.deepEqual(err, null);
                        assert.deepEqual(result.author, 'brad');
                        assert.deepEqual(result.old_author, 'erosolar');
                        assert.deepEqual(result.content, 'hi');
                        assert.deepEqual(result.tags.toObject(), ["tag1"]);
                        done();
                    });
                });
            });
        });
    });

    describe('#getTweets', function() {
        it('should return no tweets if no tweets exist', function(done) {
            Tweet.getTweets(function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, []);
                done();
            });
        });
        it('should return all tweets', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi', tags:['tag1']}, function(){
                Tweet.createNewTweet('bob', {content:'yo', tags:['tag2']}, function(){
                    Tweet.getTweets(function(err, result) {
                        assert.deepEqual(err, null);
                        assert.deepEqual(result[0].author, 'erosolar');
                        assert.deepEqual(result[0].content, 'hi');
                        assert.deepEqual(result[0].tags, ['tag1']);
                        assert.deepEqual(result[1].author, 'bob');
                        assert.deepEqual(result[1].content, 'yo');
                        assert.deepEqual(result[1].tags, ['tag2']);
                        done();
                    });
                });
            });
        });
    });

    describe('#getTweetsByUser', function() {
        it('should return no tweets if no tweets by author exist', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi',tags:['tag1']}, function(err, id){
                Tweet.getTweetsByUser('bob', function(err, result) {
                    assert.deepEqual(err, null);
                    assert.deepEqual(result, []);
                    done();
                });
            });
        });
        it('should return tweets with matching author', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi',tags:['tag1']}, function(err, id){
                Tweet.getTweetsByUser('erosolar', function(err, result) {
                    assert.deepEqual(err, null);
                    assert.deepEqual(result.length, 1);
                    assert.deepEqual(result[0], {content:'hi', tags:['tag1'], old_author:"", author:'erosolar', _id:id});
                    done();
                });
            });
        });
    });

    describe('#getTweetsByTag', function() {
        it('should return no tweets if no tweets with that tag exist', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi',tags:['tag1']}, function(){
                Tweet.getTweetsByTag('tag2', function(err, result) {
                    assert.deepEqual(err, null);
                    assert.deepEqual(result, []);
                    done();
                });
            });
        });
        it('should return all tweets with the tag that exist', function(done) {
            Tweet.createNewTweet('erosolar', {content:'hi',tags:['tag1']}, function(err, id){
                Tweet.createNewTweet('erosolar', {content:'hi',tags:['tag2']}, function(err, new_id){
                    Tweet.getTweetsByTag('tag1', function(err, result) {
                        assert.deepEqual(err, null);
                        assert.deepEqual(result.length, 1);
                        assert.deepEqual(result[0], {content:'hi', tags:['tag1'], old_author:"", author:'erosolar', _id:id});
                        done();
                    });
                });
            });
        });
    });

    describe('#deleteTweet', function() {
        it('should return error if user not author of tweet', function(done) {
            Tweet.createNewTweet('erosolar', {content:"hi"}, function(err, id) {
                Tweet.deleteTweet('bob', id, function(err, result) {
                    assert.deepEqual(err.msg, "You are not the author of this tweet.");
                    done();
                });
            });
        });
        it('should return invalid tweet error if no tweet exists', function(done) {
            Tweet.deleteTweet('erosolar', 0, function(error, result) {
                assert.deepEqual(error.msg, 'Invalid tweet.');
                done();
            });
        });
        it('should return nothing if tweet removed successfully', function(done) {
            Tweet.createNewTweet('erosolar', {content:"hi"}, function(err, id) {
                Tweet.deleteTweet('erosolar', id, function(error, result) {
                    assert.deepEqual(error, null);
                    done();
                });
            });
        });
        it('should affect future getTweet calls', function(done) {
            Tweet.createNewTweet('erosolar', {content:"hi"}, function(err, id) {
                Tweet.deleteTweet('erosolar', id, function() {
                    Tweet.findById(id, function(error, result) {
                        assert.deepEqual(error.msg, 'No such tweet.');
                        done();
                    });
                });
            });
        });
    });
});
