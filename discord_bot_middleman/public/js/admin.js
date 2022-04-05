const endpoint = "https://pomodoro.ryanleung.ca/4537/API/V1/";
let loggedIn = false;

$("document").ready(function () {
  $("#loginButton").click(function () {
    setTimeout(function () {
      $(".page-transition").velocity("fadeIn", {
        queue: false,
      });
    }, 100);

    $(".page-transition").velocity(
      {
        scale: "10000%",
        translateZ: 0,
      },
      {
        duration: 500,
        complete: function () {
          let username = document.getElementById("login-username").value;
          let password = document.getElementById("login-password").value;
          signin(username, password);
        },
      }
    );
  });

  $("#signupButton").click(function () {
    setTimeout(function () {
      $(".page-transition").velocity("fadeIn", {
        queue: false,
      });
    }, 100);

    $(".page-transition").velocity(
      {
        scale: "10000%",
        translateZ: 0,
      },
      {
        duration: 500,
        complete: function () {
          let username = document.getElementById("username").value;
          let password = document.getElementById("password").value;
          signup(username, password);
        },
      }
    );
  });

  $("#showLogin").click(function () {
    $(".signup").velocity(
      {
        scale: "65%",
        translateZ: 0,
      },
      {
        duration: 400,
        easing: "easeInOutBack",
        complete: function () {
          $(".login").velocity(
            {
              scale: "100%",
              translateZ: 0,
            },
            { duration: 400, easing: "easeInOutBack" }
          );

          setTimeout(function () {
            $(".login").velocity("fadeIn", {
              queue: false,
              duration: 150,
            });
          }, 150);
        },
      }
    );

    setTimeout(function () {
      $(".signup").velocity("fadeOut", {
        queue: false,
        duration: 150,
      });
    }, 150);
  });

  $("#showSignUp").click(function () {
    $(".signup").velocity({
      scale: "65%",
      translateZ: 0,
    });

    $(".login").velocity(
      {
        scale: "65%",
        translateZ: 0,
      },
      {
        duration: 400,
        easing: "easeInOutBack",
        complete: function () {
          $(".signup").velocity(
            {
              scale: "100%",
              translateZ: 0,
            },
            { duration: 400, easing: "easeInOutBack" }
          );

          setTimeout(function () {
            $(".signup").velocity("fadeIn", {
              queue: false,
              duration: 150,
            });
          }, 150);
        },
      }
    );

    setTimeout(function () {
      $(".login").velocity("fadeOut", {
        queue: false,
        duration: 150,
      });
    }, 150);
  });
});

function signin(username, password) {
  fetch(endpoint + "users/signin", {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "text/plain;charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not sign in");
      }
      return res.json();
    })
    .then((res) => {
      jwt = res.jwtToken;
      console.log(jwt);
      res = res.data;
      const body = document.getElementById("body");
      body.innerHTML = "<div id='container'></div>"
      let table = document.createElement('table');

      let tr = document.createElement('tr');   

      let td1 = document.createElement('td');
      let td2 = document.createElement('td');

      let text1 = document.createTextNode("Route");
      let text2 = document.createTextNode("Count");

      td1.appendChild(text1);
      td2.appendChild(text2);
      tr.appendChild(td1);
      tr.appendChild(td2);

      table.appendChild(tr);
      
      for (const [_, element] of res.entries()) {
        let tr = document.createElement('tr');   

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');

        let text1 = document.createTextNode(element.route);
        let text2 = document.createTextNode(element.count);

        td1.appendChild(text1);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
      }
      document.getElementById('container').appendChild(table);

      if(document.body != null){
        table.appendChild(document.createElement('br'));
        document.body.appendChild(table);

        // JWT token div
        jwtDiv = document.createElement('textarea');
        jwtDiv.innerHTML = jwt;
        document.body.appendChild(jwtDiv);

        // JWT heading
        tokenHeading = document.createElement('div');
        tokenHeading.innerHTML = 'JWT Token';
        document.body.appendChild(tokenHeading);
    }
         
      
    })
    .catch((err) => {
      console.error(err);
    });
}

function signup(username, password) {
  fetch(endpoint + "users/signup", {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "text/plain;charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("error loggin in");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
