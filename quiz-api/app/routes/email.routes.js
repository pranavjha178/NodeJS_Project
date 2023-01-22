module.exports = app => {
    const Email = require("../controllers/email.controller.js");
  
    var router = require("express").Router();
  
    // Post Request to send email using GMAIL
    router.post("/gmail", Email.createEmail);
  
    app.use('/api/sendmail', router);
};