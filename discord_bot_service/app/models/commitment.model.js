import sql from "./db.js";

const Commitment = function (commitment) {
  (this.location = commitment.location),
    (this.name = commitment.name),
    (this.notes = commitment.notes);
  (this.repeated = commitment.repeated),
    (this.url = commitment.url),
    (this.startTime = commitment.endTime),
    (this.endTime = commitment.endTime);
};

Commitment.create = (newCommitment, result) => {
  sql.query(
    'UPDATE requests SET count = count + 1 WHERE route = "/commitments/create";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query("INSERT INTO commitment SET ?", newCommitment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created commitment: ", {
      id: res.insertId,
      ...newCommitment,
    });
    result(null, { id: res.insertId, ...newCommitment });
  });
};

Commitment.findById = (id, result) => {
  sql.query(
    'UPDATE requests SET count = count + 1 WHERE route = "/commitments/findById";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query(`SELECT * FROM commitments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (res.length) {
      console.log("found commitment: ", res[0]);
      result(null, res[0]);
      return;
    }
    // else not found:
    result({ kind: "not_found" }, null);
  });
};

Commitment.getAll = (title, result) => {
  let query = "SELECT * FROM commitments";
  if (title) {
    query += `WHERE title LIKE '%${title}'`;
  }

  sql.query(
    'UPDATE requests SET count = count + 1 WHERE route = "/commitments/getAll";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (res.length) {
      console.log("found commitment: ", res[0]);
      result(null, res[0]);
      return;
    }
    // else not found:
    result({ kind: "not_found" }, null);
  });
};

export default Commitment;
