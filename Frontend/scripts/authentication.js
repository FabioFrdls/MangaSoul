const URL_USER_API = "http://localhost:8080/api/user";


// Funzione per effettuare il login
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errDiv = document.getElementById("errors-container");

  try {
    const response = await fetch(URL_USER_API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      
      localStorage.setItem("access-token", data.token);
      localStorage.setItem("user-type", data.type);
      localStorage.setItem("username", data.username);
      
      errDiv.innerHTML = "";

      if (data.type === "admin") {
        profile("admin.html");
      } else {
        profile("index.html");
      }

    } else {
      const errorData = await response.json();
      errDiv.innerHTML = `<div class="alert alert-danger" role="alert">${errorData.message}</div>`;
    }

  } catch (error) {
    errDiv.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
    console.error("error while fetching the api:" + error);
  }
}


// funzione per effettuare il logout
async function logout() {
  const token = localStorage.getItem("access-token");

  try {
    await fetch(URL_USER_API + "/logout", {
      method: "POST",
      headers: { "access-token": token },
    });
  } catch (error) {
    console.error("errore nel fetch logout: " + error);
  } finally {
    
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-type");
    localStorage.removeItem("username");
    window.location.href = "index.html";
  }
}

// ------------------------------------------------------------------------------------------------
// funzione per la registrazione di un nuovo utente
async function register() {

  // prende tutti i dati dagli input
  const username = document.getElementById("new-username").value;
  const email = document.getElementById("new-email").value;
  const password = document.getElementById("new-password").value;

  // prende il container del form e quello degli errori
  const registerDiv = document.getElementById("register-container");
  const errDiv = document.getElementById("errors-container");

  try {
    const response = await fetch(URL_USER_API + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    // se la registrazione avviene con successo:
    // sovrascrive il container della registrazione con un messaggio di benvenuto
    if (response.ok) {
      console.log("utente registrato");
      errDiv.innerHTML = "";
      registerDiv.innerHTML = 
          `<h2>Benvenuto ${username}</h2>
              <p class="mt-3">Clicca
                <a class="text-danger text-decoration-none" href="login.html">qui</a>
                per accedere 
              </p>`;
    } else {
      // altrimenti mostra a schermo errori personalizzati
      const errorData = await response.json();
      if (errorData.errors) {
        let htmlErrors = "";
        for (const field in errorData.errors) {
          htmlErrors += `<div>${errorData.errors[field]}</div>`;
        }
        errDiv.innerHTML = `<div class="alert alert-danger" role="alert">${htmlErrors}</div>`;
      } else if (errorData.message) {
        errDiv.innerHTML = `<div class="alert alert-danger" role="alert">${errorData.message}</div>`;
      } else {
        errDiv.innerHTML = `<div class="alert alert-danger" role="alert">Errore sconosciuto</div>`;
      }
    }
  } catch (error) {
    // Errore fetch
    errDiv.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
    console.error("error while fetching the api:" + error);
  }
}



// Funzione per entrare nel profilo
async function profile(redirectUrl) {
  const token = localStorage.getItem("access-token");
  if (!token) {
    clearCookies();
    return;
  }

  try {
    const response = await fetch(URL_USER_API + "/profile", {
      method: "GET",
      headers: { "access-token": token },
    });

    if (response.ok) {
      window.location.href = redirectUrl; 
    } else {
      clearCookies();
    }
  } catch (error) {
    console.error("Errore nel fetch profile: ", error);
    clearCookies();
  }
}



/**
 * Funzione che pulisce i cookie 
 */
function clearCookies(){
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-type");
    localStorage.removeItem("username");
    window.location.href= "index.html";
}