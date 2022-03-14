import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports.js";
import { Auth } from 'aws-amplify';
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';
import userRoutes from "./app/routes/users.routes.js";
import commitmentRoutes from "./app/routes/commit.routes.js";
import requestRoutes from "./app/routes/request.routes.js";
import adminRoutes from "./app/routes/admin.routes.js";


const __filename = fileURLToPath(
    import.meta.url);

const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;
const BASE_ROUTE = "/4537/API/V1"

Amplify.configure({...awsExports });
Auth.configure({...awsExports });


let app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')))


app.use(`${BASE_ROUTE}/commitment`, commitmentRoutes);
app.use(`${BASE_ROUTE}/requests`, requestRoutes);
app.use(`${BASE_ROUTE}/users`, userRoutes);
app.use(`${BASE_ROUTE}/admin`, adminRoutes);
app.get(BASE_ROUTE, function(req, res) {
    res.sendFile(__dirname + '/public/admin.html');
});

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
});