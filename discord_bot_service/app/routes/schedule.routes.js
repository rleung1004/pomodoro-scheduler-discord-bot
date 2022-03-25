import express from 'express';
var router = express.Router();
import schedule from "../controllers/schedule.controller.js";

router.get("/", schedule.getUserSchedule);

export default router;