import express from "express";
var router = express.Router();
import {
  getAllCommitmentsValidation,
  createCommitmentValidation,
  updateCommitmentValidation,
  deleteCommitmentValidation,
  validate,
} from "../utils/validators.js";
import { getUserConfig } from "../utils/getUserConfig.js";
import commitments from "../controllers/commitments.controller.js";
import { checkCommitmentOwnership } from "../utils/checkOwnership.js";
import { updateSchedule } from "../utils/updateSchedule.js";

router.get(
  "/:userId",
  getAllCommitmentsValidation,
  validate,
  commitments.getAllByUser
);

router.put(
  "/:userId",
  createCommitmentValidation,
  validate,
  getUserConfig,
  commitments.create,
  updateSchedule
);
router.patch(
  "/:userId/:commitmentId",
  updateCommitmentValidation,
  validate,
  getUserConfig,
  checkCommitmentOwnership,
  commitments.update,
  updateSchedule
);
router.delete(
  "/:userId/:commitmentId",
  deleteCommitmentValidation,
  validate,
  checkCommitmentOwnership,
  commitments.delete,
  updateSchedule
);

export default router;
