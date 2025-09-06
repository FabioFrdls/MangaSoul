const MangaLink = "http://localhost:8080/api/manga";
let input = document.getElementById("searchInput");
let cardContainer = document.getElementById("cardContainer");//html made div

function deploymentCard() {
    fetch(MangaLink + "/find")
        .then(response => response.json()) //i receive the json
        .then(mangas => { //i use the json as array
            mangas.forEach(manga => { // find all the element of the array
                let card = document.createElement("div"); // in all the part like this i create element and give details
                card.classList.add("card");

                let img = document.createElement("img");
                img.src = manga.image;
                img.alt = manga.title;

                let title = document.createElement("h3");
                title.textContent = manga.title;

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

                card.append(img, title, year, author, editor, volumes, status); //in this part i m giving the card all the info

                cardContainer.appendChild(card); // giving the card to the html made div 
            });
        })
        .catch(err => console.error("Errore nel fetch:", err));
}

window.onload = deploymentCard; //charging all the card on the start of the website
