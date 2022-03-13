let Amplify, { Auth } = require('aws-amplify');
var express = require('express');
var router = express.Router();

router.post('/signup', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const { user } = Auth.signUp({
            username,
            password
        });
        console.log(user);
    } catch (error) {
        res.send('error signing up: ' + error);
    }
});


router.post('/signin', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const user = Auth.signIn(username, password);
        console.log(user);
    } catch (error) {
        res.send('error signing in: ' + error);
    }
})

router.post('/signout', function(req, res) {
    try {
        Auth.signOut();
    } catch (error) {
        res.send('error signing out: ' + error);
    }
})

module.exports = router;