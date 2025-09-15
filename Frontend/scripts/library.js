const API_LIB_URL = `http://localhost:8080/api/library`;

      // getAll manga, not cards
function getAll(){
    cardContainer.innerHTML = "";
  fetch(API_LIB_URL,{
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("access-token"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      let mangas = Array.isArray(data) ? data : data.content;

      if (!mangas || mangas.length === 0) {
        cardContainer.innerHTML = "<p class='center'>Nessun manga trovato.</p>";
        return;
      }
      return mangas;
    })
    .catch((err) => console.error("Errore nella ricerca:", err));
}



// fetch logic for getters
function find(url){
  cardContainer.innerHTML = "";
  fetch(url ,{
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("access-token"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      let library = Array.isArray(data) ? data : data.content;

      if (!library || library.length === 0) {
        cardContainer.innerHTML = "<p class='center'>Nessun manga trovato.</p>";
        return;
      }
      library.forEach((lib) => {
        cardContainer.appendChild(createCard(lib));    
    })
  })
  .catch((err) => console.error("Errore nella ricerca:", err));
}


      // getAll
function showCard() { 
  find(API_LIB_URL);
}


      // search by name
function search() {
  let input = document.getElementById("search");
  let query = input.value.trim();
  if (query === "") {
    showCard();
    return;
  }
  find(API_LIB_URL + `/key/${query}`);
}

    // filter
function filter() {
  const status = document.getElementById('status').value;
  const fav = document.getElementById('fav').value;
  find(`${API_LIB_URL}/filter?status=${encodeURIComponent(status)}&fav=${encodeURIComponent(fav)}`);
};


    // starting method
window.onload = () => {  
  showCard(); // charging all the manga in library
    let input = document.getElementById("search");
    input.addEventListener("input", search);
  }