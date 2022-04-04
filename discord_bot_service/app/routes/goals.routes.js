import express from "express";
var router = express.Router();
import {
  getAllGoalsValidation,
  createGoalValidation,
  updateGoalValidation,
  deleteGoalValidation,
  validate,
} from "../utils/validators.js";
import { checkGoalOwnership } from "../utils/checkOwnership.js";
import goals from "../controllers/goals.controller.js";
import { getUserConfig } from "../utils/getUserConfig.js";
import { updateSchedule } from "../utils/updateSchedule.js";
import { incrementEndpointCount } from "../utils/incrementEndpointCount.js";

router.get(
  "/:userId",
  incrementEndpointCount,
  getAllGoalsValidation,
  validate,
  goals.getAllByUser
);
router.put(
  "/:userId",
  incrementEndpointCount,
  createGoalValidation,
  validate,
  goals.create,
  updateSchedule
);
router.patch(
  "/:userId/:goalId",
  incrementEndpointCount,
  updateGoalValidation,
  validate,
  getUserConfig,
  checkGoalOwnership,
  goals.update,
  updateSchedule
);
router.delete(
  "/:userId/:goalId",
  incrementEndpointCount,
  deleteGoalValidation,
  validate,
  checkGoalOwnership,
  goals.delete,
  updateSchedule
);

export default router;
