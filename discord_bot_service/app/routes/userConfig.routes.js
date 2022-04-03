import express from "express";
var router = express.Router();
import {
  createUserConfigValidation,
  updateUserConfigValidation,
  validate,
} from "../utils/validators.js";
import userConfig from "../controllers/userConfigs.controller.js";
import { checkForExistingUserConfig } from "../utils/checkForExistingUserConfig.js";
import { updateSchedule } from "../utils/updateSchedule.js";

router.put(
  "/:userId",
  createUserConfigValidation,
  validate,
  checkForExistingUserConfig,
  userConfig.createUserConfig
);
router.patch(
  "/:userId/:dayOfWeek",
  updateUserConfigValidation,
  validate,
  userConfig.updateUserConfig,
  updateSchedule
);

export default router;