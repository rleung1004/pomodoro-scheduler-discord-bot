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

const convertRepeatsIntegerToEnum = (repeats) => {
  return repeats
    .split(",")
    .map((e) =>
      e
        .replaceAll(" ", "")
        .replace("[", "")
        .replace("]", "")
        .replace("0", "MON")
        .replace("1", "TUES")
        .replace("2", "WED")
        .replace("3", "THURS")
        .replace("4", "FRI")
        .replace("5", "SAT")
        .replace("6", "SUN")
    )
    .join();
};

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
    (this.endDate = commitment.endDate),
    (this.minutes = commitment.minutes);
};

Commitment.create = (newCommitment, result) => {
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

Commitment.delete = (commitmentId, result) => {
  sql.query("DELETE FROM commitment WHERE id = ?", commitmentId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("deleted commitment: ", res);
    if (res.affectedRows === 0) {
      result(null, null);
      return;
    }
    result(null, res);
  });
};

Commitment.getAllUserCommitments = (userId, result) => {
  sql.query(`SELECT * FROM commitment WHERE userId = ?`, userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    res.forEach((commitment) => {
      commitment.repeats = convertRepeatsIntegerToEnum(commitment.repeats);
    });
    console.log("Found commitments ", res);
    result(null, res);
  });
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
