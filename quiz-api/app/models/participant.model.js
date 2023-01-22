const sql = require("./db.js");

// constructor
const Participant = function (Participant) {
  this.Email = Participant.Email;
  this.Name = Participant.Name;
  this.score = Participant.score;
  this.timeTaken = Participant.timeTaken;
};

Participant.create = (newParticipant, result) => {
  //First find the Name and email combination in the participant table
  sql.query(`SELECT * FROM participants WHERE name = '${newParticipant.Name}' and email = '${newParticipant.Email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
     
    if (res.length) {
      // console.log("found Participant: ", res[0]);
      result(null, res[0]);
      return;
    }
    else {
      //if not foudn insert a new Participant
      sql.query("INSERT INTO participants SET ?", newParticipant, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created Participant: ", {
          id: res.insertId,
          ...newParticipant,
        });
        //using lates insertId fetch the newly created participant details
        sql.query(`SELECT * FROM participants WHERE participantId = ${res.insertId}`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null); 
            return;
          }
      
          if (res.length) {
            console.log("found Participant: ", res[0]);
            result(null, res[0]);
            return;
          }
          // not found Participant with the id
          result({ kind: "not_found" }, null);
          
        });
      });
    }
  });  
};

Participant.findById = (id, result) => {
  sql.query(`SELECT * FROM participants WHERE participantId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Participant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Participant with the id
    result({ kind: "not_found" }, null);
  });
};

Participant.getAll = (Email, result) => {
  let query = "SELECT * FROM participants";

  if (Email) {
    query += ` WHERE Email LIKE '%${Email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("participants: ", res);
    result(null, res);
  });
};

// Participant.getAllScore = result => {
//   sql.query("SELECT * FROM participants WHERE Score=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("participants: ", res);
//     result(null, res);
//   });
// };

Participant.updateById = (id, Participant, result) => {
  sql.query(
    "UPDATE participants SET Score = ?, TimeTaken = ? WHERE participantId = ?",
    [      
      Participant.score,
      Participant.timeTaken,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Participant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated Participant: ", { id: id, ...Participant });
      result(null, { id: id, ...Participant });
    }
  );
};

Participant.remove = (id, result) => {
  sql.query(
    "DELETE FROM participants WHERE ParticipantId = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Participant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted Participant with id: ", id);
      result(null, res);
    }
  );
};

Participant.removeAll = (result) => {
  sql.query("DELETE FROM participants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} participants`);
    result(null, res);
  });
};

module.exports = Participant;
