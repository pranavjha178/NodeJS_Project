const Participant = require("../models/participant.model.js");

// Create and Save a new Participant
exports.Create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log("Participation");
  // Create a Participant
  const participant = new Participant({
    Email: req.body.email,
    Name: req.body.name,
    score: req.body.score,
    timeTaken: req.body.timeTaken,
  });
  console.log("Participation");
  // Save Participant in the database
  Participant.create(participant, (err, data) => {
    console.log("Participation");
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Participant."
      });
    else{

      res.send(data);
    }
     
  });
};

// Retrieve all Participant from the database (with condition).
exports.FindAll = (req, res) => {
  const Email = req.query.Email;

  Participant.getAll(Email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Participant."
      });
    else res.send(data);
  });
};

// Find a single Participant by Id
exports.findOne = (req, res) => {
  Participant.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Participant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Participant with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Participant identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 console.log(req.body);

  Participant.updateById(
    req.params.id,
    new Participant(req.body),
    (err, data) => {
      console.log(data);
          const msg = {
            to: "pranavjha178@gmail.com",
            from: "vanshSoftware99@gmail.com",
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<h1>Sending with Twilio SendGrid</h1>',
          };
            
            nodemailer.createTransport({
              service:'gmail',
              auth:{
                user : "vanshSoftware99@gmail.com",
                pass:" yvyayoggjwyckbpa"
              },
              port:456,
              host:'smtp.gmail.com',
            }).sendMail(msg,(err)=>{
              if(err){
                return console.error(err,"error sending mail");
              }else{
                return console.log("message","message");
              }
            })
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Participant with id ${req.params.id}.`
          });
        } else {
          var data = {name:'Akashdeep',Phone : '5525' , message : '5525' ,date : '5525' }
    
          
      console.log("fghj");
          res.status(500).send({
            message: "Error updating Participant with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Participant with the specified id in the request
exports.delete = (req, res) => {
  Participant.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Participant with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Participant with id " + req.params.id
        });
      }
    } else res.send({ message: `Participant was deleted successfully!` });
  });
};

// Delete all Participant from the database.
exports.deleteAll = (req, res) => {
  Participant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Participant."
      });
    else res.send({ message: `All Participant were deleted successfully!` });
  });
};
