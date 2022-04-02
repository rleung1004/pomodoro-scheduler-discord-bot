import Commitment from "../models/commitment.model.js";
import uuidv4 from "uuid/v4.js";

export default {
  create(req, res) {
    const commitment = new Commitment({
      id: uuidv4(),
      userId: req.query.userId,
      location: req.body.location,
      name: req.body.name,
      notes: req.body.notes,
      minutes: req.body.minutes,
      repeats: req.body.repeats,
      url: req.body.url,
      startTime: commitment.startTime,
      endTime: commitment.endTime,
    });
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
      }
    });
  },
  update(req, res) {
    const commitment = new Commitment({
      id: req.query.commitmentId,
      userId: req.query.userId,
      location: req.body.location,
      name: req.body.name,
      notes: req.body.notes,
      repeats: req.body.repeats,
      url: req.body.url,
      startTime: commitment.startTime,
      endTime: commitment.endTime,
    });
    let existingCommitment;
    Commitment.getById(commitment.id, (err, data) => {
      if (data) {
        existingCommitment = data;
      }
    });
    if (!existingCommitment) {
      res.status(404).send({
        message: `Commitment ${commitment.id} not found`,
      });
      return;
    }
    if (existingCommitment.userId !== commitment.userId) {
      res.status(403).send({
        message: `Access to commitment ${commitment.id} is forbidden`,
      });
      return;
    }
    Commitment.update(commitment, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occurred while creating the commitment.",
        });
      } else {
        res.status(204);
      }
    });
  },
};
