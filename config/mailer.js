var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var transporter = nodemailer.createTransport();
//'Pocket Planner <pocketplanner-team@pocketplanner.herokuapp.com>'

var Mailer = (function Mailer() {
  var _sendEmail = function(email_message, callback) {
    transporter.sendMail(email_message, callback);
  };

  var _sendEmailAt = function(email_message, date, callback) {
    var emailOrder = schedule.scheduleJob(date, function() {
      _sendEmail(email_message, callback);
    });
  };

  return {
    sendEmail   :   _sendEmail,
    sendEmailAt :   _sendEmailAt
  }
})();

module.exports = Mailer;
