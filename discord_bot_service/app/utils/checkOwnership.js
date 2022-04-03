import Goal from "../models/goals.model.js";
import Commitment from "../models/commitment.model.js";

export const checkCommitmentOwnership = (req, res, next) => {
  const userId = req.params.userId;
  const commitmentId = req.params.commitmentId;
  Commitment.getById(commitmentId, (err, data) => {
    console.log(data);
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while finding commitment.",
      });
      return;
    }
    if (data.length === 0) {
      res.status(404).send({
        message: `Commitment ${commitmentId} not found`,
      });
      return;
    }
    if (data[0].userId !== userId) {
      res.status(403).send({
        message: `User ${userId} does not have access to commitment ${commitmentId}`,
      });
      return;
    }
    next();
  });
};

export const checkGoalOwnership = (req, res, next) => {
  const userId = req.params.userId;
  const goalId = req.params.goalId;
  Goal.getById(goalId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while finding goal.",
      });
      return;
    }
    if (data.length === 0) {
      res.status(404).send({
        message: `Goal ${goalId} not found`,
      });
      return;
    }
    if (data[0].userId !== userId) {
      res.status(403).send({
        message: `User ${userId} does not have access to goal ${goalId}`,
      });
      return;
    }
    next();
  });
};
