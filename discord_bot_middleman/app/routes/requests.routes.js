import getAll from "../controllers/requests.controller.js";
import express from "express";

var router = express.Router();

router.get("/", function (req, res) {
  getAll(req, res);
});

export default router;
