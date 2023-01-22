const Email = require("../models/email.model.js");

exports.createEmail = (request, response) => {
    // Validate request
    if (!request.body) {
        response.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Validate request recipients
     if (!request.body.to) {
        response.status(400).send({
        message: "Recipent value cannot be empty!"
        });
    }

    // Validate request message
    if (!request.body.message)  {
        response.status(400).send({
        message: "Email Message cannot be empty!"
        });
    }

    // Create a Recipient
    const recipient = new Email({
        to: request.body.to,
        subject: request.body.subject,
        message: request.body.message
    });
    console.log(recipient);
    // Send Data to Model function
    Email.SendGmailEmail(recipient, (err, data) => {
    if (err)
      response.status(500).send({
        message:
          err.message || "Some error occurred while sending an email via Gmail.",
      }); 
    else {
      response.send(data);
    }
  });
};