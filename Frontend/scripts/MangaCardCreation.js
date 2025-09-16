const MangaLink = "http://localhost:8080/api/manga";
const GenresLink = "http://localhost:8080/api/genres"
const genreBox = document.getElementById("genresBox");
const reviewLink = "http://localhost:8080/api/review";
const API_LIB_URL = `http://localhost:8080/api/library`;
let scoreFiltredHigh = false;
let scoreFiltredLow = false;
let genresFiltred = false;
let authorFiltred = false;
let scoreBox = document.getElementById("scorebtn");
let dateFiltredLow = false;
let dateFiltredHigh = false;
let dateBox = document.getElementById("datebtn");
let scorebtnClickedTime = 0;
let datebtnClickedTime = 0;

//---------------library methods---------------------------//

      // getAll manga
async function getAll() {
  cardContainer.innerHTML = "";

  try {
    const response = await fetch(API_LIB_URL, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access-token"),
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella richiesta: " + response.status);
    }

    const data = await response.json();

    // alcuni endpoint possono restituire direttamente un array,
    // altri invece un oggetto con proprietà "content"
    const lib = Array.isArray(data) ? data : data.content;

    if (!lib || lib.length === 0) {
      cardContainer.innerHTML = "<p class='center'>Nessun manga trovato.</p>";
      return [];
    }
    return lib;

  } catch (err) {
    console.error("Errore nella ricerca:", err);
    return [];
  }
}

  // insert
async function libInsert(manga){
  
    try{
      const response = await fetch(API_LIB_URL ,{
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access-token"),
      },
      body: JSON.stringify(manga),
      })
      
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      const msg = await response.text();
      console.log(msg);
      return msg;
      }
      catch{(err => console.error(err))};
}

    // update

async function update(manga, status, fav){
  try{
    const response = await fetch(API_LIB_URL + `/id/${manga.id}?status=${encodeURIComponent(status)}&fav=${encodeURIComponent(fav)}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access-token"),
    },
    })
    
      if (!response.ok) {
        throw new Error("Errore nella richiesta: " + response.status);
      }
      const msg = await response.text();
      console.log(msg);
      return msg;
    }
    catch{((err) => console.error("Errore nella ricerca:", err))};    
}

    // remove
async function remove(query){
  return new Promise((resolve, reject) => {
    // if a banner exists yet, we first delete it
  let oldBanner = document.getElementById("confirmBanner" + query);
  if (oldBanner) oldBanner.remove();

  // Create the banner container
  let remBanner = document.createElement("div");
  remBanner.id = "confirmBanner" + query;
  remBanner.classList.add("confirm-banner");

  // insert the html in the banner
  remBanner.innerHTML = `
    <p>Vuoi davvero eliminare questo manga dalla libreria?</p>
    <div class="btn-group">
      <button id="confirmYes" class="btn btn-danger">Elimina</button>
      <button id="confirmNo" class="btn btn-secondary">Annulla</button>
    </div>
  `;
  document.body.appendChild(remBanner);
    // if yes
  document.getElementById("confirmYes").onclick = async () => {
    try{
        const response = await fetch(API_LIB_URL + `/id/${query}`,{
        method: "DELETE",
        headers: {
        Authorization: localStorage.getItem("access-token"),
          },
        })
        if (!response.ok) {
          throw new Error("Errore nella richiesta: " + response.status);
        }
        const msg = await response.text();
        console.log(msg);
        resolve(true);
        }  
    catch (err) {
      console.error("Errore nella ricerca:", err)
      reject(err);
    }
    finally{remBanner.remove()} // hide the banner

  };
  // if no
    document.getElementById("confirmNo").onclick = () => {
    remBanner.remove();
      resolve(false);
    };
  });
}
//---------------------------------------------------------//


let cardContainer = document.getElementById("cardContainer"); // html made div
let authorBox = document.getElementById("authorSearch"); // i get the input element
//function for getting all genres
function deployGenres() {
  fetch(GenresLink + "/get")
    .then(response => response.json())
    .then(genres => {
      genreBox.innerHTML = "";


      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- nessuno --";
      genreBox.appendChild(defaultOption);


      genres.forEach(genre => {
        let option = document.createElement("option");
        option.value = genre.name;
        option.textContent = genre.name;
        genreBox.appendChild(option);
      });
    })
    .catch(err => console.error("Errore nel caricamento generi:", err));
}

  // function to recall user's library and favs
async function userSet(log) {
  let libSet = new Array;
  let favSet = new Array;
  let result = [libSet, favSet];
  
  if(log === false)
    return result;

  cardContainer.innerHTML = "";

      const saved = await getAll(); // ritorna lista di library
    saved.forEach(lib => {
      if (lib.manga.id) {
        libSet.push(lib.manga.id);
        if (lib.fav === "si") {
          favSet.push(lib.manga.id);
        }
      }
    });
    console.log("Library:", libSet);
    console.log("Favorites:", favSet);
    return result;
  }

// function to update the buttons in real time
// this function uses recursion to overwrite itself at every onclick event
function btnUpdate(manga, libSet, favSet, library, favorite){
  let libMessage = "";
  let favMessage = "";

  if(libSet.find(id => id == manga.id)){                            // in this case the user cannot add again the manga
        library.textContent = "📘";                   
        libMessage = "Rimuovi dalla libreria";
        library.onclick = async () => {
        let res = await remove(manga.id);
        if(res){
          libSet.pop(manga.id); 
          btnUpdate(manga, libSet, favSet, library, favorite);
        }                  
      };
        if(!favSet.find(id => id == manga.id)){
          favorite.textContent = "🤍";                             
          favMessage = "Aggiungi ai preferiti";
          favorite.onclick = () => {
            update(manga, "", "si");
            favSet.push(manga.id);
            btnUpdate(manga, libSet, favSet, library, favorite);
            
          };
        }
          
        else{
          favorite.textContent = "❤️";
          favMessage = "Rimuovi dai preferiti";
          favorite.onclick = () => {
            update(manga, "", "no");
            favSet.pop(manga.id);
            btnUpdate(manga, libSet, favSet, library, favorite);
          };
        }
          
      }


  else if(!libSet.find(id => id == manga.id)){      // verify that the manga is in the user library yet
                                                    // if not, the user can add it
      library.textContent = "📙";                                                    
      favorite.textContent = "🤍";
      libMessage = "Aggiungi alla libreria";                                       // the message changes due to the condition
      favMessage = "Aggiungi ai preferiti";
      library.onclick = () => {
        libInsert(manga);                   // inserts the manga in the library
        libSet.push(manga.id);
        btnUpdate(manga, libSet, favSet, library, favorite);
      };
      favorite.onclick = async () => {
        try {
          await libInsert(manga);
          libSet.push(manga.id);
          btnUpdate(manga, libSet, favSet, library, favorite);

          await update(manga, "", "si");
          favSet.push(manga.id);
          btnUpdate(manga, libSet, favSet, library, favorite);

        } catch (err) {
          console.error(err);
      }
};

      }
      library.title = libMessage;
      favorite.title = favMessage;
}

// function for creating a card given a manga object
function createCard(manga, log, libSet, favSet) {
  let card = document.createElement("div"); // in all the part like this i create element and give details
  card.classList.add("card");
  card.setAttribute("id", "card" + manga.id);

  // buttons
  let btnContainer = document.createElement("div");
  btnContainer.classList.add("button-container")
  let library = document.createElement("button");
    library.classList.add("library");
    
  let favorite = document.createElement("button");
    favorite.classList.add("favorite");
    favorite.textContent = "🤍";          
    let libMessage = "";
    let favMessage = "";
    library.setAttribute("title", libMessage);
    favorite.setAttribute("title", favMessage);

          // user not logged
    if(!log){         // check that the user is logged
      library.textContent = "📙";
      favorite.textContent = "🤍";
      libMessage = "Aggiungi alla libreria";
      favMessage = "Aggiungi ai preferiti"; 
      let oldBanner = document.getElementById("Warning");
        if (oldBanner) oldBanner.remove();

    // Create the banner container
    let logBanner = document.createElement("div");
    logBanner.id = "log-Banner";
    logBanner.classList.add("log-banner");
      // insert the html in the banner
    logBanner.innerHTML = `
      <p id="message"></p>
      <div class="btn-group">
        <button id="Accedi" class="btn log-btn btn-primary">Accedi</button>
        <button id="Indietro" class="btn  log-btn btn-secondary">Indietro</button>
      </div>
      `;
      let btns = logBanner.getElementsByClassName("log-btn");
      
      // if accedi
      btns[0].onclick = () => {
        window.location.href = "login.html";
      };
        
      // if indietro
      btns[1].onclick = () => {
      logBanner.remove();
      };
      
      library.onclick = () => {
        document.body.appendChild(logBanner);
        document.getElementById("message").textContent = "Devi essere loggato per aggiungere un manga in libreria";
      };
      favorite.onclick = () => {
        document.body.appendChild(logBanner);  
        document.getElementById("message").textContent = "Devi essere loggato per aggiungere un manga ai preferiti";
      };
    }
              // user logged
    else{
      btnUpdate(manga, libSet, favSet, library, favorite);
    }
      
    
    btnContainer.append(library, favorite);

  let img = document.createElement("img");
  img.src = manga.image;
  img.alt = manga.title;

  let title = document.createElement("h3");
  title.textContent = manga.title;

  // let year = document.createElement("p");
  // year.textContent = "Anno d'uscita: " + manga.year;

  let author = document.createElement("p");
  author.textContent = "Autore: " + manga.author.full_name;

  // let editor = document.createElement("p");
  // editor.textContent = "Pubblicazione italiana: " + manga.editor_name;

  // let volumes = document.createElement("p");
  // volumes.textContent = "Numeri volumi: " + manga.volumes;

  // let status = document.createElement("p");
  // status.textContent = "Stato: " + manga.status;

  card.addEventListener("click", (e) => {
    if (e.target.matches(".favorite") || e.target.matches(".library") ) {
      return;
    }
    openMangaDetails(manga)
  })


  card.append(img, title, author, btnContainer); // in this part i m giving the card all the info

  return card; // return the card to be appended
}

// function to deploy all cards
function deploymentCard(log, libSet, favSet) {
  cardContainer.innerHTML = ""; // we make that there is space for new element
  fetch(MangaLink + "/find")
    .then(response => response.json()) // i receive the json
    .then(mangas => { // i use the json as array
      originalMangas = mangas;
      if (genresFiltred) {
        mangas = mangas.filter(manga =>
          manga.genres.some(g => g.name === genreBox.value)
        );
      }
      if (authorFiltred && authorBox.value.trim() !== "") {
        mangas = mangas.filter(manga =>
          manga.author.full_name.toLowerCase().includes(authorBox.value.trim().toLowerCase())
        );
      }
      if (scoreFiltredLow) {
        mangas = mangas.sort((a, b) => a.score - b.score); //sort by the lowest score
      }
      if (scoreFiltredHigh) {
        mangas = mangas.sort((a, b) => b.score - a.score);//sort by the highest score
      }
      if(dateFiltredLow){
        mangas=mangas.sort((a,b)=> a.year-b.year);//sort by the lowest year
      }
      if(dateFiltredHigh){
        mangas=mangas.sort((a,b)=> b.year-a.year);//sort by the highest year
      }

      mangas.forEach(manga => { // find all the element of the array
        cardContainer.appendChild(createCard(manga, log, libSet, favSet)); // giving the card to the html made div 
      });
    })
    .catch(err => console.error("Errore nel fetch:", err));
}

// function to deploy cards on input
function cardCreationByInput() {
  let input = document.getElementById("search"); // i get the input element
  let query = input.value.trim().toLowerCase(); // i take the value of the input
  cardContainer.innerHTML = ""; // i clear the container

  if (query === "") {
    deploymentCard(); // if there is no input it deploy all the card
    return; // i stop the function
  }

  fetch(MangaLink + "/findWkeyWords?keywords=" + encodeURIComponent(query)) // i call the endpoint with query param
    .then(response => response.json())
    .then(mangas => {
      if (mangas.length === 0) {
        cardContainer.innerHTML = "<p>Nessun manga trovato.</p>"; // verify if there is something that match input
        return;
      }
      if (genresFiltred) {
        mangas = mangas.filter(manga =>
          manga.genres.some(g => g.name === genreBox.value)
        );
      }
      if (authorFiltred && authorBox.value.trim() !== "") {
        mangas = mangas.filter(manga =>
          manga.author.full_name.toLowerCase().includes(authorBox.value.trim().toLowerCase())
        );
      }

      mangas.forEach(manga => { // find all the element of the array
        cardContainer.appendChild(createCard(manga)); // giving the card to the html made div 
      });
    })
    .catch(err => console.error("Errore nella ricerca:", err));
}
function cardCreationByAuthorInput() {
  let input = document.getElementById("authorSearch"); // i get the input element
  let query = input.value.trim(); // i take the value of the input
  cardContainer.innerHTML = ""; // i clear the container

  if (query === "") {
    deploymentCard(); // if there is no input it deploy all the card
    return; // i stop the function
  }

  fetch(MangaLink + "/authorInput?keywords=" + encodeURIComponent(query)) // i call the endpoint with query param
    .then(response => response.json())
    .then(mangas => {
      if (mangas.length === 0) {
        cardContainer.innerHTML = "<p>Nessun manga trovato.</p>"; // verify if there is something that match input
        return;
      }
      if (genresFiltred) {
        mangas = mangas.filter(manga =>
          manga.genres.some(g => g.name === genreBox.value)
        );
      }

      mangas.forEach(manga => { // find all the element of the array
        cardContainer.appendChild(createCard(manga)); // giving the card to the html made div 
      });
    })
    .catch(err => console.error("Errore nella ricerca:", err));
}

// this is needed for postReview
let currentMangaId = null;
//for the opening of the dynamic page
function openMangaDetails(manga) {

  const params = new URLSearchParams({
    id: manga.id,
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

  localStorage.setItem("currentMangaId", manga.id);

}
// function to open modal with details
function openModel(manga) {

  // openModel stores manga id so that backend Post method can know which manga it is
  currentMangaId = manga.id;

  console.log(manga);
  let modal = document.getElementById("modal");
  let closeButton = document.getElementById("closeButton");

  let img = document.getElementById("mangaImage");
  img.src = manga.image;
  img.alt = manga.title;

  let title = document.getElementById("mangaTitle");
  title.textContent = manga.title;

  let summary = document.getElementById("mangaSummaryBody");
  summary.textContent = manga.summary;

  let genr = document.getElementById("mangaGenresBody");
  genr.textContent = manga.genres.map(g => g.name).join(", ");

  let year = document.getElementById("mangaYearBody");
  year.textContent = manga.year;

  let author = document.getElementById("mangaAuthorBody");
  author.textContent = manga.author.full_name;

  let editor = document.getElementById("mangaEditorBody");
  editor.textContent = manga.editor_name;

  let volumes = document.getElementById("mangaVolumesBody");
  volumes.textContent = manga.volumes;

  let status = document.getElementById("mangaStatusBody");
  status.textContent = manga.status;

  let score = document.getElementById("mangaScoreBody");
  score.textContent = manga.score;

  modal.style.display = "flex";
  closeButton.onclick = () => {
    modal.style.display = "none";
  };
}


// run on load
window.onload = async () => {
  let log;
  if(!localStorage.getItem("access-token"))         // check that the user is logged
    log = false;
  else
    log = true;
  let set = await userSet(log);
  deploymentCard(log, set[0], set[1]); // charging all the card on the start of the website
  let input = document.getElementById("search");
  input.addEventListener("input", () => {
    cardCreationByInput();
  });

  let inputOffAuthor = document.getElementById("authorSearch")
  // i add a listener so when i type, the function cardCreationByInput is called
  deployGenres();
  inputOffAuthor.addEventListener("input", () => {
    if (authorBox.value !== "") {
      authorFiltred = true;
      cardCreationByAuthorInput()
      return;
    }
    authorFiltred = false;
    deploymentCard();
  }
  )




};
//eventListener that verify if the button of score is clicked and change it
scoreBox.addEventListener("click", () => { 
  if (scorebtnClickedTime === 0) {
    scorebtnClickedTime = 1;
    scoreBox.classList.add("clicked") //make the button red until it came back to the point of origin
    scoreBox.textContent = "crescente"
    scoreFiltredLow = true; //boolean to verify in the deployment method if the method of filter is active 
    scoreFiltredHigh = false; //boolean to verify in the deployment method if the method of filter is active 
    deploymentCard();
    return;
  }
  if (scorebtnClickedTime === 1) {
    scorebtnClickedTime = 2;
    scoreBox.textContent = "decrescente"
    scoreFiltredLow = false;
    scoreFiltredHigh = true;
    deploymentCard();
    return;
  }
  if (scorebtnClickedTime === 2) {
    scorebtnClickedTime = 0;
    scoreBox.textContent = "Valutazione"
    scoreBox.classList.remove("clicked")
    scoreFiltredLow = false;
    scoreFiltredHigh = false;
    deploymentCard();
    return;
  }
})
//eventListener that verify if the button of date is clicked and change it
dateBox.addEventListener("click", () => {
  if (datebtnClickedTime === 0) {
    datebtnClickedTime = 1;
    dateBox.classList.add("clicked") //make the button red until it came back to the point of origin
    dateBox.textContent = "crescente"
    dateFiltredLow = true; //boolean to verify in the deployment method if the method of filter is active 
    dateFiltredHigh = false;//boolean to verify in the deployment method if the method of filter is active 
    deploymentCard();
    return;
  }
  if (datebtnClickedTime === 1) {
    datebtnClickedTime = 2;
    dateBox.textContent = "decrescente"
    dateFiltredLow = false;
    dateFiltredHigh = true;
    deploymentCard();
    return;
  }
  if (datebtnClickedTime === 2) {
    datebtnClickedTime = 0;
    dateBox.textContent = "Data Pubblicazione"
    dateBox.classList.remove("clicked")
    dateFiltredLow = false;
    dateFiltredHigh = false;
    deploymentCard();
    return;
  }
})

genreBox.addEventListener("change", () => {
  if (genreBox.value !== "") {
    genresFiltred = true
    deploymentCard();
    return;
  }
  genresFiltred = false;
  deploymentCard();
})
