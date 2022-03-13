const express = require('express');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
const BASE_ROUTE = "/4537/API/V1"

let userRoutes = require('./routes/users.js');
let adminRoutes = require('./routes/admin.js');

app.use(`${BASE_ROUTE}/users`, userRoutes);
app.use(`${BASE_ROUTE}/admin`, adminRoutes);
app.get(BASE_ROUTE, function(req, res) {
    res.send('server started');
});

app.listen(PORT);