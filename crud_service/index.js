const express = require('express');
const app = express();
const PORT = 8888;

app.use(express.json);

// app.listen(
//     PORT,
//     () => console.log(`running on http://localhost:${PORT}`)
// );

app.get('/users', (req, res) => {
    res.status(200).send({
        user1: 'Duncan',
        user2: 'Steve'
    })
});

app.get('/:user/schedule', (req, res) => {
    const {user} = req.params;
    res.status(200).send()
});

app.post('/users/:user', (req, res) => {
    const {user} = req.params;
    const {userDetails} = req.body;

    if (!userDetails) {
        res.status(418).send( { message: "Need user details"})
    };

    res.send({
       user: `${user}: ${userDetails}`
    })
});