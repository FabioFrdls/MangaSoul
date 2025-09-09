document.addEventListener("DOMContentLoaded", () => {
  displayCustomMessage();
});


function displayCustomMessage() {
  const message = document.getElementById("welcome-message");
  const username = localStorage.getItem("username");

  console.log(username);

  if(username !== null){
      message.textContent = "Ciao " + username;
  }
  else{
    message.textContent = "Benvenuto su Manga Soul";
  }

}