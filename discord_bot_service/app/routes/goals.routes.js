import express from "express";
var router = express.Router();
import {
  createGoalValidation,
  updateGoalValidation,
  validate,
} from "../utils/validators.js";
import goals from "../controllers/goals.controller.js";

router.put("/:userId", createGoalValidation, validate, goals.create);
router.patch("/:userId/:goalId", updateGoalValidation, validate, goals.update);

export default router;
