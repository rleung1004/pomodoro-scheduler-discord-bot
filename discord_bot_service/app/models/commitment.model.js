import sql from "./db.js";

const Commitment = function (commitment) {
  (this.id = commitment.id),
    (this.userId = commitment.userId),
    (this.location = commitment.location),
    (this.name = commitment.name),
    (this.notes = commitment.notes),
    (this.minutes = commitment.minutes),
    (this.repeats = commitment.repeats),
    (this.url = commitment.url),
    (this.startTime = commitment.startTime),
    (this.endTime = commitment.endTime);
};

Commitment.create = (newCommitment, result) => {
  sql.query(
    'UPDATE request SET count = count + 1 WHERE route = "PUT /commitments";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query(
    "INSERT INTO commitment VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      newCommitment.id,
      newCommitment.userId,
      newCommitment.location,
      newCommitment.name,
      newCommitment.notes,
      newCommitment.minutes,
      newCommitment.repeats,
      newCommitment.url,
      newCommitment.startTime,
      newCommitment.endTime,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created commitment: ", res);
      result(null, res);
    }
  );
};

Commitment.update = (commitment, result) => {
  sql.query(
    'UPDATE request SET count = count + 1 WHERE route = "PATCH /commitments";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query(
    "UPDATE commitment SET location = ?, name = ?, notes = ?, minutes = ?, repeats = ?, url = ?, startTime = ?, endTime = ? WHERE id = ?",
    [
      commitment.location,
      commitment.name,
      commitment.notes,
      commitment.minutes,
      commitment.repeats,
      commitment.url,
      commitment.startTime,
      commitment.endTime,
      commitment.id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created commitment: ", res);
      result(null, res);
    }
  );
};

Commitment.getById = (id, result) => {
  sql.query("SELECT * FROM commitment WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("updated commitment ", res);
    result(null, res);
  });
};

export default Commitment;
