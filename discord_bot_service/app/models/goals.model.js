import sql from "./db.js";

const Goal = function (goal) {
  (this.id = goal.id),
    (this.userId = goal.userId),
    (this.location = goal.location),
    (this.notes = goal.notes),
    (this.name = goal.name),
    (this.totalTime = goal.totalTime),
    (this.timeLeft = goal.timeLeft),
    (this.priority = goal.priority),
    (this.endDate = goal.endDate),
    (this.minTaskTime = goal.minTaskTime),
    (this.ignoreDeadline = goal.ignoreDeadLine ? true : false);
};

Goal.create = (newGoal, result) => {
  sql.query(
    'UPDATE request SET count = count + 1 WHERE route = "PUT /goal";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query(
    "INSERT INTO goal(id, userId, location, notes, name, totalTime, timeLeft, priority, endDate, minTaskTime, ignoreDeadline) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      newGoal.id,
      newGoal.userId,
      newGoal.location,
      newGoal.notes,
      newGoal.name,
      newGoal.totalTime,
      newGoal.timeLeft,
      newGoal.priority,
      newGoal.endDate,
      newGoal.minTaskTime,
      newGoal.ignoreDeadline,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created goal: ", res);
      result(null, res);
    }
  );
};

Goal.update = (goal, result) => {
  sql.query(
    'UPDATE request SET count = count + 1 WHERE route = "PATCH /goal";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query(
    "UPDATE goal SET location = ?, notes = ?, name = ?, totalTime = ?, timeLeft = ?, priority = ?, endDate = ?, minTaskTime = ?, ignoreDeadline = ? WHERE id = ?",
    [
      goal.location,
      goal.notes,
      goal.name,
      goal.totalTime,
      goal.timeLeft,
      goal.priority,
      goal.endDate,
      goal.minTaskTime,
      goal.ignoreDeadline,
      goal.id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated goal: ", res);
      if (res.affectedRows === 0) {
        result(null, null);
        return;
      }
      result(null, res);
    }
  );
};

Goal.delete = (goalId, result) => {
  sql.query(
    'UPDATE request SET count = count + 1 WHERE route = "DELETE /goal";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query("DELETE FROM goal WHERE id = ?", goalId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("deleted goal: ", res);
    if (res.affectedRows === 0) {
      result(null, null);
      return;
    }
    result(null, res);
  });
};

Goal.getById = (goalId, result) => {
  sql.query(`SELECT * FROM goal WHERE id = ?`, goalId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Found commitment ", res);
    result(null, res);
  });
};

export default Goal;
