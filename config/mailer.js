var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

var Mailer = (function Mailer() {
  var _sendEmail = function(receiver_address, email_subject, email_text, callback) {
    transporter.sendMail({
      from: 'pocketplannerteam@pocketplanner.herokuapp.com',
      to: receiver_address,
      subject: email_subject,
      text: email_text
    }, callback);
  }

  return {
    sendEmail   :   _sendEmail
  }
})();

module.exports = Mailer;
