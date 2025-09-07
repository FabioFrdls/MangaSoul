const cardContainer = document.getElementById("cardContainer");
const API_MANGA_URL = "http://localhost:8080/api/manga";

// function for creating a card given a manga object
function createCard(manga) {
  let card = document.createElement("div");
  card.classList.add("card");

  let img = document.createElement("img");
  img.src = manga.image;
  img.alt = manga.title;

  let title = document.createElement("h3");
  title.textContent = manga.title;

  let author = document.createElement("p");
  author.textContent = "Autore: " + manga.author.full_name;

  let button = document.createElement("button"); // in all the part like this i create element and give details
  button.textContent = "info";
  button.classList.add("modalButton");
  button.addEventListener("click", () => {
    openModel(manga);
  });

  card.append(img, title, author, button); // in this part i m giving the card all the info

  return card; // i return the card to be appended
}

function deploymentCard() {
  cardContainer.innerHTML = ""; //we make that there is space for new element
  fetch(API_MANGA_URL + "/find")
    .then((response) => response.json()) //i receive the json
    .then((mangas) => {
      //i use the json as array
      mangas.forEach((manga) => {
        // find all the element of the array
        cardContainer.appendChild(createCard(manga)); // giving the card to the html made div
      });
    })
    .catch((err) => console.error("Errore nel fetch:", err));
}

window.onload = () => {
  //charging all the card on the start of the website
  deploymentCard();

  let input = document.getElementById("search");

  // i add a listener so when i type, the function cardCreationByInput is called
  input.addEventListener("input", cardCreationByInput);
};

function cardCreationByInput() {
  let input = document.getElementById("search");
  let query = input.value.trim();
  cardContainer.innerHTML = "";

  if (query === "") {
    deploymentCard();
    return;
  }

  fetch(API_MANGA_URL + "/findWkeyWords?keywords=" + encodeURIComponent(query))
    .then((response) => response.json())
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
