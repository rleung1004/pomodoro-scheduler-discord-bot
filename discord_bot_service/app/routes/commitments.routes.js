import express from "express";
var router = express.Router();
import {
  createCommitmentValidation,
  updateCommitmentValidation,
  validate,
} from "../utils/validators.js";
import { getUserConfig } from "../utils/getUserConfig.js";
import commitments from "../controllers/commitments.controller.js";

router.put(
  "/:userId",
  createCommitmentValidation,
  validate,
  getUserConfig,
  commitments.create
);
router.patch(
  "/:userId/:commitmentId",
  updateCommitmentValidation,
  validate,
  getUserConfig,
  commitments.update
);

export default router;
