import Goal from "../models/goals.model.js";
import uuidv4 from "uuid/v4.js";

export default {
  getAllByUser(req, res, next) {
    const userId = req.params.userId;
    Goal.getAllUserGoals(userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "An error occurred while getting goals.",
        });
        return;
      }
      if (data.length === 0) {
        res.status(404).send({
          message: `No goals found under user ${userId}`,
        });
      } else {
        res.status(200).send({
          message: `Goals found under user ${userId}`,
          goals: data,
        });
        next();
      }
    });
  },
  create(req, res, next) {
    const goal = new Goal({
      id: uuidv4(),
      userId: req.params.userId,
      location: req.body.location,
      notes: req.body.notes,
      name: req.body.name,
      totalTime: req.body.totalTime,
      timeLeft: req.body.timeLeft,
      priority: req.body.priority,
      endDate: req.body.endDate,
      minTaskTime: req.body.minTaskTime,
      ignoreDeadline: req.body.ignoreDeadline,
    });
    if (parseInt(goal.totalTime) < parseInt(goal.minTaskTime)) {
      res.status(400).send({
        message:
          "The minimum task time cannot be greater than the total time required.",
      });
      return;
    }
    Goal.create(goal, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "An error occurred while creating the goal.",
        });
      } else {
        next();
      }
    });
  },
  update(req, res, next) {
    const goal = new Goal({
      id: req.params.goalId,
      userId: req.params.userId,
      location: req.body.location,
      notes: req.body.notes,
      name: req.body.name,
      totalTime: req.body.totalTime,
      timeLeft: req.body.timeLeft,
      priority: req.body.priority,
      endDate: req.body.endDate,
      minTaskTime: req.body.minTaskTime,
      ignoreDeadline: req.body.ignoreDeadline,
    });

    if (parseInt(goal.totalTime) < parseInt(goal.minTaskTime)) {
      res.status(400).send({
        message:
          "The minimum task time cannot be greater than the total time required.",
      });
      return;
    }

    Goal.update(goal, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "An error occurred while updating the goal.",
        });
      } else {
        if (!data) {
          res.status(404).send({
            message: `Goal ID ${goal.id} not found`,
          });
        } else {
          next();
        }
      }
    });
  },
  delete(req, res, next) {
    const goalId = req.params.goalId;
    Goal.delete(goalId, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "An error occurred while deleting the goal.",
        });
      } else {
        if (!data) {
          res.status(404).send({
            message: `Goal ID ${goalId} not found`,
          });
        } else {
          next();
        }
      }
    });
  },
};
