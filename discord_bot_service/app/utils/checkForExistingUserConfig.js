import UserConfig from "../models/userConfig.model.js";

export const checkForExistingUserConfig = (req, res, next) => {
  const userId = req.params.userId;
  UserConfig.getUserConfig(userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while finding user configs.",
      });
      return;
    }
    if (data) {
      res.status(409).send({
        message: `User ${userId} has already setup configs`,
      });
      return;
    }
    next();
  });
};
