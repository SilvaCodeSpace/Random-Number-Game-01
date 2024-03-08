let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const attemps = document.querySelector(".attempts");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

attemps.textContent = 10;

function checkGuess(e) {
  e.preventDefault();
  let userGuess = Number(guessField.value);

  /* Prevent empty guess field entry */
  if (guessField.value === "") {
    alert("Please enter a Number");
    return;
  } /*End empty field prevention */

  attemps.textContent = 10 - guessCount;

  const guess = document.createElement("p");

  lastResult.style.display = "block";

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations!";
    lastResult.style.backgroundColor = "rgb(157,193,131)";
    lastResult.style.color = "black";
    lowOrHi.textContent = "";
    document.getElementById("congrats-confetti").style.display = "block";
    document.getElementById("gameoverpage").style.display = "flex";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "Perdiste :(";
    document.getElementById("gameoverpage").style.display = "flex";
    setGameOver();
  } else {
    lastResult.textContent = "Nope!";
    lastResult.style.backgroundColor = "rgba(188,85,75,0.5)";
    lastResult.style.padding = "0.5em";
    if (userGuess > 100 || userGuess < 1) {
      lowOrHi.textContent = "introduce un numero entre 1 y 100";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Fue muy alto!";
      guess.textContent = userGuess;
      guesses.appendChild(guess);
    } else if (userGuess < randomNumber) {
      lowOrHi.textContent = "Fue muy bajo!";
      guess.textContent = userGuess;
      guesses.appendChild(guess);
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.style.width = "30%";
  resetButton.style.position = "relative";
  resetButton.textContent = "Start new game";
  document.getElementById("gameoverdiv").appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  attemps.textContent = 10;
  guesses.textContent = "";
  lastResult.style.display = "none";

  randomNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById("congrats-confetti").style.display = "none";
  document.getElementById("gameoverpage").style.display = "none";
}
