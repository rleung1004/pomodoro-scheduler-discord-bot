import Schedule from "../models/schedule.model.js";

export default {
    getUserSchedule(req, res) {
    const userId = req.query.userId;
    Schedule.getUserSchedule(userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occured while retrieving the schedule.",
        });
      } else {
        res.send(data);
      }
    });
  }
};