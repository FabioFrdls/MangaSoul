const URL_USER_API = "http://localhost:8080/api/user";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const errDiv = document.getElementById("errors-container");

  try {
    const response = await fetch(URL_USER_API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("access-token", token);
      errDiv.innerHTML = "";
      console.log("success");
      profile(username);
    } else {
      const errorData = await response.json();
      let text = `<div class="alert alert-danger" role="alert">${errorData.message} </div>`;

      errDiv.innerHTML = text;
    }
  } catch (error) {
    errDiv.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
    console.error("error while fetching the api:" + error);
  }
}

async function profile() {}

async function logout() {
  const token = localStorage("access-token");

  try {
    const response = await fetch(URL_USER_API + "/logout", {
      method: "POST",
      headers: {
        "access-token": token,
      },
    });
    if (response.ok) {
      localStorage.removeItem("access-token");
      window.location.href = "index.html";
    }
  } catch (error) {}
}

async function register() {
  const username = document.getElementById("new-username").value;
  const email = document.getElementById("new-email").value;
  const password = document.getElementById("new-password").value;

  const registerDiv = document.getElementById("register-container");
  const errDiv = document.getElementById("errors-container");

  try {
    const response = await fetch(URL_USER_API + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (response.ok) {
      console.log("utente registrato");
      errDiv.innerHTML = "";

      registerDiv.innerHTML = `<h2>Benvenuto ${username}</h2>
                <p class="mt-3">Clicca
                    <ahref="#" class="text-danger text-decoration-none" onclick="goToLogin()">qui</a>
                    per accedere
                </p>`;
    } else {
      const errorData = await response.json();
      let text = `<div class="alert alert-danger" role="alert">${errorData.message} </div>`;
      errDiv.innerHTML = text;
    }
  } catch (error) {
    errDiv.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
    console.error("error while fetching the api:" + error);
  }
}
