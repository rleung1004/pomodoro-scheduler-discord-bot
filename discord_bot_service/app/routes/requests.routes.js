import requests from "../controllers/requests.controller.js";
var router = express.Router();

router.get("/", requests.getAll);

export default router;