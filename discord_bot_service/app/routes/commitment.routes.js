import express from 'express';
var router = express.Router();
import commitments from "../controllers/commitment.controller.js";

router.post("/", commitments.create);
router.get("/", commitments.getAll);

export default router;