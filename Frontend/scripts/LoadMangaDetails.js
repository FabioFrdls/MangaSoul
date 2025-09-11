let currentMangaId = null;

const MangaLink = "http://localhost:8080/api/manga";
const reviewLink = "http://localhost:8080/api/review";

async function loadMangaData() {
    const params = new URLSearchParams(window.location.search);
    currentMangaId = params.get('id');  // assign global here

    if (!currentMangaId) {
        alert("ID del manga non trovato.");
        return;
    }

    try {
        const response = await fetch(MangaLink + "/findById/" + currentMangaId);

        if (!response.ok) {
            throw new Error("Errore durante il recupero dei dati del manga.");
        }

        const manga = await response.json();

        // image
        if (manga.image) {
            document.getElementById('mangaImage').src = manga.image;
        } 
        
        // title
        if (manga.title) {
            document.getElementById('mangaTitle').textContent = manga.title;
        } else {
            document.getElementById('mangaTitle').textContent = 'Titolo non disponibile';
        }

        // summary
        if (manga.summary) {
            document.getElementById('mangaSummaryBody').textContent = manga.summary;
        } else {
            document.getElementById('mangaSummaryBody').textContent = 'Nessuna descrizione';
        }

        // year
        if (manga.year) {
            document.getElementById('mangaYearBody').textContent = manga.year;
        } else {
            document.getElementById('mangaYearBody').textContent = 'N/A';
        }

        // volumes
        if (manga.volumes) {
            document.getElementById('mangaVolumesBody').textContent = manga.volumes;
        } else {
            document.getElementById('mangaVolumesBody').textContent = 'N/A';
        }

        // author
        if (manga.author && manga.author.full_name) {
            document.getElementById('mangaAuthorBody').textContent = manga.author.full_name;
        } else {
            document.getElementById('mangaAuthorBody').textContent = 'Autore sconosciuto';
        }

        // editor
        if (manga.editor_name) {
            document.getElementById('mangaEditorBody').textContent = manga.editor_name;
        } else {
            document.getElementById('mangaEditorBody').textContent = 'N/A';
        }

        // status
        if (manga.status) {
            document.getElementById('mangaStatusBody').textContent = manga.status;
        } else {
            document.getElementById('mangaStatusBody').textContent = 'N/A';
        }

        // score
        if (manga.score !== null && manga.score !== undefined) {
            document.getElementById('mangaScoreBody').textContent = manga.score;
        } else {
            document.getElementById('mangaScoreBody').textContent = 'N/A';
        }


    } catch (error) {
        console.error("Errore durante il caricamento dei dati del manga:", error);
    }

    // Now call ShowReviews with guaranteed valid mangaId
    ShowReviews(currentMangaId);

    // Setup the dropdown listener AFTER we have currentMangaId
    const orderDropdown = document.getElementById("reviewOrder");
    if (orderDropdown) {
      orderDropdown.addEventListener("change", () => {
        ShowReviews(currentMangaId);
      });
    }
}

        



async function postReview() {
  const text = document.getElementById("comment").value.trim();
  const score = parseFloat(document.getElementById("score").value);
  const token = localStorage.getItem("access-token");

  if (!token) {
    alert("Devi essere loggato per lasciare una recensione.");
    return;
  }

  console.log("currentMangaId in postReview:", currentMangaId);
  if (!currentMangaId) {
    alert("Errore: manga non selezionato.");
    return;
  }

  if (isNaN(score) || score < 0 || score > 5) {
    alert("Il punteggio deve essere un numero tra 0 e 5.");
    return;
  }

  const review = {
    text: text,
    score: score,
    manga: { id: currentMangaId }
  };

  try {
    const response = await fetch(`${reviewLink}/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token
      },
      body: JSON.stringify(review)
    });

    if (response.ok) {
      alert("Recensione inviata con successo!");
      document.getElementById("reviewForm").reset();
      ShowReviews(currentMangaId);
    } else if (response.status === 409) {
      alert("Hai già inviato una recensione per questo manga.");
    } else {
      const errorText = await response.text();
      alert("Errore durante l'invio della recensione: " + errorText);
    }
  } catch (error) {
    console.error("Errore:", error);
    alert("Errore di rete.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
    loadMangaData();

    const backButton = document.getElementById("backButton");
    if (backButton) {
      backButton.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = 'catalogo.html';
      });
    }
});

function ShowReviews(mangaId) {
  const orderDropdown = document.getElementById("reviewOrder");
  let order = "desc"; // default order

  if (orderDropdown) {
    order = orderDropdown.value;
  }

  let endpoint = "";

  if (order === "asc") {
    endpoint = reviewLink + "/sortedReviewsByMangaIdAsc?manga_id=" + mangaId;
  } else {
    endpoint = reviewLink + "/sortedReviewsByMangaIdDesc?manga_id=" + mangaId;
  }

  fetch(endpoint)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Errore nel recupero delle recensioni.");
      }
      return response.json();
    })
    .then(function (reviewList) {
      renderReviews(reviewList);
    })
    .catch(function (error) {
      console.error("Errore:", error);
    });
}

function renderReviews(reviewList) {
  const reviewsContainer = document.getElementById("mangaReview");
  reviewsContainer.innerHTML = "";

  if (reviewList.length === 0) {
    reviewsContainer.innerHTML =
      "<p>Non ci sono recensioni. Vuoi essere il primo?</p>";
    return;
  }

  for (let i = 0; i < reviewList.length; i++) {
    const review = reviewList[i];
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review";

    let username = "persona magica";
    if (review.username && review.username.trim() !== "") {
      username = review.username;
    }

    let uName = document.createElement("h3");
    uName.textContent = username;

    let score = document.createElement("p");
    score.textContent = "Punteggio: " + review.score;

    let comment = document.createElement("p");
    comment.textContent = review.text;

    let timestamp = document.createElement("p");
    let rawDate = review.creationTimestamp.replace(" ", "T");
    let date = new Date(rawDate);

    if (!isNaN(date)) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let hour = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");

      timestamp.textContent =
        year + "-" + month + "-" + day + " " + hour + ":" + minutes;
    } else {
      timestamp.textContent = "Data non valida";
    }

    reviewDiv.appendChild(uName);
    reviewDiv.appendChild(score);
    reviewDiv.appendChild(comment);
    reviewDiv.appendChild(timestamp);

    reviewsContainer.appendChild(reviewDiv);
  }
}