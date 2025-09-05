/**
 * Piccolo script per la pagina login.html per
 * switchare tra form di login e form di
 * registrazione
 */ 

const loginDiv = document.getElementById("login-container");
const registerDiv = document.getElementById("register-container");

function goToRegister() {
    clearInputs();
    loginDiv.classList.add("d-none");       
    registerDiv.classList.remove("d-none"); 
}

function goToLogin() {
    clearInputs();
    registerDiv.classList.add("d-none");    
    loginDiv.classList.remove("d-none");    
}


function clearInputs(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.value = "");

    document.getElementById("errors-container").innerHTML = "";
}