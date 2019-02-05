const words = [
  "Edith",
  "Fish",
  "Adopted",
  "StreetDog",
  "Bearded",
  "KillsRats",
  "Squirrel",
  "Treats"
];

//===== variables
//============================

let score = document.querySelector("[data-target='score']");
let currentWord = document.querySelector("[data-target='currentWord']");
let guesses = document.querySelector("[data-target='guesses']");
let letters = document.querySelector("[data-target='letters']");

let wins = 0;
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

function logGuess() {
  remainingGuesses--;
  updateRemainingGuesses();
  if (remainingGuesses === 0) {
    wins--;
    updateScore();
    letterList = [];
    updateLetterList();
    currentWord.innerHTML = "";
    startGame();
  }
}

function updateRemainingGuesses() {
  guesses.innerHTML = remainingGuesses;
}

function updateScore() {
  score.innerHTML = wins;
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
  let key = event.key.toUpperCase();

  // don't run program if letter was already guessed
  if (letterList.includes(key)) {
    logGuess();
  } else if (isAlpha(key)) {
    // only run program if keypress is a letter
    // if key press is any of the letters, show those letters
    if (word.indexOf(key) > -1) {
      // find the indexOf(key)
      let indices = [];
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) indices.push(i);
      }
      // show the relevant span(s)
      let spans = document.querySelectorAll("[data-target='currentWord'] span");
      for (let i = 0; i < indices.length; i++) {
        spans[indices[i]].classList.add("show");
      }
      // add key to letter list
      updateLetterList(key);
    } else {
      // add key to letter list
      updateLetterList(key);
      // subtract a turn
      logGuess();
    }
  }
};
