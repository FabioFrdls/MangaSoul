/**
 * Questo script mi serve per mostrare all'user loggato
 * le sue cose, e all'user non loggato la possibilità di creare
 * un nuovo account e loggarsi
 *
 */

function checkAuthNavbar() {
  const token = localStorage.getItem("access-token");

  const guestLogin = document.getElementById("guestLogin");
  const guestRegister = document.getElementById("guestRegister");
  const userProfile = document.getElementById("userProfile");

  if (token) {
    // Utente loggato
    guestLogin.style.display = "none";
    guestRegister.style.display = "none";
    userProfile.style.display = "block";
  } else {
    // Utente non loggato
    guestLogin.style.display = "block";
    guestRegister.style.display = "block";
    userProfile.style.display = "none";
  }
}

// viene eseguito da index.html non appena il dom viene caricato
document.addEventListener("DOMContentLoaded", checkAuthNavbar);