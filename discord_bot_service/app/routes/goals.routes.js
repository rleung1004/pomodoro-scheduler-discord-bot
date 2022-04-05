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
import { authorizer } from "../utils/auth.js";

router.get(
  "/:userId",
  incrementEndpointCount,
  authorizer,
  getAllGoalsValidation,
  validate,
  goals.getAllByUser
);
router.put(
  "/:userId",
  incrementEndpointCount,
  authorizer,
  createGoalValidation,
  validate,
  goals.create,
  updateSchedule
);
router.patch(
  "/:userId/:goalId",
  incrementEndpointCount,
  authorizer,
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
  authorizer,
  deleteGoalValidation,
  validate,
  checkGoalOwnership,
  goals.delete,
  updateSchedule
);

export default router;
