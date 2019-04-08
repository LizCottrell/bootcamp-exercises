const Letter = require("./Letter");

function Word(word) {
  this.word = word;
  this.returnWord = () => {
    return this.word.join("");
  };
  this.guessCheck = letter => {
    this.word.forEach(Letter.letterCheck);
  };
}

module.exports = Word;
