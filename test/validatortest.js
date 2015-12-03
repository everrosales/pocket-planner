var assert = require("assert");
var User = require("../models/User");
var Event = require("../models/Event");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/pocketplanner');

describe('User', function() {
  before(function(done) {
    User.clearAllUsers(done);
  });
  after(function(done) {
    User.clearAllUsers(done);
  });

  it('email', function(done) {
    User.createNewUser('notemail', 'oyoyoy', '', function(err, user) {
      assert.strictEqual(err.message, 'notemail is not an email address.');
      done();
    });
  });
});

describe('Event', function() {
  before(function(done) {
    Event.clearAllEvents(function() {
      User.clearAllUsers(done);
    });
  });
  after(function(done) {
    Event.clearAllEvents(function() {
      User.clearAllUsers(done);
    });
  });

  var eventid;

  it('hostEmail (impossible)', function(done) {
    User.createNewUser('erosolar@mit.edu', 'blah', '', function(err, user) {
      Event.createNewEvent('notemail', 'thing', new Date(2016,0,1,0,0,0), new Date(2016,0,1,0,0,0), function(err, event) {
        assert.strictEqual(err.msg, 'No such user.');
        done();
      });
    });
  });
  it('attendee.email (addInvite)', function(done) {
    Event.createNewEvent('erosolar@mit.edu', 'thing', new Date(2016,0,1,0,0,0), new Date(2016,0,1,0,0,0), function(err, event) {
      eventid = event._id;
      Event.addInvite(eventid, 'notemail', function(err) {
        assert.strictEqual(err.msg, 'notemail is not an email address.');
        done();
      });
    });
  });
  it('attendee.email (markAttending)', function(done) {
    Event.markAttending(eventid, 'mit.edu', 'what', 'blahhhhhhh', function(err) {
      assert.strictEqual(err.msg, 'mit.edu is not an email address.');
      done();
    });
  });
});
