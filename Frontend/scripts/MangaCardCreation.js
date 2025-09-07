<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Test Manga Cards</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
    }
    #search {
      display: block;
      margin: 10px auto 20px auto;
      padding: 8px;
      width: 60%;
      font-size: 16px;
    }
    #cardContainer {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      padding: 10px;
      width: 200px;
      text-align: center;
    }
    .card img {
      max-width: 100%;
      border-radius: 4px;
    }
    .modalButton {
      margin-top: 8px;
      padding: 5px 10px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    .modalButton:hover {
      background: #0056b3;
    }
    /* Modal */
    #modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.7);
      justify-content: center;
      align-items: center;
    }
    #modalContent {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 500px;
      max-height: 80%;
      overflow-y: auto;
      position: relative;
    }
    #closeButton {
      position: absolute;
      top: 10px; right: 10px;
      background: red;
      color: white;
      border: none;
      border-radius: 50%;
      width: 25px; height: 25px;
      cursor: pointer;
    }
    .score {
      color: darkorange;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>📚 Manga Library</h1>
  <input type="text" id="search" placeholder="Cerca un manga...">
  <div id="cardContainer"></div>

  <!-- Modal -->
  <div id="modal">
    <div id="modalContent">
      <button id="closeButton">X</button>
      <div id="modalBody"></div>
      <hr>
      <div id="mangaReview"><em>Qui verranno caricate le recensioni...</em></div>
    </div>
  </div>

  <script>
    const MangaLink = "http://localhost:8080/api/manga";
    let cardContainer = document.getElementById("cardContainer");

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

        let button = document.createElement("button");
        button.textContent = "Info";
        button.classList.add("modalButton");
        button.addEventListener("click", () => {
            openModel(manga)
        });

        card.append(img, title, author, button);
        return card;
    }

    function deploymentCard() {
        cardContainer.innerHTML = "";
        fetch(MangaLink + "/find")
            .then(response => response.json())
            .then(mangas => {
                mangas.forEach(manga => {
                    cardContainer.appendChild(createCard(manga));
                });
            })
            .catch(err => console.error("Errore nel fetch:", err));
    }

    window.onload = () => {
        deploymentCard();
        let input = document.getElementById("search");
        input.addEventListener("input", cardCreationByInput);
    };

    function cardCreationByInput() {
        let input = document.getElementById("search");
        let query = input.value.trim();
        cardContainer.innerHTML = "";

        if (query === "") {
            deploymentCard();
            return;
        } else {
            fetch(MangaLink + "/findWkeyWords?title=" + encodeURIComponent(query))
                .then(response => response.json())
                .then(mangas => {
                    if (mangas.length === 0) {
                        cardContainer.innerHTML = "<p>Nessun manga trovato.</p>";
                        return;
                    }
                    mangas.forEach(manga => {
                        cardContainer.appendChild(createCard(manga));
                    });
                })
                .catch(err => console.error("Errore nella ricerca:", err));
        }
    }

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

        deployReview(manga); // TODO: implement this
        modal.style.display = "flex";
        closeButton.onclick = () => {
            modal.style.display = "none";
        }
    }

    // Dummy function so it doesn’t break
    function deployReview(manga){
        document.getElementById("mangaReview").innerHTML = "<p>Nessuna recensione per ora...</p>";
    }
  </script>
</body>
</html>
