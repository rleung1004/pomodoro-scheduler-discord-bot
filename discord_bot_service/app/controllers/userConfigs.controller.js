import UserConfig from "../models/userConfig.model.js";

const NUM_OF_DAYS = 7;
const MAX_BREAK_DURATION = 180;
const MIN_INTERLEAVES = 1;
const MAX_BLOCK_SIZE = 240;
const DEFAULT_BREAKS = "[10, 30]";
const DEFAULT_BLOCK_SIZE = 15;
const DEFAULT_INTERLEAVES = 3;
const MINUTES_IN_DAY = 3600;
const MIN_DAY = 0;
const MAX_DAY = 6;

export default {
  createUserConfig(req, res) {
    const userId = req.params.userId;
    const userConfig = new UserConfig({
      userId,
      start: req.body.start,
      end: req.body.end,
      breaks: DEFAULT_BREAKS,
      blockSize: DEFAULT_BLOCK_SIZE,
      interleaves: DEFAULT_INTERLEAVES,
    });
    if (userConfig.start > userConfig.end) {
      res.status(400).send({
        message: "Start time cannot be after end time.",
      });
      return;
    } else if (userConfig.start < 0 || userConfig.start > MINUTES_IN_DAY) {
      res.status(400).send({
        message: "Start time cannot exceed the number of minutes in a day.",
      });
      return;
    } else if (userConfig.end < 0 || userConfig.end > MINUTES_IN_DAY) {
      res.status(400).send({
        message: "End time cannot exceed the number of minutes in a day.",
      });
      return;
    }
    for (let i = 0; i < NUM_OF_DAYS; i++) {
      UserConfig.createUserConfig(userId, i, userConfig, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "An error occurred while creating a user config.",
          });
          return;
        }
      });
    }

    res.status(201).send({
      message: `User configs for ${userId} has been created successfully`,
    });
  },
  updateUserConfig(req, res) {
    const userId = req.params.userId;
    const dayOfWeek = req.params.dayOfWeek;

    const userConfig = new UserConfig({
      userId,
      start: req.body.start,
      end: req.body.end,
      breaks: req.body.breaks,
      blockSize: req.body.blockSize,
      interleaves: req.body.interleaves,
    });

    if (dayOfWeek < MIN_DAY || dayOfWeek > MAX_DAY) {
      res.status(400).send({
        message: "Day of week must be an integer between 0 and 6.",
      });
      return;
    }

    if (userConfig.start > userConfig.end) {
      res.status(400).send({
        message: "Start time cannot be after end time.",
      });
      return;
    } else if (userConfig.start < 0 || userConfig.start > MINUTES_IN_DAY) {
      res.status(400).send({
        message: "Start time cannot exceed the number of minutes in a day.",
      });
      return;
    } else if (userConfig.end < 0 || userConfig.end > MINUTES_IN_DAY) {
      res.status(400).send({
        message: "End time cannot exceed the number of minutes in a day.",
      });
      return;
    }
    for (let i = 0; i < userConfig.breaks.length; i++) {
      if (userConfig.breaks[i] > MAX_BREAK_DURATION) {
        res.status(400).send({
          message: `Breaks cannot be longer than ${MAX_BREAK_DURATION} minutes.`,
        });
        return;
      }
    }
    if (userConfig.blockSize > MAX_BLOCK_SIZE) {
      res.status(400).send({
        message: `Block size cannot be greater than ${MAX_BLOCK_SIZE} minutes.`,
      });
      return;
    }
    if (userConfig.interleaves < MIN_INTERLEAVES) {
      res.status(400).send({
        message: `Interleaves cannot be less than ${MIN_INTERLEAVES}.`,
      });
      return;
    }

    UserConfig.updateUserConfig(userId, dayOfWeek, userConfig, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "An error occurred while updating the user config.",
        });
      } else {
        if (!data) {
          res.status(404).send({
            message: `User needs to create user config`,
          });
          return;
        }
        res.status(204).send();
      }
    });
  },
};
