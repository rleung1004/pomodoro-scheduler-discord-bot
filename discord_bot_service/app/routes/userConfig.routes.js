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
import { incrementEndpointCount } from "../utils/incrementEndpointCount.js";
import { authorizer } from "../utils/auth.js";

router.put(
  "/:userId",
  incrementEndpointCount,
  authorizer,
  createUserConfigValidation,
  validate,
  checkForExistingUserConfig,
  userConfig.createUserConfig
);
router.patch(
  "/:userId/:dayOfWeek",
  incrementEndpointCount,
  authorizer,
  updateUserConfigValidation,
  validate,
  userConfig.updateUserConfig,
  updateSchedule
);

export default router;
