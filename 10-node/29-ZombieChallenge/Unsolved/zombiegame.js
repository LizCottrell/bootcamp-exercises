// INSTRUCTIONS: Build a command-line based zombie fighting game.
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).

// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5.
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again.

// The game ends when you or the zombie gets to 0 health.

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic will need to be inside the .then() function for your prompt.

// ===========================================================================================================

var inquirer = require("inquirer");

var userHealth = 70;
var zombieHealth = 15;

var playGame = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "🧟‍ Guess a number between 1 and 5! 🧟‍",
        choices: ["1", "2", "3", "4", "5"],
        name: "guess"
      }
    ])
    .then(function(response) {
      var randNum = Math.floor(Math.random() * 5) + 1;
      console.log(response.guess);
      console.log(randNum.toString());
      if (response.guess === randNum.toString()) {
        zombieHealth -= randNum;
        console.log(`
          \nYOU hit the zombie with ${response.guess} damage!!
          You have ${userHealth} health. The zombie has ${zombieHealth} health\n
        `);
        checkScore();
      } else {
        userHealth -= randNum;
        console.log(`
          \nNO! The zombie slashed you with ${response.guess} damage!!
          You have ${userHealth} health. The zombie has ${zombieHealth} health\n  
        `);
        checkScore();
      }
    });
};

var checkScore = () => {
  if (zombieHealth <= 0) {
    console.log("You defeated the zombie! YOU WIN 😘💕");
  } else if (userHealth <= 0) {
    console.log("The zombie killed you ☠️.. you LOSE 🧟‍🖤");
  } else {
    playGame();
  }
};

playGame();
