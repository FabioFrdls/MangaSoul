const URL_USER_API1 = "http://localhost:8080/api/user";
const URL_FRIENDS_API = "http://localhost:8080/api/friendship";
const API_REVIEW_URL = "http://localhost:8080/api/review";
const API_LIBRARY_URL = "http://localhost:8080/api/library";

document.addEventListener("DOMContentLoaded", function () {
  loadStats();
  displayFriends();
  displayFriendRequests();
  displayUserReviews();
});

/**
 * This function loads the user statistics from the backend and displays them on the profile page.
 */
async function loadStats() {
  const token = localStorage.getItem("access-token");

  try {
    const response = await fetch(URL_USER_API1 + "/stats", {
      method: "GET",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      const stats = await response.json();
      //console.log("User stats:", data);

      // update the profile stats
      document.getElementById("profileUsername").textContent = stats.username;
      document.getElementById("profileEmail").textContent = stats.email;
      document.getElementById("mangaCount").textContent = stats.read;
      document.getElementById("friendsCount").textContent = stats.friends;
      document.getElementById("reviewsCount").textContent = stats.reviews;

      // pre-fill the edit profile modal inputs
      document.getElementById("editUsername").value = stats.username;
      document.getElementById("editEmail").value = stats.email;
      document.getElementById("editPassword").value = "";
    }
  } catch (error) {
    console.error("Error loading stats:", error);
  }
}

async function displayFriends() {
  const token = localStorage.getItem("access-token");

  try {
    const response = await fetch(URL_FRIENDS_API + "/getFriends", {
      method: "GET",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      const friends = await response.json();
      // console.log("Friends data:", friends);

      const friendsList = document.getElementById("friendsList");
      friendsList.innerHTML = "";

      // if there are no friends, show a message
      if (friends.length === 0) {
        friendsList.innerHTML = "<p>Non hai ancora amici.</p>";
        return;
      }

      let lista = `<div class="list-group">`;
      friends.forEach((friend) => {
        lista += `
        <div class="list-group-item mb-3 shadow-sm rounded p-3">
          <h5 class="mb-1">${friend.username}</h5>
          <small class="text-muted">Manga letti: ${friend.read} | Recensioni: ${friend.reviews} | Amici: ${friend.friends}</small>
          <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-sm btn-danger" onclick="showFriendLibrary(${friend.id}, '${friend.username}')" data-bs-toggle="modal" data-bs-target="#friendLibraryModal">
              Vedi Libreria
            </button>
          </div>
        </div>`;
      });
      lista += `</div>`;
      friendsList.innerHTML = lista;
    }
  } catch (error) {
    console.error("Error loading friends:", error);
  }
}

/**
 * This function displays the friend requests for the user.
 */
async function displayFriendRequests() {
  const token = localStorage.getItem("access-token");

  try {
    const response = await fetch(URL_FRIENDS_API + "/pending", {
      method: "GET",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      const requests = await response.json();

      const pendingList = document.getElementById("pendingRequests");
      pendingList.innerHTML = "";

      // if there are no pending requests, show a message
      if (requests.length === 0) {
        pendingList.innerHTML =
          "<p>Nessuna richiesta di amicizia in sospeso.</p>";
        return;
      }

      console.log(requests);

      let list = `<div class="list-group">`;

      // qua è user perche user è quello che spedisce il porco di dio
      requests.forEach((request) => {
        list += `
        <div class="list-group-item mb-3 shadow-sm rounded p-3 d-flex justify-content-between align-items-center">
          <span>${request.user.username}</span>
          <button class="btn btn-danger btn-sm" onclick="acceptFriendRequest('${request.id}')">Accetta la richiesta</button>
        </div>`;
      });

      list += "</div>";
      pendingList.innerHTML = list;
    }
  } catch (error) {
    console.error("Error loading friend requests");
  }
}

// Display user reviews in the activity tab
async function displayUserReviews() {
  const token = localStorage.getItem("access-token");

  try {
    const response = await fetch(API_REVIEW_URL + "/getByToken", {
      method: "GET",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      const reviews = await response.json();
      console.log("User reviews:", reviews);

      if (reviews.length === 0) {
        document.getElementById("userReviews").innerHTML =
          "<p>Non hai ancora scritto recensioni.</p>";
        return;
      }

      let lista = `<div class="list-group">`;

      reviews.forEach((review) => {
        lista += `
        <div class="list-group-item mb-3 shadow-sm rounded p-3">
          <h5 class="mb-1">${review.manga.title}</h5>
          <small class="text-muted">Data: ${new Date(
            review.creationTimestamp
          ).toLocaleDateString()} | Score: ${review.score}</small>
          <p class="mt-2 mb-3"><strong>Commento:</strong> ${review.text}</p>
          <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-danger" onclick="window.location.href='MangaDetails.html'; localStorage.setItem('currentMangaId', '${
              review.manga.id
            }');">
              Vai al Manga
            </button>
          </div>
        </div>`;
      });

      lista += `</div>`;

      document.getElementById("userReviews").innerHTML = lista;
    }
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}

/**
 * This function allows the user to accept a friend request.
 */
async function acceptFriendRequest(requestId) {
  const token = localStorage.getItem("access-token");

  try {
    const response = await fetch(URL_FRIENDS_API + "/accept/" + requestId, {
      method: "POST",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      console.log("Friend request accepted");

      // update the friends and requests lists
      loadStats();
      displayFriends();
      displayFriendRequests();
    } else {
      console.error("Failed to accept friend request");
    }
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
}

async function sendFriendRequest(friendId) {
  const token = localStorage.getItem("access-token");

  try {
    const response = await fetch(URL_FRIENDS_API + "/send/" + friendId, {
      method: "POST",
      headers: {
        "access-token": token,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Friend request sent");
      // Optionally, you can provide feedback to the user
      alert("Richiesta di amicizia inviata!");
      // Refresh the user search results
      loadUsersFriendSearch();
    } else {
      const errorData = await response.json();
      alert("Errore: " + errorData.message);
    }
  } catch (error) {
    console.error("Error sending friend request:", error);
  }
}

async function loadUsersFriendSearch() {
  const input = document.getElementById("searchUsername").value;
  const list = document.getElementById("searchResults");
  const token = localStorage.getItem("access-token");

  const friendsList = [];
  const friendsListElement = document.getElementById("friends");
  const friends = friendsListElement.getElementsByClassName("list-group-item");

  for (let friend of friends) {
    friendsList.push(friend.querySelector("h5").innerText);
  }
  console.log("Friends List:", friendsList);

  try {
    const response = await fetch(URL_USER_API1 + "/users", {
      method: "GET",
      headers: {
        "access-token": token,
      },
    });

    if (response.ok) {
      const users = await response.json();
      console.log("Search results:", users);

      let lista = `<div class="list-group">`;

      // Filter users based on input
      // Exclude current user and existing friends
      const filteredUsers = users.filter(
        (user) =>
          user.username.toLowerCase().includes(input.toLowerCase()) &&
          user.username !== localStorage.getItem("username") &&
          !friendsList.includes(user.username)
      );

      if (filteredUsers.length === 0) {
        list.innerHTML = "<p>Nessun utente trovato.</p>";
        return;
      }

      filteredUsers.forEach((user) => {
        lista += `
        <div class="list-group-item w-100 mb-3 shadow-sm rounded p-3">
          <div class="row align-items-center">
            <div class="col">
              <h5 class="mb-0">${user.username}</h5>
            </div>
            <div class="col-auto">
              <button class="btn btn-sm btn-secondary" onclick="sendFriendRequest('${user.id}')">Invia richiesta</button>
            </div>
          </div>
        </div>`;
      });

      lista += `</div>`;
      list.innerHTML = lista;
    }
  } catch (error) {
    console.error("Error loading user search:", error);
  }
}

async function showFriendLibrary(friendId, friendUsername) {
  const contentDiv = document.getElementById("friendLibraryContent");
  contentDiv.innerHTML = "";

  document.getElementById(
    "friendLibraryName"
  ).textContent = `${friendUsername}`;

  try {
    const response = await fetch(API_LIBRARY_URL + "/getByUserId/" + friendId, {
      method: "GET",
    });

    if (response.ok) {
      const library = await response.json();

      if (library.length === 0) {
        contentDiv.innerHTML = "<p>La libreria di questo utente è vuota.</p>";
        return;
      }

      let lista = `<div class="list-group">`;
      library.forEach((mangaDto) => {
        lista += `
        <div class="list-group-item mb-3 p-3 bg-white rounded shadow-sm border-start border-danger border-4">
          <div class="row align-items-center">
            <div class="col-auto">
              <img src="${mangaDto.image}" alt="${mangaDto.title} Cover" class="rounded shadow-sm" style="width: 80px; height: 110px; object-fit: cover;">
            </div>
            <div class="col">
              <h5 class="mb-1 text-dark">${mangaDto.title}</h5>
              <p class="mb-2 text-muted small">di ${mangaDto.author.full_name}</p>
              <button class="btn btn-outline-danger btn-sm" onclick="window.location.href='MangaDetails.html'; localStorage.setItem('currentMangaId', '${mangaDto.id}');">
                Leggi dettagli →
              </button>
            </div>
          </div>
        </div>`;
      });
      lista += `</div>`;
      contentDiv.innerHTML = lista;
    }
  } catch (error) {
    console.error("Error loading friend's library:", error);
  }
}

async function saveProfile() {
  const token = localStorage.getItem("access-token");
  const email = document.getElementById("editEmail").value;
  const password = document.getElementById("editPassword").value;
  const username = document.getElementById("editUsername").value;
  const errorDiv = document.getElementById("errors-edit-profile-container");
  errorDiv.innerHTML = "";

  const user = {
    email: email,
    password: password,
    username: username,
  };

  try {
    const response = await fetch(URL_USER_API1 + "/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      errorDiv.innerHTML =
        "<div class='text-success'>Profilo aggiornato con successo!</div>";

      // Aggiorna le statistiche del profilo visualizzate
      loadStats();
      // Aggiorna il nome utente nella navbar
      localStorage.setItem("username", username);
    } else {
      const errorMessage = await response.json();

      errorDiv.innerHTML = "";

      if (errorMessage.errors) {
        for (const field in errorMessage.errors) {
          errorDiv.innerHTML += `<div class="text-danger"> ${errorMessage.errors[field]}</div>`;
        }
      } else if (errorMessage.message) {
        errorDiv.innerHTML = `<div class="text-danger">${errorMessage.message}</div>`;
      }

      return;
    }
  } catch (error) {
    console.error("Errore durante l'aggiornamento del profilo:", error);
    errorDiv.textContent =
      "Si è verificato un errore durante l'aggiornamento del profilo. Riprova più tardi.";
    errorDiv.classList.add("text-danger");
  }
}
