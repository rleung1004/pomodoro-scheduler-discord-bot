import sql from "./db.js";

const RepeatEnum = {
  MON: 0,
  TUES: 1,
  WED: 2,
  THURS: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6,
};

const convertRepeatEnumArray = (repeatEnumArray) => {
  return `[${repeatEnumArray.map((e) => RepeatEnum[e])}]`;
};

const Commitment = function (commitment) {
  (this.id = commitment.id),
    (this.userId = commitment.userId),
    (this.location = commitment.location),
    (this.name = commitment.name),
    (this.notes = commitment.notes),
    (this.repeats = commitment.repeats),
    (this.url = commitment.url),
    (this.startTime = commitment.startTime),
    (this.endDate = commitment.endDate),
    (this.minutes = commitment.minutes);
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
    "INSERT INTO commitment(id, userId, location, notes, url, name, repeats, startTime, endDate, minutes)" +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      newCommitment.id,
      newCommitment.userId,
      newCommitment.location,
      newCommitment.notes,
      newCommitment.url,
      newCommitment.name,
      convertRepeatEnumArray(newCommitment.repeats),
      newCommitment.startTime,
      newCommitment.endDate,
      newCommitment.minutes,
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
    "UPDATE commitment SET location = ?, name = ?, notes = ?, repeats = ?, url = ?, startTime = ?, endDate = ?, minutes = ? WHERE id = ?",
    [
      commitment.location,
      commitment.name,
      commitment.notes,
      convertRepeatEnumArray(commitment.repeats),
      commitment.url,
      commitment.startTime,
      commitment.endDate,
      commitment.minutes,
      commitment.id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated commitment: ", res);
      if (res.affectedRows === 0) {
        result(null, null);
        return;
      }
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
    console.log("Found commitment ", res);
    result(null, res);
  });
};

export default Commitment;
