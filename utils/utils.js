// Packaged utility functions.
//
// These methods abstract out the basic mechanism
// of creating server responses with some content
// (error code, message, etc.).
var utils = (function () {

  var _utils = {};

  /*
    Send a 200 OK with success:true in the request body to the
    response argument provided.
    The caller of this function should return after calling
  */
  _utils.sendSuccessResponse = function(res, content) {
    res.status(200).json({
      success: true,
      content: content
    }).end();
  };

  /*
    Send an error code with success:false and error message
    as provided in the arguments to the response argument provided.
    The caller of this function should return after calling
  */
  _utils.sendErrResponse = function(res, errcode, err) {
    res.status(errcode).json({
      success: false,
      err: err
    }).end();
  };

  /*
    Package an event and its details before it is sent to the client
  */
  _utils.packageEventDetails = function(req) {
    evt = {};
    evt.start = new Date(req.event.start);
    evt.start_time = evt.start.toLocaleTimeString();
    var tmp_time = evt.start_time.split(' ');
    var am_pm = tmp_time[1];
    tmp_time = evt.start_time.split(':');
    evt.start_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
    evt.start = evt.start.toLocaleDateString();

    evt.end = new Date(req.event.end);
    evt.end_time = evt.end.toLocaleTimeString();
    tmp_time = evt.end_time.split(' ');
    am_pm = tmp_time[1];
    tmp_time = evt.end_time.split(':');
    evt.end_time = tmp_time.slice(0,2).join(':') +' '+ am_pm;
    evt.end = evt.end.toLocaleDateString();

    evt.description = req.event.description;
    evt.location = req.event.location;
    evt.hostEmail = req.event.hostEmail;
    evt.name = req.event.name;
    evt._id = req.event._id;

    if (req.user) {
      evt.currentUser = req.user.username;
    }
    return evt;
  };

  Object.freeze(_utils);
  return _utils;

})();

module.exports = utils;
