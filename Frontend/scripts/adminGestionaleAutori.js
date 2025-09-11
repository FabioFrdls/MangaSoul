const URL_API_AUTHORS = "http://localhost:8080/api/author";

// Initialize event listeners and load authors on page load
document.addEventListener("DOMContentLoaded", () => {
    getAuthors();

    const addAuthorModal = document.getElementById("addAuthorModal");
    addAuthorModal.addEventListener("hidden.bs.modal", function () {
        clearAuthorInputs();
    });

    // Attach event listeners to buttons in modals
    document
        .getElementById("addEditAuthorBtn")
        .addEventListener("click", addAuthor);
    document
        .getElementById("saveEditAuthorBtn")
        .addEventListener("click", editAuthor);
    document
        .getElementById("deleteConfirmBtn")
        .addEventListener("click", deleteAuthor);

    document
        .getElementById("authorSearchInput")
        .addEventListener("input", filterAuthors);
});

// Filters authors in the table based on search input
function filterAuthors() {
    const searchValue = document
        .getElementById("authorSearchInput")
        .value.toLowerCase();
    const rows = document.querySelectorAll("#authors-container table tbody tr");

    rows.forEach((row) => {
        // Pick the relevant fields to search
        const id = row.querySelector("td:nth-child(1)").innerText.toLowerCase();
        const name = row.querySelector("td:nth-child(2)").innerText.toLowerCase();
        const birthdate = row
            .querySelector("td:nth-child(3)")
            .innerText.toLowerCase();

        // Check if any field matches the search value
        const match =
            id.includes(searchValue) ||
            name.includes(searchValue) ||
            birthdate.includes(searchValue);

        // Show or hide the row based on the match
        if (match) {
            row.classList.remove("d-none");
        } else {
            row.classList.add("d-none");
        }
    });
}

// Handle click events for author management buttons
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-author-btn")) {
        const btn = e.target;
        openDeleteAuthorModal(btn.dataset.id);
    }

    // Edit author button clicked
    if (e.target.classList.contains("edit-author-btn")) {
        const btn = e.target;
        const id = btn.dataset.id;
        const name = btn.dataset.authorName;
        const birthdate = btn.dataset.authorBirth;

        openEditAuthorModal(id, name, birthdate);
    }

    // Add author button clicked
    if (e.target.id === "addAuthorBtn") {
        openModalAddAuthor();
    }

    // Navigate to admin authors page
    if (e.target.classList.contains("ti-prego-funziona")) {
        window.location.href = "admin-autori.html";
    }
});

// Opens the modal for adding a new author
async function openModalAddAuthor() {
    const modal = new bootstrap.Modal(document.getElementById("addAuthorModal"));
    clearAuthorInputs();
    modal.show();
}

// Opens the modal for editing an existing author
async function openEditAuthorModal(id, name, birthdate) {
    document.getElementById("editAuthorId").value = id;
    document.getElementById("editAuthorName").value = name;
    document.getElementById("editAuthorBirthDate").value = birthdate;
    document.getElementById("errors-edit-author-container").innerHTML = "";
    const modal = new bootstrap.Modal(document.getElementById("editAuthorModal"));
    modal.show();
}

// Opens the confirmation modal for deleting an author
async function openDeleteAuthorModal(id) {
    document.getElementById("deleteAuthorId").value = id;

    const btnAnnulla = document.getElementById("deleteCancelBtn");
    const btnElimina = document.getElementById("deleteConfirmBtn");
    const btnChiudi = document.getElementById("deleteCloseBtn");

    btnAnnulla.classList.remove("d-none");
    btnElimina.classList.remove("d-none");
    btnChiudi.classList.add("d-none");

    document.getElementById("errors-delete-author-container").innerHTML = "";

    const modal = new bootstrap.Modal(
        document.getElementById("deleteAuthorModal")
    );
    modal.show();
}

// Clears input fields and error messages in the add author form
function clearAuthorInputs() {
    document.getElementById("authorName").value = "";
    document.getElementById("authorBirthDate").value = "";
    document.getElementById("errors-add-author-container").innerHTML = "";
}

// Fetches and displays all authors in a table
async function getAuthors() {
    const container = document.getElementById("authors-container");
    container.innerHTML = "";

    try {
        const response = await fetch(URL_API_AUTHORS + "/getAll");

        if (response.ok) {
            const authors = await response.json();
            // Generate table HTML with author data
            let table = `
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th class="id-column">ID</th>
              <th>Nome</th>
              <th class="date-column">Data di nascita</th>
              <th class="text-center">Modifica</th>
              <th class="text-center">Elimina</th>
            </tr>
          </thead>
          <tbody>`;

            authors.forEach((author) => {
                table += `
          <tr>    
            <td class="id-column">${author.id}</td>
            <td>${author.full_name}</td>
            <td class="date-column">${new Date(
                    author.birthdate
                ).toLocaleDateString()}</td>
            <td class="text-center">
              <button class="btn btn-primary btn-sm edit-author-btn" 
                      data-id="${author.id}"
                      data-author-name="${author.full_name}"
                      data-author-birth="${author.birthdate}">
                  Modifica
              </button>
            </td>
            <td class="text-center">
              <button class="btn btn-danger btn-sm delete-author-btn" 
                      data-id="${author.id}">
                  Elimina
              </button>
            </td>
          </tr>`;
            });

            table += `
          </tbody>
        </table>
      </div>`;

            container.innerHTML = table;
        } else {
            container.innerHTML =
                '<div class="alert alert-danger">Error loading authors</div>';
        }
    } catch (error) {
        console.error("Error fetching authors:", error);
        container.innerHTML =
            '<div class="alert alert-danger">Error retrieving authors from server</div>';
    }
}

// Handles the addition of a new author
async function addAuthor() {
    const name = document.getElementById("authorName").value;
    const birthdate = document.getElementById("authorBirthDate").value;
    const errorsContainer = document.getElementById(
        "errors-add-author-container"
    );
    const saveBtn = document.getElementById("addEditAuthorBtn");

    errorsContainer.innerHTML = "";
    saveBtn.disabled = true;

    try {
        // Send POST request to create new author
        const response = await fetch(URL_API_AUTHORS + "/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name: name, birthdate: birthdate }),
        });

        if (response.ok) {
            // Show success message and update table
            errorsContainer.innerHTML =
                '<div class="alert alert-success">Author added successfully</div>';
            await getAuthors();

            // I need this shit because the modal is bugged and i want to die
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById("addAuthorModal")
                );
                modal.hide();
            }, 1000);
        } else {
            saveBtn.disabled = false;
            if (response.status === 400) {
                const errorData = await response.json();
                displayErrors(errorsContainer, errorData);
            } else {
                errorsContainer.innerHTML =
                    '<div class="alert alert-danger">Error adding author</div>';
            }
        }
    } catch (error) {
        console.error("Error adding author:", error);
        errorsContainer.innerHTML =
            '<div class="alert alert-danger">Server connection error</div>';
        saveBtn.disabled = false;
    }
}

// Handles the editing of an existing author
async function editAuthor() {
    const id = document.getElementById("editAuthorId").value;
    const name = document.getElementById("editAuthorName").value;
    const birthdate = document.getElementById("editAuthorBirthDate").value;
    const errorsContainer = document.getElementById(
        "errors-edit-author-container"
    );
    const saveBtn = document.getElementById("saveEditAuthorBtn");

    errorsContainer.innerHTML = "";
    saveBtn.disabled = true;

    try {
        // Send PUT request to update author
        const response = await fetch(URL_API_AUTHORS + "/updateById/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: parseInt(id),
                full_name: name,
                birthdate: birthdate,
            }),
        });

        if (response.ok) {
            // Show success message and update table
            errorsContainer.innerHTML =
                '<div class="alert alert-success">Author updated successfully</div>';
            await getAuthors();

            // same there
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById("editAuthorModal")
                );
                modal.hide();
            }, 1000);
        } else {
            saveBtn.disabled = false;
            if (response.status === 400) {
                const errorData = await response.json();
                displayErrors(errorsContainer, errorData);
            } else {
                errorsContainer.innerHTML =
                    '<div class="alert alert-danger">Error updating author</div>';
            }
        }
    } catch (error) {
        console.error("Error updating author:", error);
        errorsContainer.innerHTML =
            '<div class="alert alert-danger">Server connection error</div>';
        saveBtn.disabled = false;
    }
}

// Handles the deletion of an author
async function deleteAuthor() {
    const id = document.getElementById("deleteAuthorId").value;
    const errorsContainer = document.getElementById(
        "errors-delete-author-container"
    );
    const btnAnnulla = document.getElementById("deleteCancelBtn");
    const btnElimina = document.getElementById("deleteConfirmBtn");
    const btnChiudi = document.getElementById("deleteCloseBtn");

    errorsContainer.innerHTML = "";
    btnAnnulla.disabled = true;
    btnElimina.disabled = true;

    try {
        // Send DELETE request
        const response = await fetch(URL_API_AUTHORS + "/deleteById/" + id, {
            method: "DELETE",
        });

        if (response.ok) {
            // Show success message and update UI
            errorsContainer.innerHTML =
                '<div class="alert alert-success">Author deleted successfully</div>';
            await getAuthors();
            btnAnnulla.classList.add("d-none");
            btnElimina.classList.add("d-none");
            btnChiudi.classList.remove("d-none");
        } else {
            btnAnnulla.disabled = false;
            btnElimina.disabled = false;
            if (response.status === 400) {
                const errorData = await response.json();
                displayErrors(errorsContainer, errorData);
            } else {
                errorsContainer.innerHTML =
                    '<div class="alert alert-danger">Error deleting author</div>';
            }
        }
    } catch (error) {
        console.error("Error deleting author:", error);
        errorsContainer.innerHTML =
            '<div class="alert alert-danger">Server connection error</div>';
        btnAnnulla.disabled = false;
        btnElimina.disabled = false;
    }
}

// i really don't know why this function is here
// because i was struggling with some bugs with modals
// and after some blasphemy ai agets puts this here
// and i am too lazy to remove it and adapt the code

// Displays error messages in the specified container
function displayErrors(container, errors) {
    let errorHtml = '<div class="alert alert-danger"><ul>';
    errors.forEach((err) => {
        errorHtml += `<li>${err}</li>`;
    });
    errorHtml += "</ul></div>";
    container.innerHTML = errorHtml;
}
