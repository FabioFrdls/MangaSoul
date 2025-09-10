const URL_ADMIN_API = "http://localhost:8080/api/admin";

/**
 * when the content is loaded it will run the function
 * */
document.addEventListener("DOMContentLoaded", async () => {
  await loadUsers();
});

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

      let html = `
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Type</th>
              <th scope="col">Modifica</th>
              <th scope="col">Recensioni</th>
              <th scope="col">Elimina</th>
            </tr>
          </thead>
          <tbody>`;

      users.forEach((user) => {
        html += `
          <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td class="password hidden" data-password="${user.password}"></td>
            <td>${user.type}</td>
            <td>
                <button class="btn btn-light btn-sm edit-btn"
                    data-id="${user.id}"
                    data-username="${user.username}"
                    data-email="${user.email}"
                    data-password="${user.password}"
                    data-type="${user.type}"> Modifica
                </button>
            </td>
            <td>
                <button class="btn btn-warning btn-sm rvws-btn"
                    data-id="${user.id}" data-username="${user.username}"> Recensioni
                </button>
            </td>
            <td>
              <button class="btn btn-danger btn-sm dlt-btn" data-id="${user.id}">Elimina</button>
            </td>
          </tr>`;
      });

      html += "</tbody></table>";
      container.innerHTML = html;
    } else {
      container.innerHTML =
        '<div class="alert alert-danger">Errore nel caricamento utenti</div>';
    }
  } catch (error) {
    console.error("Errore fetch utenti:", error);
    container.innerHTML = `<div class="alert alert-danger">Errore: ${error}</div>`;
  }
}

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
 * the user byy id
 *
 */
async function openModalDelete(id) {
  document.getElementById("deleteUserId").value = id;

  document.getElementById("errors-delete-container").innerHTML = "";
  const modal = new bootstrap.Modal(document.getElementById("deleteUserModal"));
  modal.show();
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

      let lista = `<ul>`;

      reviews.forEach((review) => {
        lista += `
                <li class="mb-5">
                    <strong>Titolo: </strong>${review.title} 
                    <br>
                    <strong>Score: </strong>${review.score}
                    <br>
                    <strong>Commento: </strong>${review.text}
                    <br>
                    <strong>Data: </strong>${new Date(
                      review.timestamp
                    ).toLocaleString()}
                    <br>
                </li>`;
      });
      lista += `</ul>`;

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

// Event listners when an element is clicked
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
