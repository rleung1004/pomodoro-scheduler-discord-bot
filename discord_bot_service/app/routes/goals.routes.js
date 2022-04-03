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

router.put("/:userId", createGoalValidation, validate, goals.create);
router.patch(
  "/:userId/:goalId",
  updateGoalValidation,
  validate,
  getUserConfig,
  checkGoalOwnership,
  goals.update
);
router.delete(
  "/:userId/:goalId",
  deleteGoalValidation,
  validate,
  checkGoalOwnership,
  goals.delete
);

export default router;
