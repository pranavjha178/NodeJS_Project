module.exports = app => {
  const Participant = require("../controllers/participant.controller.js");

  var router = require("express").Router();

  // Create a new Participant
  router.post("/", Participant.Create);

  // Retrieve all Participant
  router.get("/", Participant.FindAll);

  // Retrieve a single Participant with id
  router.get("/:id", Participant.findOne);
    
  // Update a Participant with id
  router.put("/:id", Participant.update);

  // Delete a Participant with id
  router.delete("/:id", Participant.delete);

  // Delete all Participant
  router.delete("/", Participant.deleteAll);

  app.use('/api/participant', router);
};
