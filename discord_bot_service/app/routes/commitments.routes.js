import express from "express";
var router = express.Router();
import {
  createCommitmentValidation,
  updateCommitmentValidation,
  deleteCommitmentValidation,
  validate,
} from "../utils/validators.js";
import { getUserConfig } from "../utils/getUserConfig.js";
import commitments from "../controllers/commitments.controller.js";
import { checkCommitmentOwnership } from "../utils/checkOwnership.js";

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
  checkCommitmentOwnership,
  commitments.update
);
router.delete(
  "/:userId/:commitmentId",
  deleteCommitmentValidation,
  validate,
  checkCommitmentOwnership,
  commitments.delete
);

export default router;
