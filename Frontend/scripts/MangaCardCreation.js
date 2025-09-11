const MangaLink = "http://localhost:8080/api/manga";
const GenresLink = "http://localhost:8080/api/genres"
const genreBox = document.getElementById("genresBox");
const reviewLink = "http://localhost:8080/api/review";
let scoreFiltredHigh = false;
let scoreFiltreLow = false;
let genresFiltred = false;
let authorFiltred = false;
let scoreBox = document.getElementById("scorebtn");
let scorebtnClickedTime = 0;
let cardContainer = document.getElementById("cardContainer"); // html made div
let authorBox = document.getElementById("authorSearch"); // i get the input element
//function for getting all genres
function deployGenres() {
  fetch(GenresLink + "/get")
    .then(response => response.json())
    .then(genres => {
      genreBox.innerHTML = "";


      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- nessuno --";
      genreBox.appendChild(defaultOption);


      genres.forEach(genre => {
        let option = document.createElement("option");
        option.value = genre.name;
        option.textContent = genre.name;
        genreBox.appendChild(option);
      });
    })
    .catch(err => console.error("Errore nel caricamento generi:", err));
}

// function for creating a card given a manga object
function createCard(manga) {
  let card = document.createElement("div"); // in all the part like this i create element and give details
  card.classList.add("card");
  let favorite = document.createElement("span");
  favorite.classList.add("favorite");
  favorite.textContent = "♡"

  let img = document.createElement("img");
  img.src = manga.image;
  img.alt = manga.title;

  let title = document.createElement("h3");
  title.textContent = manga.title;

  // let year = document.createElement("p");
  // year.textContent = "Anno d'uscita: " + manga.year;

  let author = document.createElement("p");
  author.textContent = "Autore: " + manga.author.full_name;

  // let editor = document.createElement("p");
  // editor.textContent = "Pubblicazione italiana: " + manga.editor_name;

  // let volumes = document.createElement("p");
  // volumes.textContent = "Numeri volumi: " + manga.volumes;

  // let status = document.createElement("p");
  // status.textContent = "Stato: " + manga.status;

  card.addEventListener("click", (e) => {
    if (e.target.matches(".favorite")) {
      return;
    }
    openMangaDetails(manga)
  })


  card.append(img, title, author, favorite); // in this part i m giving the card all the info

  return card; // i return the card to be appended
}

// function to deploy all cards
function deploymentCard() {
  cardContainer.innerHTML = ""; // we make that there is space for new element
  fetch(MangaLink + "/find")
    .then(response => response.json()) // i receive the json
    .then(mangas => { // i use the json as array
      originalMangas = mangas;
      if (genresFiltred) {
        mangas = mangas.filter(manga =>
          manga.genres.some(g => g.name === genreBox.value)
        );
      }
      if (authorFiltred && authorBox.value.trim() !== "") {
        mangas = mangas.filter(manga =>
          manga.author.full_name.toLowerCase().includes(authorBox.value.trim().toLowerCase())
        );
      }
      if (scoreFiltreLow) {
        mangas = mangas.sort((a, b) => a.score - b.score);
      }
      if (scoreFiltredHigh) {
        mangas = mangas.sort((a, b) => b.score - a.score)
      }

      mangas.forEach(manga => { // find all the element of the array
        cardContainer.appendChild(createCard(manga)); // giving the card to the html made div 
      });
    })
    .catch(err => console.error("Errore nel fetch:", err));
}

// function to deploy cards on input
function cardCreationByInput() {
  let input = document.getElementById("search"); // i get the input element
  let query = input.value.trim().toLowerCase(); // i take the value of the input
  cardContainer.innerHTML = ""; // i clear the container

  if (query === "") {
    deploymentCard(); // if there is no input it deploy all the card
    return; // i stop the function
  }

  fetch(MangaLink + "/findWkeyWords?keywords=" + encodeURIComponent(query)) // i call the endpoint with query param
    .then(response => response.json())
    .then(mangas => {
      if (mangas.length === 0) {
        cardContainer.innerHTML = "<p>Nessun manga trovato.</p>"; // verify if there is something that match input
        return;
      }
      if (genresFiltred) {
        mangas = mangas.filter(manga =>
          manga.genres.some(g => g.name === genreBox.value)
        );
      }
      if (authorFiltred && authorBox.value.trim() !== "") {
        mangas = mangas.filter(manga =>
          manga.author.full_name.toLowerCase().includes(authorBox.value.trim().toLowerCase())
        );
      }

      mangas.forEach(manga => { // find all the element of the array
        cardContainer.appendChild(createCard(manga)); // giving the card to the html made div 
      });
    })
    .catch(err => console.error("Errore nella ricerca:", err));
}
function cardCreationByAuthorInput() {
  let input = document.getElementById("authorSearch"); // i get the input element
  let query = input.value.trim(); // i take the value of the input
  cardContainer.innerHTML = ""; // i clear the container

  if (query === "") {
    deploymentCard(); // if there is no input it deploy all the card
    return; // i stop the function
  }

  fetch(MangaLink + "/authorInput?keywords=" + encodeURIComponent(query)) // i call the endpoint with query param
    .then(response => response.json())
    .then(mangas => {
      if (mangas.length === 0) {
        cardContainer.innerHTML = "<p>Nessun manga trovato.</p>"; // verify if there is something that match input
        return;
      }
      if (genresFiltred) {
        mangas = mangas.filter(manga =>
          manga.genres.some(g => g.name === genreBox.value)
        );
      }

      mangas.forEach(manga => { // find all the element of the array
        cardContainer.appendChild(createCard(manga)); // giving the card to the html made div 
      });
    })
    .catch(err => console.error("Errore nella ricerca:", err));
}

// this is needed for postReview
let currentMangaId = null;
//for the opening of the dynamic page
function openMangaDetails(manga) {

  const params = new URLSearchParams({
    id: manga.id,
    title: manga.title,
    summary: manga.summary,
    year: manga.year,
    image: manga.image,
    volumes: manga.volumes,
    editor: manga.editor_name,
    score: manga.score,
    status: manga.status,
    author: manga.author.full_name,
    genres: JSON.stringify(manga.genres)
  }).toString();
  window.open("MangaDetails.html?" + params, "_blank")
}
// function to open modal with details
function openModel(manga) {

  // openModel stores manga id so that backend Post method can know which manga it is
  currentMangaId = manga.id;

  console.log(manga);
  let modal = document.getElementById("modal");
  let closeButton = document.getElementById("closeButton");

  let img = document.getElementById("mangaImage");
  img.src = manga.image;
  img.alt = manga.title;

  let title = document.getElementById("mangaTitle");
  title.textContent = manga.title;

  let summary = document.getElementById("mangaSummaryBody");
  summary.textContent = manga.summary;

  let genr = document.getElementById("mangaGenresBody");
  genr.textContent = manga.genres.map(g => g.name).join(", ");

  let year = document.getElementById("mangaYearBody");
  year.textContent = manga.year;

  let author = document.getElementById("mangaAuthorBody");
  author.textContent = manga.author.full_name;

  let editor = document.getElementById("mangaEditorBody");
  editor.textContent = manga.editor_name;

  let volumes = document.getElementById("mangaVolumesBody");
  volumes.textContent = manga.volumes;

  let status = document.getElementById("mangaStatusBody");
  status.textContent = manga.status;

  let score = document.getElementById("mangaScoreBody");
  score.textContent = manga.score;

  modal.style.display = "flex";
  closeButton.onclick = () => {
    modal.style.display = "none";
  };
}


// run on load
window.onload = () => {
  deploymentCard(); // charging all the card on the start of the website
  let input = document.getElementById("search");
  input.addEventListener("input", () => {
    cardCreationByInput();
  });

  let inputOffAuthor = document.getElementById("authorSearch")
  // i add a listener so when i type, the function cardCreationByInput is called
  deployGenres();
  inputOffAuthor.addEventListener("input", () => {
    if (authorBox.value !== "") {
      authorFiltred = true;
      cardCreationByAuthorInput()
      return;
    }
    authorFiltred = false;
    deploymentCard();
  }
  )
  
  // SUBMIT 
    // document.getElementById("reviewForm").addEventListener("submit", function (event) {
    //   event.preventDefault(); // prevent page reload
    //   postReview();
    // });


};
scoreBox.addEventListener("click", () => {
  if (scorebtnClickedTime === 0) {
    scorebtnClickedTime = 1;
    scoreBox.classList.toggle("clicked")
    scoreBox.textContent = "decrescente"
    scoreFiltreLow = true;
    scoreFiltredHigh = false;
    deploymentCard();
    return;
  }
  if (scorebtnClickedTime === 1) {
    scorebtnClickedTime = 2;
    scoreBox.textContent = "crescente"
    scoreFiltreLow = false;
    scoreFiltredHigh = true;
    deploymentCard();
    return;
  }
  if (scorebtnClickedTime === 2) {
    scorebtnClickedTime = 0;
    scoreBox.textContent ="Valutazione"
    scoreBox.classList.toggle("clicked")
    scoreFiltreLow = false;
    scoreFiltredHigh = false;
    deploymentCard();
    return;
  }
})

genreBox.addEventListener("change", () => {
  if (genreBox.value !== "") {
    genresFiltred = true
    deploymentCard();
    return;
  }
  genresFiltred = false;
  deploymentCard();
})
