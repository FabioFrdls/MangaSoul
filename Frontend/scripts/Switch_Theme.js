let clicked = 0;
const themeSwitcher = document.getElementById("themeSwitcher");

themeSwitcher.addEventListener("click", () => {
    if (clicked === 0) {
        document.documentElement.classList.toggle("inverted");
        themeSwitcher.src = "images/switch_bianco_nero/soul_eater_moon.png";
        clicked = 1;
    } else {
        document.documentElement.classList.toggle("inverted");
        themeSwitcher.src = "images/switch_bianco_nero/soul_eater_sun.png";
        clicked = 0;
    }
});
