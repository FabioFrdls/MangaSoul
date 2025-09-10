/**
 * Script per lo scorrimento dello scroller
 * dei manga presente nella home page
 * 
 * */

const scroller = document.getElementById("manga-scroller");
const leftBtn = document.querySelector(".scroller-btn.left");
const rightBtn = document.querySelector(".scroller-btn.right");

leftBtn.addEventListener("click", () => {
    scroller.scrollBy({ left: -300, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
    scroller.scrollBy({ left: 300, behavior: "smooth" });
});


/**
 * Script per effettuare la fetch e caricare
 * le card per lo scroller della home
 * 
 * */


const URL_MANGA_API = "http://localhost:8080/api/manga";

document.addEventListener("DOMContentLoaded", () => {
  mangaScroller();
});

async function mangaScroller() {
  const mangaScr = document.getElementById("manga-scroller");
  mangaScr.innerHTML = "";

  try {
    const response = await fetch(URL_MANGA_API + "/top");

    if (response.ok) {
      const mangas = await response.json();
      console.log(mangas);

      let cards = "";

      mangas.forEach(manga => {
        cards += `<div class="card">
                    <img src="${manga.image}" alt="${manga.title}">
                    <h3>${manga.title}</h3>
                  </div>`;
      });

      mangaScr.innerHTML = cards;
    } else {
      mangaScr.innerHTML = '<div class="alert alert-warning">Nessun manga trovato</div>';
    }
  } catch (error) {
    console.error(error);
    mangaScr.innerHTML = '<div class="alert alert-danger">Errore di connessione dati</div>';
  }
}