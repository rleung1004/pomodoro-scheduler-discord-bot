import express from 'express';
import sql from "./db.js";

var router = express.Router();

router.get('/', function(req, res) {
    sql.query('UPDATE requests SET count = count + 1 WHERE route = "/admin";', (err, res) => {
        if (err) {
            throw err;
        }
    })

    res.sendFile(__dirname + '/public/admin.html');
})

export default router;