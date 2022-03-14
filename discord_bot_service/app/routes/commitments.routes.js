import express from 'express';
var router = express.Router();
import commitments from "../controllers/commitments.controller.js";

router.post("/", commitments.create);
router.get("/", commitments.getAll);

export default router;