import { Auth } from "aws-amplify";
import express from "express";
import sql from "../models/db.js";
import getAll from "../controllers/requests.controller.js";

var router = express.Router();

router.post("/signup", function(req, res) {
    sql.query(
        'UPDATE request SET count = count + 1 WHERE route = "POST /users/signup";',
        (err, res) => {
            if (err) {
                throw err;
            }
        }
    );
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);

    Auth.signUp({
            username,
            password,
        })
        .then((user) => {
            console.log(user);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/signin", function(req, res, next) {
    sql.query(
        'UPDATE request SET count = count + 1 WHERE route = "POST /users/signin";',
        (err, res) => {
            if (err) {
                throw err;
            }
        }
    );

    let username = req.body.username;
    let password = req.body.password;

    Auth.currentAuthenticatedUser()
        .then(() => {
            const groups =
                user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups.includes("admin")) {
                getAll(req, res);
            }
        })
        .catch((err) => {
            Auth.signIn(username, password)
                .then((user) => {
                    console.log(user);
                    const groups =
                        user.signInUserSession.accessToken.payload["cognito:groups"];
                    if (groups.includes("admin")) {
                        getAll(req, res);
                    } else {
                        res.status(401).status({ message: "Unauthorized access" });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
});

router.post("/signout", function(req, res) {
    sql.query(
        'UPDATE request SET count = count + 1 WHERE route = "POST /users/signout";',
        (err, res) => {
            if (err) {
                throw err;
            }
        }
    );
    Auth.signOut()
        .then(() => {
            console.log("signout succcess");
        })
        .catch((err) => {
            console.log(err);
        });
});

export default router;