/**
 * Questo script mi serve per mostrare all'user loggato
 * le sue cose nella navbar, e all'user non loggato la possibilità di creare
 * un nuovo account o loggarsi
 *
 */

function checkAuthNavbar() {
  const token = localStorage.getItem("access-token");
  const type = localStorage.getItem("user-type");

  const guestLogin = document.getElementById("guestLogin");
  const guestRegister = document.getElementById("guestRegister");
  const userProfile = document.getElementById("userProfile");
  const libraryNavItem = document.getElementById("libraryNavItem");
  const adminDashboard = document.getElementById("adminDashboard");

  guestLogin.style.display = "none";
  guestRegister.style.display = "none";
  userProfile.style.display = "none";
  libraryNavItem.style.display = "none";
  adminDashboard.style.display = "none";

  if (token && type === "user") {
    guestLogin.style.display = "none";
    guestRegister.style.display = "none";
    userProfile.style.display = "block";
    libraryNavItem.style.display = "block";
  } else if (token && type === "admin") {
    // Admin loggato
    guestLogin.style.display = "none";
    guestRegister.style.display = "none";
    userProfile.style.display = "block";
    adminDashboard.style.display = "block";
    libraryNavItem.style.display = "none";
  } else {
    // Utente non loggato
    guestLogin.style.display = "block";
    guestRegister.style.display = "block";
    userProfile.style.display = "none";
    libraryNavItem.style.display = "none";
    adminDashboard.style.display = "none";
  }
}

// viene eseguito da index.html non appena il dom viene caricato
document.addEventListener("DOMContentLoaded", checkAuthNavbar);
