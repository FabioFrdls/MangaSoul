const API_LIB_URL = `http://localhost:8080/api/library`;

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
      let mangas = Array.isArray(data) ? data : data.content;

      if (!mangas || mangas.length === 0) {
        cardContainer.innerHTML = "<p class='center'>Nessun manga trovato.</p>";
        return;
      }

      mangas.forEach((manga) => {
        cardContainer.appendChild(createCard(manga));
      });
    })
    .catch((err) => console.error("Errore nella ricerca:", err));
}


      // getAll
function showCard() { 
  find(API_LIB_URL);
}


      // search
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
  let status = document.getElementById('status').value;
  let fav = document.getElementById('fav').value;
  find(`${API_LIB_URL}/filter?status=${encodeURIComponent(status)}&fav=${encodeURIComponent(fav)}`);
};



    // these methods are still to finish

    // update
function update(){
  let query;    // passare id manga
  let status;
  let fav;
  fetch(API_LIB_URL + `/id/${query}?status=${encodeURIComponent(status)}&fav=${encodeURIComponent(fav)}`,{
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("access-token"),
    },
  })
}

    // remove
function remove(){
  //.....
  fetch(API_LIB_URL + `/id/${query}`,{
    method: "DELETE",
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

}
    // starting method
window.onload = () => {
    showCard(); // charging all the manga in library
    let input = document.getElementById("search");
    // i add a listener so when i type, the function cardCreationByInput is called
    input.addEventListener("input", search);
  }