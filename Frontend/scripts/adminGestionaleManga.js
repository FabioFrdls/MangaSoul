// Endpoints for APIs
const URL_MANGA_API = "http://localhost:8080/api/manga";
const URL_GENRES_API = "http://localhost:8080/api/genres";
const URL_AUTHOR_API = "http://localhost:8080/api/author";
const URL_ADMIN_API = "http://localhost:8080/api/admin";
const URL_REVIEWS_API = "http://localhost:8080/api/review";

// add event listener to the document for delete and edit buttons
document.addEventListener("click", function (e) {
  // Check if the clicked element is a delete button
  if (e.target.classList.contains("dlt-btn")) {
    const btn = e.target;
    openModalDelete(btn.dataset.id);
  }

  // Check if the clicked element is an edit button
  if (e.target.classList.contains("edit-btn")) {
    const btn = e.target;
    const id = btn.dataset.id;
    const title = btn.dataset.title;
    const year = btn.dataset.year;
    const summary = btn.dataset.summary;
    const volumes = btn.dataset.volumes;
    const status = btn.dataset.status;
    const image = btn.dataset.image;
    const editor = btn.dataset.editor;
    const score = btn.dataset.score;

    openModalEditManga(
      id,
      title,
      year,
      summary,
      volumes,
      status,
      image,
      editor,
      score
    );
  }

  // Check if the clicked element is a reviews button
  if (e.target.classList.contains("rvws-btn")) {
    const btn = e.target;
    openReviewsModal(btn.dataset.id);
  }
});

// Load manga the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  await loadManga();

  // Add event listener to the search input for filtering manga
  document
    .getElementById("mangaSearchInput")
    .addEventListener("input", filterManga);
});

// function to open the modal for adding a new manga
async function openModalAddManga() {
  const modal = new bootstrap.Modal(document.getElementById("addMangaModal"));
  modal.show();

  document.getElementById("saveMangaBtn").classList.remove("d-none");
  clearInputs();

  // Load genres and authors when opening the modal
  loadGenres("addMangaGenreContainer");
  loadAuthors("select-author");
}

// function to open the modal for deleting a manga
async function openModalDelete(id) {
  document.getElementById("deleteMangaId").value = id;

  const btnAnnulla = document.getElementById("deleteCancelBtn");
  const btnElimina = document.getElementById("deleteConfirmBtn");
  const btnChiudi = document.getElementById("deleteCloseBtn");

  btnAnnulla.classList.remove("d-none");
  btnElimina.classList.remove("d-none");
  btnChiudi.classList.add("d-none");

  document.getElementById("errors-delete-manga-container").innerHTML = "";
  const modal = new bootstrap.Modal(
    document.getElementById("deleteMangaModal")
  );
  modal.show();
}

// function to open the modal for view all the reviews of a manga
async function openReviewsModal(id) {
  const modal = new bootstrap.Modal(document.getElementById("reviewsModal"));
  modal.show();

  viewReviews(id);
}

async function openModalEditManga(
  id,
  title,
  year,
  summary,
  volumes,
  status,
  image,
  editor,
  score
) {
  document.getElementById("editMangaId").value = id;
  document.getElementById("editMangaTitle").value = title;
  document.getElementById("editMangaYear").value = year;
  document.getElementById("editMangaSummary").value = summary;
  document.getElementById("editMangaVolumes").value = volumes;
  document.getElementById("editMangaStatus").value = status;
  document.getElementById("editMangaImage").value = image;
  document.getElementById("editEditorName").value = editor;
  document.getElementById("editMangaScore").value = score;

  // Show the edit button when opening the modal
  document.getElementById("editMangaBtn").classList.remove("d-none");

  document.getElementById("errors-edit-manga-container").innerHTML = "";

  const modal = new bootstrap.Modal(document.getElementById("editMangaModal"));
  modal.show();

  loadAuthors("select-edit-author", "editMangaAuthor");
  loadGenres("editMangaGenreContainer");
}

// function to clear all input fields and error messages in the add/edit manga modal
function clearInputs() {
  // select all input fields
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
  const textarea = document.getElementById("mangaSummary");
  textarea.value = "";
  const errorsContainer = document.getElementById("errors-manga-container");
  errorsContainer.innerHTML = "";
}

// function to load and display manga in the admin table
async function loadManga() {
  const container = document.getElementById("manga-container");
  container.innerHTML = "";

  try {
    const response = await fetch(URL_MANGA_API + "/find");
    if (!response.ok) throw new Error("Errore fetch manga");

    const mangas = await response.json();
    let table = `
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th class="id-column">ID</th>
              <th class="cover-column">Copertina</th>
              <th class="title-column">Titolo</th>
              <th class="summary-column">Trama</th>
              <th class="year-column">Anno</th>
              <th class="author-column">Autore</th>
              <th class="score-column">Score</th>
              <th class="volumes-column">Volumi</th>
              <th class="genres-column">Generi</th>
              <th class="status-column">Stato</th>
              <th class="editor-column">Editor</th>
              <th class="action-column text-center">Modifica</th>
              <th class="action-column text-center">Recensioni</th>
              <th class="action-column text-center">Elimina</th>
            </tr>
          </thead>
          <tbody>`;

    mangas.forEach((manga) => {
      const genreList = manga.genres.map((g) => g.name).join(" ");
      const authorName = manga.author ? manga.author.full_name : "N/A";
      const escapedSummary = manga.summary.replace(/"/g, "&quot;");

      table += `
        <tr>
          <td class="id-column">${manga.id}</td>
          <td><img src="${
            manga.image
          }" alt="cover" class="img-thumbnail" style="width:60px;height:auto;"></td>
          <td>${manga.title}</td>
          <td><div class="summary-cell">${manga.summary}</div></td>
          <td>${manga.year}</td>
          <td>${authorName}</td>
          <td>${manga.score}</td>
          <td>${manga.volumes}</td>
          <td>${genreList}</td>
          <td>${manga.status}</td>
          <td>${manga.editor_name}</td>
          <td class="text-center">
            <button class="btn btn-primary btn-sm edit-btn" 
                    data-id="${manga.id}"
                    data-title="${manga.title}"
                    data-year="${manga.year}"
                    data-summary="${escapedSummary}"
                    data-volumes="${manga.volumes}"
                    data-status="${manga.status}"
                    data-image="${manga.image}"
                    data-editor="${manga.editor_name}"
                    data-score="${manga.score}"
                    data-genres="${JSON.stringify(manga.genres)}"
                    data-author="${JSON.stringify(manga.author)}">
              Modifica
            </button>
          </td>
          <td class="text-center">
            <button class="btn btn-warning btn-sm rvws-btn" data-id="${
              manga.id
            }">
              Recensioni
            </button>
          </td>
          <td class="text-center">
            <button class="btn btn-danger btn-sm dlt-btn" data-id="${manga.id}">
              Elimina
            </button>
          </td>
        </tr>`;
    });

    table += `</tbody></table></div>`;
    container.innerHTML = table;
  } catch (error) {
    console.error(error);
    container.innerHTML =
      '<div class="alert alert-danger">Errore nel caricamento manga</div>';
  }
}

// Function to load genres and populate checkboxes
async function loadGenres(idCheckboxContainer) {
  const container = document.getElementById(idCheckboxContainer);
  container.innerHTML = "";

  try {
    const response = await fetch(URL_GENRES_API + "/get");
    if (response.ok) {
      const genres = await response.json();
      let checkboxHtml = `<div class="form-check">`;
      genres.forEach((genre) => {
        checkboxHtml += `
          <input class="form-check-input" type="checkbox" data-name="${genre.name}" value="${genre.id}" id="flexCheckDefault${genre.id}">
          <label class="form-check-label" for="flexCheckDefault${genre.id}">${genre.name}</label><br>
        `;
      });
      checkboxHtml += "</div>";
      container.innerHTML = checkboxHtml;
    } else {
      container.innerHTML =
        '<span class="text-danger">Errore caricamento generi</span>';
    }
  } catch (err) {
    console.error("Errore fetch generi:", err);
    container.innerHTML =
      '<span class="text-danger">Errore connessione al server</span>';
  }
}

// Function to load authors and populate a select dropdown
async function loadAuthors(selectContainerId, selectId = "mangaAuthor") {
  const container = document.getElementById(selectContainerId);
  container.innerHTML = "";

  try {
    const response = await fetch(URL_AUTHOR_API + "/getAll");
    if (response.ok) {
      const authors = await response.json();
      let selectHtml = `<select class="form-select" id="${selectId}">
                        <option value="">Seleziona autore</option>`;
      authors.forEach((author) => {
        selectHtml += `
          <option value="${author.id}" 
                  data-fullName="${author.full_name}" 
                  data-birthdate="${author.birthdate}">
            ${author.full_name}
          </option>`;
      });
      selectHtml += "</select>";
      container.innerHTML = selectHtml;
    }
  } catch (err) {
    console.error("Errore fetch autori:", err);
    container.innerHTML =
      '<span class="text-danger">Errore caricamento autori</span>';
  }
}

// function to add a nuew manga
async function addManga() {
  const token = localStorage.getItem("access-token");

  // building the manga object to send to beckend
  const title = document.getElementById("mangaTitle").value;
  const year = document.getElementById("mangaYear").value;
  const summary = document.getElementById("mangaSummary").value;
  const volumes = document.getElementById("mangaVolumes").value;
  const status = document.getElementById("mangaStatus").value;
  const image = document.getElementById("mangaImage").value;
  const editor_name = document.getElementById("editorName").value;

  const genreContainer = document.getElementById("addMangaGenreContainer");
  const checkboxes = genreContainer.getElementsByTagName("input");
  const genres = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      genres.push({
        id: checkboxes[i].value,
        name: checkboxes[i].dataset.name,
      });
    }
  }

  let author = null;
  const authorSelect = document.getElementById("mangaAuthor");
  if (authorSelect && authorSelect.value !== "") {
    const option = authorSelect.options[authorSelect.selectedIndex];
    author = {
      id: authorSelect.value,
      full_name: option.getAttribute("data-fullName"),
      birthdate: option.getAttribute("data-birthdate"),
    };
  }

  const manga = {
    title,
    year,
    summary,
    volumes,
    status,
    image,
    genres,
    author,
    editor_name,
  };

  console.log(manga);

  const errorsContainer = document.getElementById("errors-manga-container");

  // fetch post
  try {
    const response = await fetch("http://localhost:8080/api/admin/manga/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
      body: JSON.stringify(manga),
    });

    if (!response.ok) {
      const errorMessage = await response.json();

      errorsContainer.innerHTML = "";

      if (errorMessage.errors) {
        for (const field in errorMessage.errors) {
          errorsContainer.innerHTML += `<div class="text-danger">${field}: ${errorMessage.errors[field]}</div>`;
        }
      } else if (errorMessage.message) {
        errorsContainer.innerHTML = `<div class="text-danger">${errorMessage.message}</div>`;
      }

      return;
    }

    clearInputs();
    document.getElementById("saveMangaBtn").classList.add("d-none");
    errorsContainer.innerHTML =
      "<div class='text-success'>Manga aggiunto con successo</div>";
    loadManga();
  } catch (err) {
    console.error("Errore nella fetch:", err);
  }
}

async function deleteManga() {
  const id = document.getElementById("deleteMangaId").value;
  const token = localStorage.getItem("access-token");
  const errContainer = document.getElementById("errors-delete-manga-container");

  const btnAnnulla = document.getElementById("deleteCancelBtn");
  const btnElimina = document.getElementById("deleteConfirmBtn");
  const btnChiudi = document.getElementById("deleteCloseBtn");

  try {
    const response = await fetch(URL_ADMIN_API2 + "/manga/delete/" + id, {
      method: "DELETE",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      errContainer.innerHTML =
        '<div class="alert alert-success">Manga eliminato con successo</div>';

      btnAnnulla.classList.add("d-none");
      btnElimina.classList.add("d-none");

      btnChiudi.classList.remove("d-none");

      loadManga();
    } else {
      errContainer.innerHTML = `<div class="alert alert-danger">Errore nella eliminazione del manga</div>`;
    }
  } catch (error) {
    console.error("Errore fetch elimina utente:", error);
    errContainer.innerHTML =
      '<div class="alert alert-danger">Errore durante la fetch</div>';
  }
}

async function editManga() {
  const errorContainer = document.getElementById("errors-edit-manga-container");
  const saveEditBtn = document.getElementById("editMangaBtn");
  errorContainer.innerHTML = "";

  saveEditBtn.classList.add("d-none");

  const token = localStorage.getItem("access-token");

  const id = document.getElementById("editMangaId").value;
  const title = document.getElementById("editMangaTitle").value;
  const year = document.getElementById("editMangaYear").value;
  const summary = document.getElementById("editMangaSummary").value;
  const volumes = document.getElementById("editMangaVolumes").value;
  const status = document.getElementById("editMangaStatus").value;
  const image = document.getElementById("editMangaImage").value;
  const editor_name = document.getElementById("editEditorName").value;

  const genreContainer = document.getElementById("editMangaGenreContainer");
  const checkboxes = genreContainer.getElementsByTagName("input");
  const genres = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      genres.push({
        id: checkboxes[i].value,
        name: checkboxes[i].dataset.name,
      });
    }
  }

  let author = null;
  const authorSelect = document.getElementById("editMangaAuthor");
  if (authorSelect && authorSelect.value !== "") {
    const option = authorSelect.options[authorSelect.selectedIndex];
    author = {
      id: authorSelect.value,
      full_name: option.getAttribute("data-fullName"),
      birthdate: option.getAttribute("data-birthdate"),
    };
  }

  const editedManga = {
    title,
    year,
    summary,
    volumes,
    status,
    image,
    genres,
    author,
    editor_name,
  };

  try {
    const response = await fetch(URL_ADMIN_API + "/manga/put/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
      body: JSON.stringify(editedManga),
    });

    if (response.ok) {
      errorContainer.innerHTML =
        '<div class="alert alert-success">Manga modificato con successo</div>';
      await loadManga();

      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("editMangaModal")
        );
        if (modal) {
          modal.hide();
        }
      }, 1000);
    } else {
      saveEditBtn.classList.remove("d-none");

      const errorMessage = await response.json();
      if (errorMessage.errors) {
        let msg = "";
        for (const field in errorMessage.errors) {
          msg += `<div class="text-danger">${field}: ${errorMessage.errors[field]}</div>`;
        }
        errorContainer.innerHTML = msg;
      } else if (errorMessage.message) {
        errorContainer.innerHTML = `<div class="text-danger">${errorMessage.message}</div>`;
      }
    }
  } catch (error) {
    console.error("Errore fetch modifica manga:", error);
    errorContainer.innerHTML =
      '<div class="alert alert-danger">Errore durante la fetch</div>';
    saveEditBtn.classList.remove("d-none");
  }
}

// Filters manga in the table based on search input
function filterManga() {
  const searchValue = document
    .getElementById("mangaSearchInput")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#manga-container table tbody tr");

  rows.forEach((row) => {
    // Pick the relevant fields to search
    const title = row.querySelector("td:nth-child(3)").innerText.toLowerCase();

    // Check if any field matches the search value
    const userInput = title.includes(searchValue);

    // Show or hide the row based on the match
    if (userInput) {
      row.classList.remove("d-none");
    } else {
      row.classList.add("d-none");
    }
  });
}

async function viewReviews(mangaId) {
  const container = document.getElementById("reviewsContainer");

  container.innerHTML = "";

  try {
    const response = await fetch(
      URL_REVIEWS_API + "/getReviewsByMangaIdAsc?manga_id=" + mangaId,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const reviews = await response.json();

      console.log(reviews);
      if (reviews.length === 0) {
        container.innerHTML =
          '<div class="alert alert-info">Nessuna recensione per questo manga</div>';
        return;
      }
      let list = '<div class="list-group">';
      reviews.forEach((review) => {
        list += `
      <div class="list-group-item mb-3 shadow-sm rounded p-3">
          <h5 class="mb-1">${review.user.username}</h5>
          <small class="text-muted">
            Data: ${new Date(review.creationTimestamp).toLocaleDateString()} | 
            Score: ${review.score}
          </small>
          <p class="mt-2 mb-0">${review.text}</p>
          <button class="mt-2 btn btn-danger btn-sm dlt-review-btn" onclick="deleteReview(${review.id
          })">Elimina Recensione</button>
      </div>
    `;
      });
      list += "</div>";
      container.innerHTML = list;
    }
  } catch (error) {
    console.error("Errore fetch recensioni manga:", error);
    container.innerHTML =
      '<div class="alert alert-danger">Errore nel caricamento delle recensioni</div>';
  }
}

async function deleteReview(id) {
  try {
    const response = await fetch(URL_REVIEWS_API + "/deleteById/" + id, {
      method: "DELETE",
    });

    if (response.ok) {
      window.alert("Recensione eliminata correttamente");
      window.location.reload();
    } else {
      window.alert("Sium");
    }
  } catch (error) {
    console.err("Errore durante l'eliminazione della review");
  }
}
