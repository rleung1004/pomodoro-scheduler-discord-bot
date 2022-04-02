import sql from "./db.js";

const Schedule = function (schedule) {
  (this.userId = schedule.userId), (this.scheduleObj = schedule.scheduleObj);
};

Schedule.getUserSchedule = (userId, result) => {
  sql.query(
    'UPDATE request SET count = count + 1 WHERE route = "/commitments/findByUserId";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  sql.query(`SELECT * FROM schedule WHERE userId = ?`, userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (res.length) {
      console.log("found schedule: ", res[0]);
      result(null, res);
      return;
    }
    // else not found:
    result({ kind: "not_found" }, null);
  });
};

export default Schedule;
