import express from "express";
var router = express.Router();
import {
  createGoalValidation,
  updateGoalValidation,
  deleteGoalValidation,
  validate,
} from "../utils/validators.js";
import { checkGoalOwnership } from "../utils/checkOwnership.js";
import goals from "../controllers/goals.controller.js";
import { getUserConfig } from "../utils/getUserConfig.js";
import { updateSchedule } from "../utils/updateSchedule.js";

router.put(
  "/:userId",
  createGoalValidation,
  validate,
  goals.create,
  updateSchedule
);
router.patch(
  "/:userId/:goalId",
  updateGoalValidation,
  validate,
  getUserConfig,
  checkGoalOwnership,
  goals.update,
  updateSchedule
);
router.delete(
  "/:userId/:goalId",
  deleteGoalValidation,
  validate,
  checkGoalOwnership,
  goals.delete,
  updateSchedule
);

export default router;
