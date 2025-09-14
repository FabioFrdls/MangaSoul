let clicked = 0;
const themeSwitcher = document.getElementById("themeSwitcher");

themeSwitcher.addEventListener("click", () => {
  if (clicked === 0) {
    document.documentElement.classList.toggle("inverted");
    themeSwitcher.src = "images/switch_bianco_nero/soul_eater_moon.png";
    clicked = 1;

    let theme = "white";
    localStorage.setItem("theme", theme);
  } else {
    document.documentElement.classList.toggle("inverted");
    themeSwitcher.src = "images/switch_bianco_nero/soul_eater_sun.png";
    clicked = 0;

    let theme = "black";
    localStorage.setItem("theme", theme);
  }
});




/** 
 * Questa funzione serve per rendere persistente il colore
 * del tema
 * 
*/
document.addEventListener("DOMContentLoaded", function(){
    
    const theme = localStorage.getItem("theme");
    
    if(theme === "white"){
        document.documentElement.classList.add("inverted");
        themeSwitcher.src = "images/switch_bianco_nero/soul_eater_moon.png";
        clicked = 1; 
    } else {
        document.documentElement.classList.remove("inverted");
        themeSwitcher.src = "images/switch_bianco_nero/soul_eater_sun.png";
        clicked = 0;
       
        if (!theme) {
            localStorage.setItem("theme", "black");
        }
    }
});
