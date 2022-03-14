import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports.cjs";
import { Auth } from 'aws-amplify';
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

const __filename = fileURLToPath(
    import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

Amplify.configure({...awsExports, ssr: true });


let app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
const BASE_ROUTE = "/4537/API/V1"

app.use(express.static(path.join(__dirname, '/public')))

app.use(`${BASE_ROUTE}/users`, userRoutes);
app.use(`${BASE_ROUTE}/admin`, adminRoutes);
app.get(BASE_ROUTE, function(req, res) {
    res.sendFile(__dirname + '/public/admin.html');
});

app.listen(PORT);