const words = [
  "Edith",
  "Fish",
  "Adopted",
  "StreetDog",
  "Bearded",
  "KillsRats",
  "Squirrel",
  "Treats",
  "Bruff"
];

//===== variables
//============================

let winCount = document.querySelector("[data-target='winCount']");
let lossCount = document.querySelector("[data-target='lossCount']");
let currentWord = document.querySelector("[data-target='currentWord']");
let guesses = document.querySelector("[data-target='guesses']");
let letters = document.querySelector("[data-target='letters']");

let wins = 0;
let losses = 0;
let remainingGuesses;
let letterList = [];
let word;

//===== functions
//============================

function startGame() {
  // pick a random word from the list
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  // reset guesses
  remainingGuesses = 8;
  updateRemainingGuesses();

  // display word
  for (let i = 0; i < word.length; i++) {
    let span = document.createElement("span");
    let node = document.createTextNode(word[i]);
    span.appendChild(node);
    currentWord.appendChild(span);
    console.log(word.charAt(i));
  }
}

function resetGame() {
  updateScore();
  letterList = [];
  updateLetterList();
  currentWord.innerHTML = "";
  startGame();
}

function handleGuess() {
  remainingGuesses--;
  updateRemainingGuesses();
  if (remainingGuesses === 0) {
    losses++;
    resetGame();
  }
}

function updateRemainingGuesses() {
  guesses.innerHTML = remainingGuesses;
}

function updateScore() {
  winCount.innerHTML = wins;
  lossCount.innerHTML = losses;
}

function updateLetterList(letter) {
  // TODO: check to see if letter already exists
  letterList.push(letter);
  exportedLetterList = letterList.join(" ");
  letters.innerHTML = exportedLetterList;
}

function isAlpha() {
  var charCode = event.keyCode;
  if (
    (charCode > 64 && charCode < 91) ||
    (charCode > 96 && charCode < 123) ||
    charCode == 8
  ) {
    return true;
  } else {
    return false;
  }
}

//===== main process
//============================

startGame();
updateScore();

document.onkeyup = function(event) {
  let letter = event.key.toUpperCase();

  // don't run program if letter was already guessed
  if (letterList.includes(letter)) {
    handleGuess();
  } else if (isAlpha(letter)) {
    // if the letter is in the word...
    if (word.indexOf(letter) > -1) {
      let letterIndexes = [];
      // find the location of the letter in the word
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) letterIndexes.push(i);
      }
      // show the relevant span(s) based on the indexes
      let spans = document.querySelectorAll("[data-target='currentWord'] span");
      for (let i = 0; i < letterIndexes.length; i++) {
        spans[letterIndexes[i]].classList.add("show");
      }
      // add letter to letter list
      updateLetterList(letter);

      var visibleLetters = document.getElementsByClassName("show");
      var alertDelay = 250; // quarter of a second
      if (visibleLetters.length === word.length) {
        setTimeout(function() {
          wins++;
          alert("You win! Bruff.");
          resetGame();
        }, alertDelay);
      }
    } else {
      // add letter to letter list
      updateLetterList(letter);
      // subtract a turn
      handleGuess();
    }
  }
};
