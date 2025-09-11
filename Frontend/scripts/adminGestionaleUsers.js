const URL_ADMIN_API = "http://localhost:8080/api/admin";

/**
 * when the content is loaded it will run the function
 * */
document.addEventListener("DOMContentLoaded", async () => {
  await loadUsers();
});

document.addEventListener("click", function (e) {
  // e.target indica l'oggetto html su cui si verifica l'evento

  // if the password is clicked, reveal itself
  if (e.target.classList.contains("password")) {
    e.target.classList.toggle("hidden");
    e.target.classList.toggle("shown");
  }

  /**
   * if the button "modifica" is clicked
   * it opens a modal with a form
   * and the user paramaters are passed on
   * the form using custom parameters datasets
   */
  if (e.target.classList.contains("edit-btn")) {
    const btn = e.target;
    openModalSave(
      btn.dataset.id,
      btn.dataset.username,
      btn.dataset.email,
      btn.dataset.password,
      btn.dataset.type
    );
  }

  /**
   * if the button "elimina" is clicked
   * it opens a modal that will
   * require a confirmation before
   * deleting the user
   */
  if (e.target.classList.contains("dlt-btn")) {
    const btn = e.target;
    openModalDelete(btn.dataset.id);
  }

  /**
   * if the button "recensioni" is clicked
   * it opens a modal that will display
   * all the reviews of the selected user
   * using the user's ID and username
   */
  if (e.target.classList.contains("rvws-btn")) {
    const btn = e.target;
    openReviewsModal(
      btn.dataset.id,
      btn.closest("tr").querySelector("td:nth-child(2)").textContent
    );
  }
});

/**
 * this function will open the modal
 * that allow the admin to modify
 * the user data
 *
 */
async function openModalSave(id, username, email, password, type) {
  document.getElementById("editUserId").value = id;
  document.getElementById("editUsername").value = username;
  document.getElementById("editEmail").value = email;
  document.getElementById("editPassword").value = password;
  document.getElementById("editType").value = type;

  document.getElementById("errors-post-container").innerHTML = "";
  document.getElementById("save-users-button").classList.remove("d-none");

  const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
  modal.show();
}

/**
 * this function will open the modal
 * that allow the admin to delete
 * the user by id
 *
 */
async function openModalDelete(id) {
  document.getElementById("deleteUserId").value = id;

  const btnAnnulla = document.querySelector("#deleteUserModal .btn-secondary");
  const btnElimina = document.getElementById("delete-user-button");
  const btnChiudi = document.getElementById("deleteCloseBtn");

  btnAnnulla.classList.remove("d-none");
  btnElimina.classList.remove("d-none");
  btnChiudi.classList.add("d-none");

  document.getElementById("errors-delete-container").innerHTML = "";
  const modal = new bootstrap.Modal(document.getElementById("deleteUserModal"));
  modal.show();
}

async function openReviewsModal(userId, username) {
  const token = localStorage.getItem("access-token");
  const container = document.getElementById("reviews-container");
  const usernameSpan = document.getElementById("reviewsUsername");

  usernameSpan.textContent = username;
  container.innerHTML = '<div class="text-center">Caricamento...</div>';

  const modal = new bootstrap.Modal(document.getElementById("reviewsModal"));
  modal.show();

  try {
    const response = await fetch(URL_ADMIN_API + "/reviews/" + userId, {
      method: "GET",
      headers: { "access-token": token },
    });

    if (response.ok) {
      const reviews = await response.json();

      if (reviews.length === 0) {
        container.innerHTML =
          '<div class="alert alert-info text-center">Nessuna recensione trovata</div>';
        return;
      }

      let lista = `<div class="list-group">`;

      reviews.forEach((review) => {
        lista += `
      <div class="list-group-item mb-3 shadow-sm rounded p-3">
        <h5 class="mb-1">${review.title}</h5>
        <small class="text-muted">Data: ${new Date(
          review.timestamp
        ).toLocaleDateString()} | Score: ${review.score}</small>
        <p class="mt-2 mb-0"><strong>Commento:</strong> ${review.text}</p>
      </div>`;
      });

      lista += `</div>`;

      container.innerHTML = lista;
    } else {
      container.innerHTML =
        '<div class="alert alert-danger text-center">Errore nel caricamento recensioni</div>';
    }
  } catch (error) {
    console.error("Errore fetch recensioni:", error);
    container.innerHTML =
      '<div class="alert alert-danger text-center">Errore durante la fetch</div>';
  }
}

/**
 * this function will load the list of all
 * the users that have signed in the application
 *
 */
async function loadUsers() {
  const token = localStorage.getItem("access-token");
  const container = document.getElementById("users-container");
  container.innerHTML = "";

  try {
    const response = await fetch(URL_ADMIN_API + "/users", {
      method: "GET",
      headers: { "access-token": token },
    });

    if (response.ok) {
      const users = await response.json();

      let table = `
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th class="id-column">ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Type</th>
                <th class="text-center">Modifica</th>
                <th class="text-center">Recensioni</th>
                <th class="text-center">Elimina</th>
              </tr>
            </thead>
            <tbody>`;

      users.forEach((user) => {
        table += `
          <tr>
            <td class="id-column">${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td class="password hidden" data-password="${user.password}"></td>
            <td>${user.type}</td>
            <td class="text-center">
              <button class="btn btn-primary btn-sm edit-btn"
                      data-id="${user.id}"
                      data-username="${user.username}"
                      data-email="${user.email}"
                      data-password="${user.password}"
                      data-type="${user.type}">
                Modifica
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-warning btn-sm rvws-btn"
                      data-id="${user.id}" 
                      data-username="${user.username}">
                Recensioni
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-danger btn-sm dlt-btn" 
                      data-id="${user.id}">
                Elimina
              </button>
            </td>
          </tr>`;
      });

      table += `</tbody></table></div>`;
      container.innerHTML = table;
    } else {
      container.innerHTML =
        '<div class="alert alert-danger">Errore nel caricamento utenti</div>';
    }
  } catch (error) {
    console.error("Errore fetch utenti:", error);
    container.innerHTML = `<div class="alert alert-danger">Errore: ${error}</div>`;
  }
}

async function modifyUser() {
  const token = localStorage.getItem("access-token");

  const id = document.getElementById("editUserId").value;
  const username = document.getElementById("editUsername").value;
  const email = document.getElementById("editEmail").value;
  const password = document.getElementById("editPassword").value;
  const type = document.getElementById("editType").value;

  const errContainer = document.getElementById("errors-post-container");
  errContainer.innerHTML = "";
  const savebtn = document.getElementById("save-users-button");
  savebtn.classList.remove("d-none");

  try {
    const response = await fetch(URL_ADMIN_API + "/users/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
      body: JSON.stringify({
        username,
        password,
        email,
        type,
      }),
    });

    if (response.ok) {
      errContainer.innerHTML =
        '<div class="alert alert-success">Utente modificato con successo</div>';
      savebtn.classList.add("d-none");
      loadUsers();
    } else {
      errContainer.innerHTML =
        '<div class="alert alert-danger">Errore nella modifica dati</div>';
    }
  } catch (error) {
    console.error("Errore fetch modifica utente:", error);
    errContainer.innerHTML =
      '<div class="alert alert-danger">Errore durante la fetch</div>';
  }
}

async function deleteUser() {
  const token = localStorage.getItem("access-token");
  const id = document.getElementById("deleteUserId").value;

  const btnAnnulla = document.querySelector("#deleteUserModal .btn-secondary");
  const btnElimina = document.getElementById("delete-user-button");
  const btnChiudi = document.getElementById("deleteCloseBtn");

  const errContainer = document.getElementById("errors-delete-container");
  errContainer.innerHTML = "";

  try {
    const response = await fetch(URL_ADMIN_API + "/users/" + id, {
      method: "DELETE",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      btnAnnulla.classList.add("d-none");
      btnElimina.classList.add("d-none");

      btnChiudi.classList.remove("d-none");

      errContainer.innerHTML =
        '<div class="alert alert-success">Utente eliminato con successo</div>';
      loadUsers();
    } else {
      errContainer.innerHTML = `<div class="alert alert-danger">Errore nella eliminazione dell'utente</div>`;
    }
  } catch (error) {
    console.error("Errore fetch elimina utente:", error);
    errContainer.innerHTML =
      '<div class="alert alert-danger">Errore durante la fetch</div>';
  }
}
