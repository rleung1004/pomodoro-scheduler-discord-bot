import UserConfig from "../models/userConfig.model.js";

export const getUserConfig = (req, res, next) => {
  const userId = req.params.userId;
  UserConfig.getUserConfig(userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while finding user configs.",
      });
      return;
    }
    if (!data) {
      res.status(404).send({
        message: `User ${userId} must create a weekly user config before invoking this endpoint`,
      });
      return;
    }
    next();
  });
};
