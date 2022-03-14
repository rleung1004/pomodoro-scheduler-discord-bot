import { Auth } from 'aws-amplify';
import express from 'express';
import sql from "./db.js";

var router = express.Router();

const BASE_ROUTE = "/4537/API/V1"

router.post('/signup', function(req, res) {
    sql.query('UPDATE requests SET count = count + 1 WHERE route = "/users/signup";', (err, res) => {
        if (err) {
            throw err;
        }
    })
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);

    Auth.signUp({
        username,
        password
    }).then(user => {
        console.log(user);
    }).catch(err => {
        console.log(err);
    });
});


router.post('/signin', function(req, res, next) {
    sql.query('UPDATE requests SET count = count + 1 WHERE route = "/users/signin";', (err, res) => {
        if (err) {
            throw err;
        }
    })

    let username = req.body.username;
    let password = req.body.password;

    Auth.currentAuthenticatedUser()
        .then(() => {
            res.redirect(307, `/admin`);
            next();
        }).catch(err => {
            Auth.signIn(username, password)
                .then(user => {
                    console.log(user);
                    res.redirect(`${BASE_ROUTE}/admin`);
                }).catch(err => {
                    console.log(err);
                });
        });

})

router.post('/signout', function(req, res) {
    sql.query('UPDATE requests SET count = count + 1 WHERE route = "/users/signout";', (err, res) => {
        if (err) {
            throw err;
        }
    })
    Auth.signOut()
        .then(() => { console.log('signout succcess'); }).catch(err => { console.log(err); });
})

export default router;
