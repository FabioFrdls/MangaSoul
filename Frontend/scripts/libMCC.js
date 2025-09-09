// this is a custom version of MangaCardCreation for Library methods


let cardContainer = document.getElementById("cardContainer"); // html made div

function openModal(manga) {
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

    modalBody.append(img, title, summary, genre, year, author, editor, volumes, status, score);

    deployReview(manga); // alessio write here the method for the review

    modal.style.display = "flex";
    closeButton.onclick = () => {
        modal.style.display = "none";
    };
}

function createCard(manga) {
    let card = document.createElement("div"); // in all the part like this i create element and give details
    card.classList.add("card");

    let img = document.createElement("img");
    img.src = manga.image;
    img.alt = manga.title;

    let title = document.createElement("h3");
    title.textContent = manga.title;

    let author = document.createElement("p");
    author.textContent = "Autore: " + manga.author.full_name;

    let button = document.createElement("button");
    button.textContent = "info";
    button.classList.add("modalButton");
    button.addEventListener("click", () => {
        openModal(manga);
    });
    let btnUp = document.createElement("update");
    btnUp.textContent = "aggiorna stato";
    button.classList.add("modalButton");
    btnUp.addEventListener("click", () => {
        update(manga);
    });
    let btnDel = document.createElement("delete");
    btnUp.textContent = "elimina dalla libreria";
    button.classList.add("modalButton");
    btnUp.addEventListener("click", () => {
        remove(manga);
    });
    card.append(img, title, author, button, btnUp, btnDel);
    return card; 
}
