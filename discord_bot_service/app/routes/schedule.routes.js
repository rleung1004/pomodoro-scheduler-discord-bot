import express from "express";
var router = express.Router();
import schedule from "../controllers/schedule.controller.js";
import { incrementEndpointCount } from "../utils/incrementEndpointCount.js";

router.get("/:userId", incrementEndpointCount, schedule.getUserSchedule);

export default router;
