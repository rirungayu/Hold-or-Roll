// HTML ELEMENTS
const holdButton = document.querySelector(".holdButton");
const rollButton = document.querySelector(".rollButton");
const newGameButton = document.querySelector(".newGameButton");
const player1Side = document.querySelector(".player1");
const player2Side = document.querySelector(".player2");
const player1ScoreLabel = document.querySelector(".player1score");
const player2ScoreLabel = document.querySelector(".player2score");
const player1CurrentScoreLabel = document.querySelector(".player1currentScore");
const player2CurrentScoreLabel = document.querySelector(".player2currentScore");
const imageTag = document.querySelector(".diceImage");
const game = document.querySelector(".game");
const winner = document.querySelector(".winner");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".close");

//////////////// INITIALIZATION /////////////////////////////////////////////////////////////////////////
let player1Score = 0;
let player2Score = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let rolled;
let activePlayer = "Player 1";
let activePlayerScore = player1Score;
let activePlayerScoreLabel = player1ScoreLabel;
let activePlayerCurrentScore = player1CurrentScore;
let activePlayerCurrentScoreLabel = player1CurrentScoreLabel;

//////////////// BUTTONS ////////////////////////////////////////////////////////////////////////////////
rollButton.addEventListener("click", function () {
  imageTag.setAttribute("src", "./assets/roll.gif");
  setDice();
});

holdButton.addEventListener("click", function () {
  addToTotalScore();
});

newGameButton.addEventListener("click", function () {
  resetValues();
  clearLabels();
  player1Side.classList.add("playerActive");
  player2Side.classList.add("playerInactive");
});

modalButton.addEventListener("click", function () {
  modal.style.display = "none";
  player1Side.classList.add("playerActive");
  player2Side.classList.add("playerInactive");
});

////////////// UTILITY FUNCTIONS///////////////////////////////////////////////////////////////////////
// TO ROLL DICE
function setDice() {
  rolled = Math.trunc(Math.random() * 6) + 1;
  setTimeout(function () {
    imageTag.src = `./assets/${rolled}.png`;
    addToCurrentScore();
  }, 1000);
}

// TO SET SCORES
function addToCurrentScore() {
  if (rolled !== 1) {
    activePlayerCurrentScore = activePlayerCurrentScore + rolled;
  } else {
    activePlayerCurrentScore = 0;
    activePlayerCurrentScoreLabel.textContent = activePlayerCurrentScore;
    changePlayer();
    switchLabels();
  }
  activePlayerCurrentScoreLabel.textContent = activePlayerCurrentScore;
}

function addToTotalScore() {
  activePlayerScore = Number(activePlayerScoreLabel.textContent);
  const totalScore = activePlayerScore + activePlayerCurrentScore;
  activePlayerScoreLabel.textContent = totalScore;
  activePlayerCurrentScore = 0;
  activePlayerCurrentScoreLabel.textContent = activePlayerCurrentScore;
  if (totalScore >= 50) {
    player1Side.classList.remove("playerActive", "playerInactive");
    player2Side.classList.remove("playerActive", "playerInactive");
    winner.textContent = `${activePlayer} Wins!!!`;
    modal.style.display = "block";
  } else {
    changePlayer();
    switchLabels();
  }
}

// TO SWITCH PLAYERS
function changePlayer() {
  player1Side.classList.toggle("playerActive");
  player1Side.classList.toggle("playerInactive");
  player2Side.classList.toggle("playerActive");
  player2Side.classList.toggle("playerInactive");
}

function switchLabels() {
  if (activePlayer === "Player 1") {
    activePlayer = "Player 2";
    activePlayerScore = player2Score;
    activePlayerScoreLabel = player2ScoreLabel;
    activePlayerCurrentScore = player2CurrentScore;
    activePlayerCurrentScoreLabel = player2CurrentScoreLabel;
  } else {
    activePlayer = "Player 1";
    activePlayerScore = player1Score;
    activePlayerScoreLabel = player1ScoreLabel;
    activePlayerCurrentScore = player1CurrentScore;
    activePlayerCurrentScoreLabel = player1CurrentScoreLabel;
  }
}

// TO RESTART THE GAME
function resetValues() {
  player1Score = 0;
  player2Score = 0;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
}

function clearLabels() {
  player1CurrentScoreLabel.textContent = 0;
  player2CurrentScoreLabel.textContent = 0;
  player1ScoreLabel.textContent = 0;
  player2ScoreLabel.textContent = 0;
}

///////////////////////// GAME LOGIC ////////////////////////////////////////////////////////////////////////
/*
player 1 active
player 1 rolls
    if 1, switch to player 2 active
    else, display appropriate dice, add number to current score
player 1 holds
add current score to total score
    if total score => 100, end game
    else switch to player 2 active
new game
empty all labels
reset all scores

*/
