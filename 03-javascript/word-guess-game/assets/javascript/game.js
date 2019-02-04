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
let score = document.querySelector("[data-target='score']");
let currentWord = document.querySelector("[data-target='currentWord']");
let guesses = document.querySelector("[data-target='guesses']");
let letters = document.querySelector("[data-target='letters']");

let wins = 0;
let remainingGuesses;
let letterList = [];
let word;

//===== functions
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

function updateScore() {
  score.innerHTML = wins;
}

function updateLetterList(letter) {
  // TODO: check to see if letter already exists
  letterList.push(letter);
  exportedLetterList = letterList.join(" ");
  letters.innerHTML = exportedLetterList;
}

function updateRemainingGuesses() {
  guesses.innerHTML = remainingGuesses;
}

//===== main process

startGame();
updateScore();

document.onkeyup = function(event) {
  let key = event.key.toUpperCase();
  // if key press is any of the letters, show those letters
  if (word.indexOf(key) > -1) {
    // find the indexOf(key)
    let indices = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] === key) indices.push(i);
    }
    // add .show to the relevant span(s)
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
    remainingGuesses--;
    updateRemainingGuesses();
  }
};
