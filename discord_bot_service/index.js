import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./app/routes/users.routes.js";
import adminRoutes from "./app/routes/admin.routes.js";
import commitmentRoutes from "./app/routes/commitments.routes.js";
import requestRoutes from "./app/routes/requests.routes.js";
import scheduleRoutes from "./app/routes/schedule.routes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
Amplify.configure({ ...awsExports, ssr: true });

let app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const PORT = 9000;
const BASE_ROUTE = "/4537/API/V1";

const swaggerDocument = JSON.parse(
  await readFile(
    new URL("./resources/discord_bot_service.json", import.meta.url)
  )
);
// generate live API documentation using Swagger UI
app.use(
  BASE_ROUTE + "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(express.static(path.join(__dirname, "/public")));

app.use(`${BASE_ROUTE}/commitment`, commitmentRoutes);
app.use(`${BASE_ROUTE}/requests`, requestRoutes);
app.use(`${BASE_ROUTE}/users`, userRoutes);
app.use(`${BASE_ROUTE}/admin`, adminRoutes);
app.use(`${BASE_ROUTE}/schedule`, scheduleRoutes);
app.get(BASE_ROUTE, function (req, res) {
  res.sendFile(__dirname + "/public/admin.html");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
