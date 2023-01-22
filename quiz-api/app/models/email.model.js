var nodemailer = require('nodemailer');

// constructor
const Email = function(email) {
    this.to = email.to;
    this.subject = email.subject;
    this.message = email.message;
};

//Send a message using the Gmail protocol
Email.SendGmailEmail = (newRecepient, result) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
      
    var mailOptions = {
        from: process.env.EMAIL,
        to: newRecepient.to,
        subject: newRecepient.subject,
        text: newRecepient.message,
        html: newRecepient.message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        } else {
          console.log('Email sent: ' + info.response);
          result(null, { id: 200, ...mailOptions });
        }
      });
  };

  module.exports = Email;