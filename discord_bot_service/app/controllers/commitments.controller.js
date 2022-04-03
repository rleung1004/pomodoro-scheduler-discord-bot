import Commitment from "../models/commitment.model.js";
import uuidv4 from "uuid/v4.js";

export default {
  getAllByUser(req, res, next) {
    const userId = req.params.userId;
    Commitment.getAllUserCommitments(userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occurred while getting commitments.",
        });
        return;
      }
      if (data.length === 0) {
        res.status(404).send({
          message: `No commitments found under user ${userId}`,
        });
      } else {
        res.status(200).send({
          message: `Commitments found under user ${userId}`,
          commitments: data,
        });
        next();
      }
    });
  },
  create(req, res, next) {
    const commitment = new Commitment({
      id: uuidv4(),
      userId: req.params.userId,
      location: req.body.location,
      name: req.body.name,
      notes: req.body.notes,
      minutes: req.body.minutes,
      repeats: req.body.repeats,
      url: req.body.url,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      minutes: req.body.minutes,
    });
    console.log(commitment);
    Commitment.create(commitment, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occurred while creating the commitment.",
        });
      } else {
        res.status(201).send({
          message: `Commitment ${commitment.id} has been successfully created.`,
        });
        next();
      }
    });
  },
  update(req, res, next) {
    const commitment = new Commitment({
      id: req.params.commitmentId,
      userId: req.params.userId,
      location: req.body.location,
      name: req.body.name,
      notes: req.body.notes,
      repeats: req.body.repeats,
      url: req.body.url,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      minutes: req.body.minutes,
    });

    Commitment.update(commitment, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occurred while updating the commitment.",
        });
      } else {
        if (!data) {
          res.status(404).send({
            message: `Commitment ID ${commitment.id} not found`,
          });
        } else {
          res.status(204).send();
          next();
        }
      }
    });
  },
  delete(req, res, next) {
    const commitmentId = req.params.commitmentId;
    Commitment.delete(commitmentId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occurred while deleting the commitment.",
        });
      } else {
        if (!data) {
          res.status(404).send({
            message: `Commitment ID ${goalId} not found`,
          });
        } else {
          res.status(204).send();
          next();
        }
      }
    });
  },
};
