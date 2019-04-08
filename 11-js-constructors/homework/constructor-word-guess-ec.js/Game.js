const Word = require("./Word");
var inquirer = require("inquirer");

let wordList = ["Edith", "Fish", "Treats", "Bearded", "Insecure", "Hungry"];

function playGame(list) {
  let randNum = Math.floor(Math.random() * wordList.length) + 1;
  let word = new Word(wordList[randNum]);
  console.log(word);

  inquirer
    .prompt([
      {
        name: "guess",
        message: "Guess a letter!"
        // validate: function(value) {
        //   if (/[a-zA-Z]/.match(value)) {
        //     return true;
        //   }
        //   return false;
        // }
      }
    ])
    .then(function(answer) {
      word.guessCheck(answer);
    });
}

playGame(wordList);
