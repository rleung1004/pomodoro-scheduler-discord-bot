import Schedule from "../models/schedule.model.js";

export default {
  getUserSchedule(req, res) {
    const userId = req.params.userId;
    Schedule.getUserSchedule(userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occured while retrieving the schedule.",
        });
      }
      if (!data) {
        res.status(404).send({
          message: `User ${userId} has no schedule.`,
        });
      }
      res.status(200).send({
        message: `Schedule of ${userId}`,
        schedule: data,
      });
    });
  },
};
