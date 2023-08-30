let restart = document.getElementById("restart");
const gameBlocks = document.querySelectorAll(".gameBlocks");
let currentTurn = localStorage.getItem("selectedIcon") === "x" ? "x" : "o";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function checkWin() {
  for (let combo of WINNING_COMBINATIONS) {
    if (combo.every((i) => gameBlocks[i].getAttribute("data-player") === "x")) {
      announceWinner("X wins!");
      return "x";
    } else if (
      combo.every((i) => gameBlocks[i].getAttribute("data-player") === "o")
    ) {
      announceWinner("O wins!");
      return "o";
    }
  }
  return null;
}

function announceWinner(message) {
  alert(message);

  // Remove spin class from all blocks and make them unclickable
  for (let block of gameBlocks) {
    block.classList.remove("spin");
    block.removeEventListener("click", spin);
  }
}

function spin(event) {
  const element = event.target;

  if (
    !element.classList.contains("spin") &&
    !element.hasAttribute("data-player")
  ) {
    element.classList.add("spin");

    let icon = currentTurn === "x" ? "icon-x.svg" : "icon-o.svg";
    let altText = currentTurn === "x" ? "x" : "o";
    element.innerHTML = `<img src="./assets/${icon}" alt="${altText}" />`;

    // Set the current player attribute to the block
    element.setAttribute("data-player", currentTurn);

    const winner = checkWin();
    if (winner) {
      // We have moved the logic to handle the win condition to the announceWinner function
    } else {
      // Toggle the current player's turn only if there isn't a winner
      currentTurn = currentTurn === "x" ? "o" : "x";
    }
  }
}

for (let i = 0; i < gameBlocks.length; i++) {
  gameBlocks[i].addEventListener("click", spin);
}

restart.addEventListener("click", () => {
  for (let block of gameBlocks) {
    block.classList.remove("spin");
    block.innerHTML = "";
    block.removeAttribute("data-player");
    block.addEventListener("click", spin); // Re-add the click listener for each block
  }
  currentTurn = localStorage.getItem("selectedIcon") === "x" ? "x" : "o";
});
