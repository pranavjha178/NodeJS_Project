const sql = require("./db.js");

// constructor
const Question = function(question) {
  this.QnInWords = question.QnInWords;
  this.ImageName	 = question.ImageName	;
  this.Option1 = question.Option1;
  this.Option2 = question.Option2;
  this.Option3 = question.Option3;
  this.Option4 = question.Option4;
  this.Answer = question.Answer;
};

// Construct for qnIDs
const QuestionID = function(question) {
  this.qnID = question.qnID;
};

Question.create = (newQuestion, result) => {
  sql.query("INSERT INTO questions SET ?", newQuestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created question: ", { id: res.insertId, ...newQuestion });
    result(null, { id: res.insertId, ...newQuestion });
  });
};

Question.findById = (id, result) => {
  sql.query(`SELECT qnId, qnInWords, imageName, Option1, Option2, Option3, Option4, answer FROM questions WHERE qnId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found questions: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Question with the id
    result({ kind: "not_found" }, null);
  });
};

Question.getAll = (title, result) => {
  let query = "SELECT qnId, qnInWords, imageName, Option1, Option2, Option3, Option4 FROM questions order by rand() limit 5";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("questions: ", res);
    result(null, res);
  });
};

Question.getAllForList = (anIDList, result) => {
  let query = "SELECT qnId, qnInWords, imageName, Option1, Option2, Option3, Option4, answer FROM questions where qnId in (" + anIDList + ")";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("questions: ", res);
    result(null, res);
  });
};

Question.getAllPublished = result => {
  sql.query("SELECT * FROM questions WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("questions: ", res);
    result(null, res);
  });
};

Question.updateById = (id, question, result) => {
  sql.query(
    "UPDATE questions SET QnInWords = ?, ImageName = ?, Option1 = ?, Option2 = ?, Option3= ?, Option4 = ? WHERE QnId  = ?",
    [question.QnInWords, question.ImageName, question.Option1, question.Option2, question.Option3, question.Option4, question.Answer , QnId ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Question with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated question: ", { id: id, ...question });
      result(null, { id: id, ...question });
    }
  );
};

Question.remove = (id, result) => {
  sql.query("DELETE FROM questions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Question with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted question with id: ", id);
    result(null, res);
  });
};

Question.removeAll = result => {
  sql.query("DELETE FROM questions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} questions`);
    result(null, res);
  });
};

module.exports = Question;
