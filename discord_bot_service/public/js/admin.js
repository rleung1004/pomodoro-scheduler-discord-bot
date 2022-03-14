const endpoint = "http://localhost:3000/4537/API/V1/";
let loggedIn = false;

$('document').ready(function() {

    $('#loginButton').click(function() {

        setTimeout(function() {

            $(".page-transition").velocity("fadeIn", {
                queue: false
            });

        }, 100);

        $('.page-transition').velocity({
            scale: "10000%",
            translateZ: 0
        }, {
            duration: 500,
            complete: function() {
                let username = document.getElementById('login-username').value;
                let password = document.getElementById('login-password').value;
                signin(username, password);
            }

        })

    })

    $('#signupButton').click(function() {

        setTimeout(function() {

            $(".page-transition").velocity("fadeIn", {
                queue: false
            });

        }, 100);

        $('.page-transition').velocity({
            scale: "10000%",
            translateZ: 0
        }, {
            duration: 500,
            complete: function() {
                let username = document.getElementById('username').value;
                let password = document.getElementById('password').value;
                signup(username, password);
            }

        })

    })

    $('#showLogin').click(function() {

        $(".signup").velocity({
            scale: "65%",
            translateZ: 0
        }, {
            duration: 400,
            easing: "easeInOutBack",
            complete: function() {

                $(".login").velocity({
                    scale: "100%",
                    translateZ: 0
                }, { duration: 400, easing: "easeInOutBack" });

                setTimeout(function() {

                    $(".login").velocity("fadeIn", {
                        queue: false,
                        duration: 150
                    });

                }, 150);


            }
        });

        setTimeout(function() {

            $(".signup").velocity("fadeOut", {
                queue: false,
                duration: 150
            });

        }, 150);

    });

    $('#showSignUp').click(function() {

        $(".signup").velocity({
            scale: "65%",
            translateZ: 0
        });

        $(".login").velocity({
            scale: "65%",
            translateZ: 0
        }, {
            duration: 400,
            easing: "easeInOutBack",
            complete: function() {

                $(".signup").velocity({
                    scale: "100%",
                    translateZ: 0
                }, { duration: 400, easing: "easeInOutBack" });

                setTimeout(function() {

                    $(".signup").velocity("fadeIn", {
                        queue: false,
                        duration: 150
                    });

                }, 150);


            }
        });

        setTimeout(function() {

            $(".login").velocity("fadeOut", {
                queue: false,
                duration: 150
            });

        }, 150);

    });

});

function signin(username, password) {
    fetch(endpoint + "users/signin", {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'text/plain;charset=UTF-8',
            },
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Could not sign in");
            }
            return res.json();
        })
        .then(res => {
            const myNode = document.getElementById("body");
            myNode.innerHTML = JSON.stringify(res);;
            for (let keys in res) {
                const div = document.createElement("div");
                div.innerText = res[keys].title;
                document.body.appendChild(div);
            }
        })
        .catch(err => { console.error(err) })
}

function signup(username, password) {
    fetch(endpoint + "users/signup", {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'text/plain;charset=UTF-8',
            },
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("error loggin in")
            }
        })
        .catch(err => { console.log(err) });
}