/**
 * Piccolo script per le pagine login e register per
 * pulire tutti i campi input e per eliminare tutti i
 * messaggi di errore
 */ 

function clearInputs(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.value = "");

    const errorsContainer = document.getElementById("errors-container");
    if(errorsContainer != null)
        errorsContainer.innerHTML = "";
}