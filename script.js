"use strict";

let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

window.addEventListener("load", () => {
  updateScores();
});
const options = document.querySelectorAll(".option");
const optionsDiv = document.querySelector(".options");
const playerScoreElement = document.querySelector(".player-score");
const computerScoreElement = document.querySelector(".computer-score");
const result = document.querySelector(".result");
const playerPicked = document.querySelector(".player-picked");
const computerPicked = document.querySelector(".computer-picked");
const gameResult = document.querySelector(".game-result");
const playAgain = document.querySelector(".play-again");
const finalJudgement = document.querySelector(".final-judgement");
const hurrayPage = document.querySelector(".hurray-page");
const mainPage = document.querySelector(".main-page");
const next = document.querySelector(".next");
const restartButton = document.querySelector(".restart");
const rules = document.querySelector(".rules");
const ruleBox = document.querySelector(".rule-box");
const cross = document.querySelector(".cross");


function computerOption() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // get player choice from id of image
    const playerChoice = e.currentTarget
      .querySelector("img")
      .getAttribute("id");
    playRound(playerChoice);
  });
});

function updateScores() {
  playerScoreElement.innerText = playerScore;
  computerScoreElement.innerText = computerScore;
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    playerScore++;
    return "player";
  } else {
    computerScore++;
    return "computer";
  }
}

function playRound(playerChoice) {
  const computerChoice = computerOption();
  const winner = determineWinner(playerChoice, computerChoice);
  console.log(
    `Player: ${playerChoice}, Computer: ${computerChoice}, Winner: ${winner}`
  );

  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
  updateScores();


  optionsDiv.style.display = "none";
  result.style.display = "block";


  if (winner === "computer") {
    finalJudgement.innerText = "YOU LOST";
    gameResult.innerText = "AGAINST PC";
    computerPicked.classList.add("green-bg");
    next.style.display = "none";
  } else if (winner === "player") {
    finalJudgement.innerText = "YOU WON";
    gameResult.innerText = "AGAINST PC";
    playerPicked.classList.add("green-bg");
    next.style.display = "block";
  } else {
    finalJudgement.innerText = "TIE UP";
    gameResult.innerText = "";
    next.style.display = "none";
  }


  if (winner === "tie") {
    playAgain.innerText = "REPLAY";
  } else {
    playAgain.innerText = "PLAY AGAIN";
  }


  playerPicked.src = `./assets/${playerChoice}.svg`;
  computerPicked.src = `./assets/${computerChoice}.svg`;


  playAgain.addEventListener("click", () => {
    optionsDiv.style.display = "block";
    result.style.display = "none";
    computerPicked.classList.remove("green-bg");
    playerPicked.classList.remove("green-bg");
  });


  next.addEventListener("click", () => {
    mainPage.style.display = "none";
    hurrayPage.style.display = "block";
    next.style.display = "none";
  });

  // restart the game
  restartButton.addEventListener("click", () => {
    mainPage.style.display = "block";
    hurrayPage.style.display = "none";
    optionsDiv.style.display = "block";
    result.style.display = "none";
    playerPicked.classList.remove("green-bg");
  });
}

// toggle rules
rules.addEventListener("click", () => {
  ruleBox.style.display = "block";
});
cross.addEventListener("click", () => {
  ruleBox.style.display = "none";
});

