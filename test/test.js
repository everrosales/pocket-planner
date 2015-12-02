var assert = require("assert");

var User = require("../models/User");

var Event = require("../models/Event");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/pocketplanner');

describe('User', function() {
  beforeEach(function(done) {
    User.clearAllUsers(function() {
      Event.clearAllEvents(done);
    });
  });
  afterEach(function(done) {
    User.clearAllUsers(function() {
      Event.clearAllEvents(done);
    });
  });

  describe('#createNewUser', function() {
    it('should return a null error if user created successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', "", function(error, result) {
        assert.deepEqual(error, null);
        done();
      });
    });
    it('should return created user', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function(error, result) {
        assert.deepEqual(result.email, 'erosolar@mit.edu');
        assert.ok(User.validPassword(result, 'blah'));
        assert.deepEqual(result.username, 'erosolar');
        done();
      });
    });
    it('should return a "taken" error if email already exists', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', "", function() {
        User.createNewUser('erosolar@mit.edu', 'blah2', "", function(error, result) {
          assert.deepEqual(error.taken, true);
          done();
        });
      });
    });
  });

  describe('#findByEmail', function() {
    it('should return the user if user exists', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', "", function() {
        User.findByEmail('erosolar@mit.edu', function(error, result) {
          assert.deepEqual(error, null);
          assert.deepEqual(result.email, 'erosolar@mit.edu');
          assert.ok(User.validPassword(result, 'blah'));
          done();
        });
      });
    });
    it('should return a no user error if no user exists', function(done) {
      User.findByEmail('erosolar@mit.edu', function(error, result) {
        assert.deepEqual(error.msg, "No such user.");
        done();
      });
    });
  });

  describe('#findByUsername', function() {
    it('should return the user if user exists', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', "erosolar", function() {
        User.findByUsername('erosolar', function(error, result) {
          assert.deepEqual(error, null);
          assert.deepEqual(result.username, 'erosolar');
          assert.deepEqual(result.email, 'erosolar@mit.edu');
          assert.ok(User.validPassword(result, 'blah'));
          done();
        });
      });
    });
    it('should return a no user error if no user exists', function(done) {
      User.findByUsername('erosolar', function(error, result) {
        assert.deepEqual(error.msg, "No such user.");
        done();
      });
    });
  });

  describe('#verifyPassword', function() {
    it('should return true if the given password is valid', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.verifyPassword('erosolar@mit.edu', 'blah', function(err, result) {
          assert.deepEqual(err, undefined);
          assert.deepEqual(result, true);
          done();
        });
      });
    });
    it('should return false if the given password does not match', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.verifyPassword('erosolar@mit.edu', 'incorrect', function(err, result) {
          assert.deepEqual(err, undefined);
          assert.deepEqual(result, false);
          done();
        });
      });
    });
    it('should return a no user error if the user does not exist', function(done) {
      User.verifyPassword('erosolar@mit.edu', 'blah', function(err, result) {
        assert.deepEqual(err.msg, "No such user.");
        done();
      });
    });
  });

  describe('#verifyPasswordWithUsername', function() {
    it('should return true if the given password matches', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.verifyPasswordWithUsername('erosolar', 'blah', function(err, result) {
          assert.deepEqual(err, undefined);
          assert.deepEqual(result, true);
          done();
        });
      });
    });
    it('should return false if the given password does not match', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.verifyPasswordWithUsername('erosolar', 'incorrect', function(err, result) {
          assert.deepEqual(err, undefined);
          assert.deepEqual(result, false);
          done();
        });
      });
    });
    it('should return a no user error if the user does not exist', function(done) {
      User.verifyPasswordWithUsername('erosolar', 'blah', function(err, result) {
        assert.deepEqual(err.msg, "No such user.");
        done();
      });
    });
  });
});

describe('Event', function() {
  beforeEach(function(done) {
    Event.clearAllEvents(function() {
      User.clearAllUsers(done);
    });
  });
  afterEach(function(done) {
    Event.clearAllEvents(function() {
      User.clearAllUsers(done);
    });
  });

  describe('#createNewEvent', function() {
    it('should return error if user does not exist', function(done) {
      Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err) {
        assert.deepEqual(err.msg, "No such user.");
        done();
      });
    });

    it('should return null error when event created', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function(err, user) {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, result) {
          assert.deepEqual(err, undefined);
          done();
        });
      });
    });
  });

  describe('#findById', function() {
    it('should return an Event if event exists', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function(err, result) {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, newevent) {
          Event.findById(newevent._id, function(err, result) {
            assert.deepEqual(err, null);
            assert.deepEqual(result.hostEmail, 'erosolar@mit.edu');
            assert.deepEqual(result.name, 'blah');
            assert.deepEqual(result.end, new Date(1995, 7, 7, 10, 39, 0));
            assert.deepEqual(result.start, new Date(1995, 7, 6, 10, 39, 0));
            done();
          });
        });
      });
    });
    it('should return an error if no Event exists', function(done) {
      Event.findById(0 /*hopefully no event with id 0 */, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
  });

  describe('#getEventsByUser', function() {
    it('should return no events if no events for user exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', "", function(err, created_user) {
        Event.getEventsByUser('erosolar@mit.edu', function(err, result) {
          assert.deepEqual(err, null);
          assert.deepEqual(result, []);
          done();
        });
      });
    });
    it('should return an error if no such user', function(done) {
      Event.getEventsByUser('erosolar@mit.edu', function(err, result) {
        assert.deepEqual(err.msg, "No such user.");
        done();
      });
    });
    it('should return events user is allowed to edit', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', "", function(uh, created_user) {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function() {
          Event.getEventsByUser('erosolar@mit.edu', function(err, result) {
            assert.deepEqual(err, undefined);
            assert.deepEqual(result.length, 1);
            assert.deepEqual(result[0].host, created_user._id);
            assert.deepEqual(result[0].hostEmail, 'erosolar@mit.edu');
            assert.deepEqual(result[0].name, 'blah');
            assert.deepEqual(result[0].end, new Date(1995, 7, 7, 10, 39, 0));
            assert.deepEqual(result[0].start, new Date(1995, 7, 6, 10, 39, 0));
            done();
          });
        });
      });
    });
    it('should return both user-owned events and user-planned events', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', "", function(uh, created_user) {
        User.createNewUser('erosales@mit.edu', 'blah2', "", function(uh, created_user2) {
          Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, new_event) {
            Event.addPlanner(new_event._id, 'erosales@mit.edu', function() {
              Event.getEventsByUser('erosolar@mit.edu', function(err, result) {
                assert.deepEqual(err, undefined);
                assert.deepEqual(result.length, 1);
                Event.getEventsByUser('erosales@mit.edu', function(err, result) {
                  assert.deepEqual(err, undefined);
                  assert.deepEqual(result.length, 1);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('#deleteEvent', function() {
    it('should return error if user not host of event', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function(err, created_user) {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, created_event) {
          Event.deleteEvent(0, created_event._id, function(err, result) {
            assert.deepEqual(err.msg, "You do not have the authority to delete this Event.");
            done();
          });
        });
      });
    });
    it('should return invalid event error if no event exists', function(done) {
      Event.deleteEvent(0, 0, function(error, result) {
        assert.deepEqual(error.msg, 'No such event.');
        done();
      });
    });
    it('should return nothing if event removed successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function(err, created_user) {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, created_event) {
          Event.deleteEvent(created_user._id, created_event._id, function(err, result) {
            assert.deepEqual(err, null);
            done();
          });
        });
      });
    });
    it('should affect future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function(err, created_user) {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, created_event) {
          Event.deleteEvent(created_user._id, created_event._id, function() {
            Event.findById(created_event._id, function(err, result) {
              assert.deepEqual(err.msg, "No such event.");
              done();
            });
          });
        });
      });
    });
  });

  describe('#setInformation', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.setInformation(0, {}, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return nothing if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.setInformation(n_event._id, {location:"my house"}, function(err, result) {
            assert.deepEqual(err, null);
            done();
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.setInformation(n_event._id, {location:"my house"}, function(err, result) {
            Event.findById(n_event._id, function(err, result) {
              assert.deepEqual(result.location, "my house");
              done();
            });
          });
        });
      });
    });
    it('works with fields that have already been set', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.setInformation(n_event._id, {name:"new_name"}, function(err, result) {
            Event.findById(n_event._id, function(err, result) {
              assert.deepEqual(result.name, "new_name");
              done();
            });
          });
        });
      });
    });
  });

  describe('#addPlanner', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.addPlanner(0, 'erosales@mit.edu', function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return a no such user error if planner doesn\'t exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addPlanner(n_event._id, 'erosales@mit.edu', function(err, result) {
            assert.deepEqual(err.msg, "No such user.");
            done();
          });
        });
      });
    });
    it('should return nothing if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.createNewUser('erosales@mit.edu', 'blah2', 'erosales', function() {
          Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
            Event.addPlanner(n_event._id, 'erosales@mit.edu', function(err, result) {
              assert.deepEqual(err, null);
              done();
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.createNewUser('erosales@mit.edu', 'blah2', 'erosales', function(err, planner) {
          Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
            Event.addPlanner(n_event._id, 'erosales@mit.edu', function(err, result) {
              Event.findById(n_event._id, function(err, result) {
                assert.deepEqual(result.planners.toObject(), [planner._id]);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#deletePlanner', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.deletePlanner(0, 0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return a no planner error if planner doesn\'t exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.deletePlanner(n_event._id, 0, function(err, result) {
            assert.deepEqual(err.msg, "No such planner.");
            done();
          });
        });
      });
    });
    it('should return true if planner deleted successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.createNewUser('erosales@mit.edu', 'blah2', 'erosales', function(err, ever) {
          Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
            Event.addPlanner(n_event._id, 'erosales@mit.edu', function(err, n_event) {
              Event.deletePlanner(n_event._id, ever._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, true);
                done();
              });
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.createNewUser('erosales@mit.edu', 'blah2', 'erosales', function(err, ever) {
          Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
            Event.addPlanner(n_event._id, 'erosales@mit.edu', function(err, n_event) {
              Event.deletePlanner(n_event._id, ever._id, function(err, result) {
                Event.findById(n_event._id, function(err, result) {
                  assert.deepEqual(err, null);
                  assert.deepEqual(result.planners.length, 0);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('#addCost', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.addCost(0, 'venue', 12, 'wow such location', function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return nothing if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCost(n_event._id, 'venue', 12, 'wow such location', function(err, result) {
            assert.deepEqual(err, null);
            done();
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCost(n_event._id, 'venue', 12, 'wow such location', function(err, result) {
            Event.findById(n_event._id, function(err, result) {
              assert.deepEqual(result.cost.length, 1);
              assert.deepEqual(result.cost[0].name, 'venue');
              assert.deepEqual(result.cost[0].amount, 12);
              assert.deepEqual(result.cost[0].description, "wow such location");
              done();
            });
          });
        });
      });
    });
  });

  describe('#deleteCost', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.deleteCost(0, 0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return true if cost deleted successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCost(n_event._id, 'blah', 12, 'blah2', function(err, n_event) {
            Event.deleteCost(n_event._id, n_event.cost[0]._id, function(err, result) {
              assert.deepEqual(err, null);
              assert.deepEqual(result, true);
              done();
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCost(n_event._id, 'blah', 12, 'blah2', function(err, n_event) {
            Event.deleteCost(n_event._id, n_event.cost[0]._id, function(err, result) {
              Event.findById(n_event._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result.cost.length, 0);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#addInvite', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.addInvite(0, 'erosales@mit.edu', function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return nothing if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function(err, result) {
            assert.deepEqual(err, null);
            done();
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function(err, result) {
            Event.findById(n_event._id, function(err, result) {
              assert.deepEqual(result.attendees.length, 1);
              assert.deepEqual(result.attendees[0].email, 'erosales@mit.edu');
              assert.deepEqual(result.attendees[0].attending, 0);
              done();
            });
          });
        });
      });
    });
    it('should have userid of invitee if invitee has account', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        User.createNewUser('erosales@mit.edu', 'blah2', 'erosales', function(err, invitee) {
          Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
            Event.addInvite(n_event._id, 'erosales@mit.edu', function(err, result) {
              Event.findById(n_event._id, function(err, result) {
                assert.deepEqual(result.attendees.length, 1);
                assert.deepEqual(result.attendees[0].email, 'erosales@mit.edu');
                assert.deepEqual(result.attendees[0].userId, invitee._id);
                assert.deepEqual(result.attendees[0].attending, 0);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#markAttending', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.markAttending(0, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should add a new invitee if invitee doesn\'t exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.markAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
            assert.deepEqual(err, null);
            Event.findById(n_event._id, function(err, result) {
              assert.deepEqual(err, null);
              assert.deepEqual(result.attendees.length, 1);
              assert.deepEqual(result.attendees[0].email, 'erosales@mit.edu');
              assert.deepEqual(result.attendees[0].name, 'ever');
              assert.deepEqual(result.attendees[0].note, 'blahhhhhhh');
              assert.deepEqual(result.attendees[0].attending, 1);
              done();
            });
          });
        });
      });
    });
    it('should return nothing if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function() {
            Event.markAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
              assert.deepEqual(err, null);
              done();
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function() {
            Event.markAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
              Event.findById(n_event._id, function(err, result) {
                assert.deepEqual(result.attendees.length, 1);
                assert.deepEqual(result.attendees[0].email, 'erosales@mit.edu');
                assert.deepEqual(result.attendees[0].attending, 1);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#markNotAttending', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.markNotAttending(0, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return a no such invitee error if invitee doesn\'t exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.markNotAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
            assert.deepEqual(err.msg, "No such invitee.");
            done();
          });
        });
      });
    });
    it('should return nothing if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function() {
            Event.markNotAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
              assert.deepEqual(err, null);
              done();
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function() {
            Event.markNotAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blahhhhhhh', function(err, result) {
              Event.findById(n_event._id, function(err, result) {
                assert.deepEqual(result.attendees.length, 1);
                assert.deepEqual(result.attendees[0].email, 'erosales@mit.edu');
                assert.deepEqual(result.attendees[0].attending, 2);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#getAttendingCount', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.getAttendingCount(0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return 0 if no one invited', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.getAttendingCount(n_event._id, function(err, result) {
            assert.deepEqual(err, null);
            assert.deepEqual(result, 0);
            done();
          });
        });
      });
    });
    it('should return 0 if no one attending', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function(err, result) {
            Event.getAttendingCount(n_event._id, function(err, result) {
              assert.deepEqual(err, null);
              assert.deepEqual(result, 0);
              done();
            });
          });
        });
      });
    });
    it('should return as many people as are attending', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.markAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blah', function() {
            Event.markAttending(n_event._id, 'ajliu@mit.edu', 'amanda', 'blah2', function() {
              Event.getAttendingCount(n_event._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, 2);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#getInvitedCount', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.getInvitedCount(0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return 0 if no one invited', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.getInvitedCount(n_event._id, function(err, result) {
            assert.deepEqual(err, null);
            assert.deepEqual(result, 0);
            done();
          });
        });
      });
    });
    it('should return the number of invited people (regardless of attending status)', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function() {
            Event.markAttending(n_event._id, 'ajliu@mit.edu', 'amanda', 'blah2', function() {
              Event.getInvitedCount(n_event._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, 2);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#getAttendeeEmails', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.getAttendeeEmails(0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return [] if no one invited', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.getAttendeeEmails(n_event._id, function(err, result) {
            assert.deepEqual(err, null);
            assert.deepEqual(result, []);
            done();
          });
        });
      });
    });
    it('should return [] if no one attending', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function(err, result) {
            Event.getAttendeeEmails(n_event._id, function(err, result) {
              assert.deepEqual(err, null);
              assert.deepEqual(result, []);
              done();
            });
          });
        });
      });
    });
    it('should return all emails of attendees', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.markAttending(n_event._id, 'erosales@mit.edu', 'ever', 'blah', function() {
            Event.markAttending(n_event._id, 'ajliu@mit.edu', 'amanda', 'blah2', function() {
              Event.getAttendeeEmails(n_event._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result.length, 2);
                if (result[0] === 'erosales@mit.edu') {
                  assert.deepEqual(result[0], 'erosales@mit.edu');
                  assert.deepEqual(result[1], 'ajliu@mit.edu');
                } else {
                  assert.deepEqual(result[0], 'ajliu@mit.edu');
                  assert.deepEqual(result[1], 'erosales@mit.edu');
                }
                done();
              });
            });
          });
        });
      });
    });

  });

  describe('#getInviteeEmails', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.getAttendeeEmails(0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return [] if no one invited', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.getInviteeEmails(n_event._id, function(err, result) {
            assert.deepEqual(err, null);
            assert.deepEqual(result, []);
            done();
          });
        });
      });
    });
    it('should return the number of invited people (regardless of attending status)', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addInvite(n_event._id, 'erosales@mit.edu', function() {
            Event.markAttending(n_event._id, 'ajliu@mit.edu', 'amanda', 'blah2', function() {
              Event.getInviteeEmails(n_event._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result.length, 2);
                if (result[0] === 'erosales@mit.edu') {
                  assert.deepEqual(result[0], 'erosales@mit.edu');
                  assert.deepEqual(result[1], 'ajliu@mit.edu');
                } else {
                  assert.deepEqual(result[0], 'ajliu@mit.edu');
                  assert.deepEqual(result[1], 'erosales@mit.edu');
                }
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#addCategory', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.addCategory(0, 'venue', function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return the new category if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, result) {
            assert.deepEqual(err, null);
            assert.deepEqual(result.name, 'venue');
            assert.deepEqual(result.todos.toObject(), []);
            done();
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, result) {
            Event.findById(n_event._id, function(err, result) {
              assert.deepEqual(result.categories.length, 1);
              assert.deepEqual(result.categories[0].name, 'venue');
              assert.deepEqual(result.categories[0].todos.toObject(), []);
              done();
            });
          });
        });
      });
    });
  });

  describe('#deleteCategory', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.deleteCategory(0, 'venue', function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return an error if category doesn\'t exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.deleteCategory(n_event._id, 0, function(err, result) {
            assert.deepEqual(err.msg, 'Category doesn\'t exist');
            done();
          });
        });
      });
    });
    it('should return true if category deleted successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.deleteCategory(n_event._id, new_category._id, function(err, result) {
              assert.deepEqual(err, null);
              assert.deepEqual(result, true);
              done();
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.deleteCategory(n_event._id, new_category._id, function() {
              Event.findById(n_event._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result.categories.length, 0);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#addTodo', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.addTodo(0, 0, 'venue', new Date(1996, 7, 6, 10, 39, 0), 3, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return a no category error if category doesn\'t exist in event', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addTodo(n_event._id, 0, 'blah', new Date(1995, 7, 6, 10, 39, 0), 0, function(err, result) {
            assert.deepEqual(err.msg, 'Category doesn\'t exist');
            done();
          });
        });
      });
    });
    it('should return the new todo if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, result) {
              assert.deepEqual(err, null);
              assert.deepEqual(result.name, 'blah');
              assert.deepEqual(result.deadline, new Date(1995, 7, 6, 10, 39, 0));
              assert.deepEqual(result.priority, 3);
              done();
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function() {
              Event.findById(n_event._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result.categories[0].todos.length, 1);
                var todo = result.categories[0].todos[0];
                assert.deepEqual(todo.name, 'blah');
                assert.deepEqual(todo.deadline, new Date(1995, 7, 6, 10, 39, 0));
                assert.deepEqual(todo.priority, 3);
                assert.deepEqual(todo.status, 0);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#checkTodo', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.checkTodo(0, 0, 0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return a no category error if category doesn\'t exist in event', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.checkTodo(n_event._id, 0, 0, function(err, result) {
            assert.deepEqual(err.msg, 'Category doesn\'t exist');
            done();
          });
        });
      });
    });
    it('should return true if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.checkTodo(n_event._id, new_category._id, new_todo._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, true);
                done();
              });
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.checkTodo(n_event._id, new_category._id, new_todo._id, function() {
                Event.findById(n_event._id, function(err, result) {
                  assert.deepEqual(err, null);
                  assert.deepEqual(result.categories[0].todos.length, 1);
                  var todo = result.categories[0].todos[0];
                  assert.deepEqual(todo.name, 'blah');
                  assert.deepEqual(todo.deadline, new Date(1995, 7, 6, 10, 39, 0));
                  assert.deepEqual(todo.priority, 3);
                  assert.deepEqual(todo.status, 1);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('#uncheckTodo', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.uncheckTodo(0, 0, 0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return a no category error if category doesn\'t exist in event', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.uncheckTodo(n_event._id, 0, 0, function(err, result) {
            assert.deepEqual(err.msg, 'Category doesn\'t exist');
            done();
          });
        });
      });
    });
    it('should return true if event updated successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.checkTodo(n_event._id, new_category._id, new_todo._id, function(err, result) {
                Event.uncheckTodo(n_event._id, new_category._id, new_todo._id, function(err, result) {
                  assert.deepEqual(err, null);
                  assert.deepEqual(result, true);
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.checkTodo(n_event._id, new_category._id, new_todo._id, function() {
                Event.findById(n_event._id, function(err, result) {
                  assert.deepEqual(result.categories[0].todos[0].status, 1);
                  Event.uncheckTodo(n_event._id, new_category._id, new_todo._id, function() {
                    Event.findById(n_event._id, function(err, result) {
                      assert.deepEqual(result.categories[0].todos[0].status, 0);
                      done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

  });

  describe('#editTodo', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.editTodo(0, 0, 0, {}, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return an error if category doesn\'t exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.editTodo(n_event._id, 0, 0, {}, function(err, result) {
            assert.deepEqual(err.msg, 'Category doesn\'t exist');
            done();
          });
        });
      });
    });
    it('should return true if todo edited successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.editTodo(n_event._id, new_category._id, new_todo._id, {name:"blah2"}, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, true);
                done();
              });
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.editTodo(n_event._id, new_category._id, new_todo._id, {name:"blah2"}, function() {
                Event.findById(n_event._id, function(err, result) {
                  assert.deepEqual(err, null);
                  assert.deepEqual(result.categories[0].todos[0].name, "blah2");
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('should work with multiple bits of information', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.editTodo(n_event._id, new_category._id, new_todo._id, {name:"blah2", priority:1}, function() {
                Event.findById(n_event._id, function(err, result) {
                  assert.deepEqual(err, null);
                  assert.deepEqual(result.categories[0].todos[0].name, "blah2");
                  assert.deepEqual(result.categories[0].todos[0].priority, 1);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  describe('#deleteTodo', function() {
    it('should return a no event error if event doesn\'t exist', function(done) {
      Event.deleteTodo(0, 0, 0, function(err, result) {
        assert.deepEqual(err.msg, "No such event.");
        done();
      });
    });
    it('should return an error if category doesn\'t exist', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.deleteTodo(n_event._id, 0, 0, function(err, result) {
            assert.deepEqual(err.msg, 'Category doesn\'t exist');
            done();
          });
        });
      });
    });
    it('should return true if todo deleted successfully', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.deleteTodo(n_event._id, new_category._id, new_todo._id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, true);
                done();
              });
            });
          });
        });
      });
    });
    it('should change the result of future getEvent calls', function(done) {
      User.createNewUser('erosolar@mit.edu', 'blah', 'erosolar', function() {
        Event.createNewEvent('erosolar@mit.edu', 'blah', new Date(1995, 7, 6, 10, 39, 0), new Date(1995, 7, 7, 10, 39, 0), function(err, n_event) {
          Event.addCategory(n_event._id, 'venue', function(err, new_category) {
            Event.addTodo(n_event._id, new_category._id, 'blah', new Date(1995, 7, 6, 10, 39, 0), 3, function(err, new_todo) {
              Event.deleteTodo(n_event._id, new_category._id, new_todo._id, function() {
                Event.findById(n_event._id, function(err, result) {
                  assert.deepEqual(err, null);
                  assert.deepEqual(result.categories[0].todos.length, 0);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });
});
