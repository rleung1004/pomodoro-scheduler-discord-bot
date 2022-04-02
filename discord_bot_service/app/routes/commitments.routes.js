import express from "express";
var router = express.Router();
import {
  createCommitmentValidation,
  updateCommitmentValidation,
  validate,
} from "../utils/validators";
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
