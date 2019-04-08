function Letter(letter, guessed) {
  this.letter = letter;
  this.guessed = guessed;
  this.letterReturn = () => {
    if (this.guessed) {
      return this.letter;
    } else {
      return "_";
    }
  };
  this.letterCheck = char => {
    if (char === this.letter) {
      this.guessed = true;
    }
  };
}

module.exports = Letter;
