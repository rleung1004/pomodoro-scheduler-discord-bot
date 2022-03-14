import express from "express";
import cors from "cors";

const app = express();
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get("/", (req, res) => {
    res.json({ message: "hi there" })
});

require("./app/routes/commitment.routes.js")(app);
require("./app/routes/requests.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
});