var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var transporter = nodemailer.createTransport();

var Mailer = (function Mailer() {
  var _sendEmail = function(receiver_address, email_subject, email_text, callback) {
    transporter.sendMail({
      from: 'Pocket Planner <pocketplanner-team@pocketplanner.herokuapp.com>',
      to: receiver_address,
      subject: email_subject,
      text: email_text
    }, callback);
  };

  var _sendEmailAt = function(receiver_address, email_subject, email_text, date, callback) {
    var emailOrder = schedule.scheduleJob(date, function() {
      _sendEmail(receiver_address, email_subject, email_text, callback);
    });
  };

  return {
    sendEmail   :   _sendEmail,
    sendEmailAt :   _sendEmailAt
  }
})();

module.exports = Mailer;
