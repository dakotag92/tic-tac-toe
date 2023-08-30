let xTurn = true;
let x = document.getElementById("icon-selector-img1");
let o = document.getElementById("icon-selector-img2");
let gameMode = document.querySelectorAll(".game-mode");

let activeButton1 = function () {
  x.classList.add("button-active");
  o.classList.remove("button-active");
  localStorage.setItem("selectedIcon", "x");
};
let activeButton2 = function () {
  o.classList.add("button-active");
  x.classList.remove("button-active");
  localStorage.setItem("selectedIcon", "o");
};

for (let i = 0; i < gameMode.length; i++) {
  gameMode[i].addEventListener("click", (event) => {
    const mode = event.target.id;
    localStorage.setItem("gameMode", mode);
    window.location.href = "gameboard.html";
  });
}

x.addEventListener("click", activeButton1);
o.addEventListener("click", activeButton2);

//BEGINNING OF GAMEBOARD CODE
