module.exports = app => {
  const Question = require("../controllers/question.controller.js");

  var router = require("express").Router();

  // Create a new Question
  router.post("/", Question.create);

  // Retrieve all Question
  router.get("/", Question.findAll);

  // // Retrieve all ImageName Question
  // router.get("/ImageName", Question.findAllImageName);

  // Retrieve a single Question with id
  router.get("/:id", Question.findOne);

  // Retrieve a single Question with id
  router.get("/getanswers/:id", Question.findOne);
  
  // Get answers for all questions after submissoin
  router.post("/getanswers/", Question.getAnswersForList);

  // Update a Question with id
  router.put("/:id", Question.update);

  // Delete a Question with id
  router.delete("/:id", Question.delete);

  // Delete all Question
  router.delete("/", Question.deleteAll);

  app.use('/api/question', router);
};
