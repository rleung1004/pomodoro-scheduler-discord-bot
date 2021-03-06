import sql from "./db.js";

const Schedule = function (schedule) {
  (this.userId = schedule.userId), (this.scheduleObj = schedule.scheduleObj);
};

Schedule.getUserSchedule = (userId, result) => {
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
    result(null, null);
  });
};

export default Schedule;
