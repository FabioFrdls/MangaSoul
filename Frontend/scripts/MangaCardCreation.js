const MangaLink = "http://localhost:8080/api/manga";
let cardContainer = document.getElementById("cardContainer"); // html made div

// function for creating a card given a manga object
function createCard(manga) {
    let card = document.createElement("div"); // in all the part like this i create element and give details
    card.classList.add("card");

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

    let button = document.createElement("button");
    button.textContent = "info";
    button.classList.add("modalButton");
    button.addEventListener("click", () => {
        openModel(manga);
    });

    card.append(img, title, author, button); // in this part i m giving the card all the info

    return card; // i return the card to be appended
}

// function to deploy all cards
function deploymentCard() {
    cardContainer.innerHTML = ""; // we make that there is space for new element
    fetch(MangaLink + "/find")
        .then(response => response.json()) // i receive the json
        .then(mangas => { // i use the json as array
            mangas.forEach(manga => { // find all the element of the array
                cardContainer.appendChild(createCard(manga)); // giving the card to the html made div 
            });
        })
        .catch(err => console.error("Errore nel fetch:", err));
}

// function to deploy cards on input
function cardCreationByInput() {
    let input = document.getElementById("search"); // i get the input element
    let query = input.value.trim(); // i take the value of the input
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
            mangas.forEach(manga => { // find all the element of the array
                cardContainer.appendChild(createCard(manga)); // giving the card to the html made div 
            });
        })
        .catch(err => console.error("Errore nella ricerca:", err));
}

// function to open modal with details
function openModel(manga) {
    let modal = document.getElementById("modal");
    let modalBody = document.getElementById("modalBody");
    let closeButton = document.getElementById("closeButton");
    let mangaReview = document.getElementById("mangaReview");

    modalBody.innerHTML = "";
    mangaReview.innerHTML = "";

    let img = document.createElement("img");
    img.src = manga.image;
    img.alt = manga.title;

    let title = document.createElement("h5");
    title.textContent = manga.title;

    let summary = document.createElement("p");
    summary.textContent = "Trama: " + manga.summary;

    let genr = document.createElement("p");
    genr.textContent = "Genere: " + manga.genr.map(g => g.name).join(", ");

    let year = document.createElement("p");
    year.textContent = "Anno d'uscita: " + manga.year;

    let author = document.createElement("p");
    author.textContent = "Autore: " + manga.author.full_name;

    let editor = document.createElement("p");
    editor.textContent = "Pubblicazione italiana: " + manga.editor_name;

    let volumes = document.createElement("p");
    volumes.textContent = "Numeri volumi: " + manga.volumes;

    let status = document.createElement("p");
    status.textContent = "Stato: " + manga.status;

    let score = document.createElement("h3");
    score.classList.add("score");
    score.textContent = manga.score;

    modalBody.append(img, title, summary, genr, year, author, editor, volumes, status, score);

    deployReview(manga); // alessio write here the method for the review

    modal.style.display = "flex";
    closeButton.onclick = () => {
        modal.style.display = "none";
    };
}

// run on load
window.onload = () => {
    deploymentCard(); // charging all the card on the start of the website
    let input = document.getElementById("search");
    // i add a listener so when i type, the function cardCreationByInput is called
    input.addEventListener("input", cardCreationByInput);



};
