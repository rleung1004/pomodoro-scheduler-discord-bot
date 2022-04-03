import express from "express";
var router = express.Router();
import schedule from "../controllers/schedule.controller.js";

router.get("/:userId", schedule.getUserSchedule);

export default router;
