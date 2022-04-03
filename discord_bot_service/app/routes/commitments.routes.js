import express from "express";
var router = express.Router();
import { body, param } from "express-validator";
import {
  createCommitmentValidation,
  updateCommitmentValidation,
  validate,
} from "../utils/validators.js";
import commitments from "../controllers/commitments.controller.js";

router.put(
  "/:userId",
  createCommitmentValidation,
  validate,
  commitments.create
);
router.patch(
  "/:userId/:commitmentId",
  updateCommitmentValidation,
  validate,
  commitments.update
);

export default router;
