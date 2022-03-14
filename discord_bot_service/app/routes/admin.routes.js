import express from 'express';
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/admin.html');
})

export default router;