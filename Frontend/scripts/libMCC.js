// this is a custom version of MangaCardCreation for Library methods

//---------------library methods---------------------------//
    // update

function update(lib){
    
    fetch(API_LIB_URL + `/id/${lib.manga.id}?status=${encodeURIComponent(lib.status)}&fav=${encodeURIComponent(lib.fav)}`,{
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("access-token"),
    },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      return response.text();
    })
    .then((message) => {
      console.log(message);
    })
    .catch((err) => console.error("Errore nella ricerca:", err));    
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
  currentMangaId = manga.id;
  localStorage.setItem("currentMangaId", currentMangaId);
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

function getStatusIcon(s) {
  switch (s) {
    case "da leggere": return "📒";
    case "in lettura": return "📗";
    case "completato": return "📘";
    case "abbandonato": return "📕";
    default: return "📙";
  }
}

let cardContainer = document.getElementById("cardContainer"); // html made div

function createCard(lib) {
    let manga = lib.manga;
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", "card" + manga.id);

    let buttons = document.createElement("div");
    buttons.classList.add("buttons-container"); 
    
    // status buttons
    let statusWrapper = document.createElement("div");
    statusWrapper.classList.add("dropdown");

    let status = document.createElement("button");
    status.title = "cambia stato";
    status.textContent = getStatusIcon(lib.status);

    status.classList.add("btn", "btn-light", "dropdown-toggle", "status");
    status.setAttribute("type", "button");
    status.setAttribute("data-bs-toggle", "dropdown");
    status.setAttribute("aria-expanded", "false");

    let statusMenu = document.createElement("ul");
    statusMenu.classList.add("dropdown-menu");

    let stats = ["", "da leggere", "in lettura", "completato", "abbandonato"];
    stats.forEach((stat) => {
      let updateItem = document.createElement("li");
      let updateLink = document.createElement("a");
      updateLink.classList.add("dropdown-item", "text-danger");
      updateLink.href = "#";
      updateLink.textContent = stat;
      updateLink.onclick = () => {
      lib.status = updateLink.textContent;
      status.textContent = getStatusIcon(lib.status);
      update(lib);
      };
      updateItem.appendChild(updateLink);
      statusMenu.appendChild(updateItem);
      updateItem.appendChild(updateLink);
    })
    statusWrapper.append(status, statusMenu);

    // fav button
    let fav = document.createElement("button");
    fav.title = "";
    if(lib.fav === "si"){
      fav.title = "rimuovi dai preferiti";
      fav.textContent = "❤️";
    }
    else{
      fav.title = "aggiungi ai preferiti";
      fav.textContent = "🤍";
    }
    fav.classList.add("favorite");
    fav.onclick = () => {
      let newFav = lib.fav === "si" ? "no" : "si";
      lib.fav = newFav;
      fav.textContent = lib.fav === "si" ? "❤️" : "🤍";
      fav.title = lib.fav === "si" ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";
      update(lib);
    };


    // remove button
    let removeBtn = document.createElement("button");
    removeBtn.title = "rimuovi dalla libreria";
    removeBtn.textContent = "❌";
    removeBtn.classList.add("remove");
    removeBtn.onclick = () => {
    remove(manga.id);
    };

    buttons.append(statusWrapper, fav, removeBtn);
    
    let img = document.createElement("img");
    img.src = manga.image;
    img.alt = manga.title;

    let title = document.createElement("h3");
    title.textContent = manga.title;

    card.append(buttons, img, title);
    card.onclick = (e) => {
      if (e.target.matches(".status") || 
          e.target.matches(".favorite") || 
          e.target.matches(".remove") || 
          e.target.matches("a")){
        
      return;
    }
      openMangaDetails(manga);
    }
    
    return card; 
}