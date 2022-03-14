import express from "express";
import sql from "../models/db.js";

import path from "path";
import { fileURLToPath } from "url";
var router = express.Router();

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

router.get("/", function (req, res) {
  sql.query(
    'UPDATE request SET count = count + 1 WHERE route = "/admin";',
    (err, res) => {
      if (err) {
        throw err;
      }
    }
  );

  res.sendFile(path.resolve(__dirname + "../../../public/admin.html"));
});

export default router;
