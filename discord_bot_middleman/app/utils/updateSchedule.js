import axios from "axios";

import { SCHEDULE_SERVICE_URL } from "../config/scheduleService.config.js";

export const updateSchedule = (req, res, next) => {
  const userId = req.params.userId;
  axios
    .post(SCHEDULE_SERVICE_URL, { user_id: userId })
    .then((data) => {
      if (data.status === 201) {
        res
          .status(201)
          .send({ message: `Schedule for ${userId} updated successfully` });
        next();
      } else {
        console.log(
          `Something went wrong when updating user ${userId} schedule`
        );
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      console.log(`Something went wrong when updating user ${userId} schedule`);
    });
};
