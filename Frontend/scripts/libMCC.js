// this is a custom version of MangaCardCreation for Library methods

//---------------library methods---------------------------//
    // update
async function update(query){
  try {
    const response = await fetch(API_LIB_URL + `/id/${query}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    });
    if (!response.ok) {
      throw new Error("Errore nella richiesta: " + response.status);
    }

    const library = await response.json();
    let status = library.status;
    let fav = library.fav;

    // div creation
    
    // if a window exists yet, we first delete it
let oldOptions = document.getElementById("options" + query);
if (oldOptions) oldOptions.remove();

let options = document.createElement("div");
options.id = "options" + query;
options.classList.add("update-options");

// ---- STATUS ----
let statusLabel = document.createElement("label");
statusLabel.setAttribute("for", "status" + query);
statusLabel.textContent = "Stato di lettura";

let statusSelect = document.createElement("select");
statusSelect.id = "status" + query;
statusSelect.name = "status";
statusSelect.classList.add("form-control", "filter-inline");

["nessuno", "da leggere", "in lettura", "completato", "abbandonato"].forEach((val) => {
  let opt = document.createElement("option");
  opt.value = val;
  opt.textContent = val === "" ? status : val.charAt(0).toUpperCase() + val.slice(1);
  statusSelect.appendChild(opt);
});

// ---- FAV ----
let favLabel = document.createElement("label");
favLabel.setAttribute("for", "fav" + query);
favLabel.textContent = "Preferiti";

let favSelect = document.createElement("select");
favSelect.id = "fav" + query;
favSelect.name = "fav";
favSelect.classList.add("form-control", "filter-inline");

["no", "si"].forEach((val) => {
  let opt = document.createElement("option");
  opt.value = val;
  opt.textContent = val === "" ? fav : val.charAt(0).toUpperCase() + val.slice(1);
  favSelect.appendChild(opt);
});

    // create the update button
let updateBtn = document.createElement("button");
updateBtn.innerHTML = "Applica modifiche";
updateBtn.onclick = () => {
    fetch(API_LIB_URL + `/id/${query}?status=${encodeURIComponent(statusSelect.value)}&fav=${encodeURIComponent(favSelect.value)}`,{
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("access-token"),
    },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      options.remove();
      return response.text();
    })
    .then((message) => {
      console.log(message);
    })
    .catch((err) => console.error("Errore nella ricerca:", err));  
};

    // create the cancel button
    let cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "Annulla";
    cancelBtn.onclick = () => {
    options.remove();
  };
// ---- Append elements ----
options.appendChild(statusLabel);
options.appendChild(statusSelect);
options.appendChild(favLabel);
options.appendChild(favSelect);
options.appendChild(updateBtn);
options.appendChild(cancelBtn);

// append to card
document.body.appendChild(options);
  } catch (err) {
    console.error("Errore nella ricerca:", err);
  }
  
}

    // remove
function remove(query){
    // if a banner exists yet, we first delete it
  let oldBanner = document.getElementById("confirmBanner" + query);
  if (oldBanner) oldBanner.remove();

  // Create the banner container
  let banner = document.createElement("div");
  banner.id = "confirmBanner" + query;
  banner.classList.add("confirm-banner");

  // insert the html in the banner
  banner.innerHTML = `
    <p>Vuoi davvero eliminare questo manga dalla libreria?</p>
    <div class="btn-group">
      <button id="confirmYes" class="btn btn-danger">Elimina</button>
      <button id="confirmNo" class="btn btn-secondary">Annulla</button>
    </div>
  `;


  document.body.appendChild(banner);
    // if yes
  document.getElementById("confirmYes").onclick = () => {
  fetch(API_LIB_URL + `/id/${query}`,{
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("access-token"),
    },
  })
  .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      cardContainer.removeChild(document.getElementById("card" + query));  
      return response.text();
    })
    .then((message) => {
      console.log(message);
    })
    .catch((err) => console.error("Errore nella ricerca:", err))
    .finally(() => banner.remove()); // hide the banner
    }
    // if no
    document.getElementById("confirmNo").onclick = () => {
    banner.remove();
  };
}
//---------------------------------------------------------//

//------------manga details method-------------------------//
let currentMangaId = null;
//for the opening of the dynamic page
function openMangaDetails(manga) {

  const params = new URLSearchParams({
    title: manga.title,
    summary: manga.summary,
    year: manga.year,
    image: manga.image,
    volumes: manga.volumes,
    editor: manga.editor_name,
    score: manga.score,
    status: manga.status,
    author: manga.author.full_name,
    genres: JSON.stringify(manga.genres)
  }).toString();
  window.open("MangaDetails.html?" + params, "_blank")
}

//---------------------------------------------------------//

let cardContainer = document.getElementById("cardContainer"); // html made div

function createCard(manga) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", "card" + manga.id);
    let img = document.createElement("img");
    img.src = manga.image;
    img.alt = manga.title;

    let title = document.createElement("h3");
    title.textContent = manga.title;

    let dropdownWrapper = document.createElement("div");
dropdownWrapper.classList.add("dropdown");

// menu button
let dropdownToggle = document.createElement("button");
dropdownToggle.classList.add("btn", "btn-light", "dropdown-toggle");
dropdownToggle.setAttribute("type", "button");
dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
dropdownToggle.setAttribute("aria-expanded", "false");
dropdownToggle.innerHTML = "⋮"; // tre puntini verticali

// dropdown menu
let dropdownMenu = document.createElement("ul");
dropdownMenu.classList.add("dropdown-menu");

// delete item
let deleteItem = document.createElement("li");
let deleteLink = document.createElement("a");
deleteLink.classList.add("dropdown-item", "text-danger");
deleteLink.href = "#";
deleteLink.textContent = "Elimina";
deleteLink.onclick = () => {
    remove(manga.id);
    };
deleteItem.appendChild(deleteLink);

// update item
let updateItem = document.createElement("li");
let updateLink = document.createElement("a");
updateLink.classList.add("dropdown-item", "text-danger");
updateLink.href = "#";
updateLink.textContent = "Aggiorna";
updateLink.onclick = () => {
    update(manga.id);
    };
updateItem.appendChild(updateLink);

// info item
let infoItem = document.createElement("li");
let infoLink = document.createElement("a");
infoLink.classList.add("dropdown-item", "text-danger");
infoLink.href = "#";
infoLink.textContent = "Vai alla pagina del manga";
infoItem.appendChild(infoLink);
infoLink.onclick = () => {
    openMangaDetails(manga)
  };

// addm itmes to menu
dropdownMenu.appendChild(deleteItem);
dropdownMenu.appendChild(updateItem);
dropdownMenu.appendChild(infoItem);

// add button menu to the wrapper
dropdownWrapper.append(dropdownToggle, dropdownMenu);

    card.append(dropdownWrapper, img, title);
    return card; 
}