const inquirer = require("inquirer");

let playerCount = 0;
let round = 0;
let maxRounds = 5;
let team = [];
let defense = 0;
let offense = 0;
let starters = [];
let subs = [];
let score = 0;

// Constructor
function Player(name, position, offense, defense) {
  this.name = name;
  this.position = position;
  this.offense = offense;
  this.defense = defense;
  this.goodGame = () => {
    let coinFlip = Math.floor(Math.random * 1) + 1;
    if (coinFlip === 1) {
      offense++;
    }
  };
  this.badGame = () => {
    let coinFlip = Math.floor(Math.random * 1) + 1;
    if (coinFlip === 1) {
      defense++;
    }
  };
  this.printStats = () => {
    console.log(
      "Name: " +
        this.name +
        "\nPosition: " +
        this.position +
        "\nOffense: " +
        this.offense +
        "\nDefense: " +
        this.defense +
        "\n---------------"
    );
  };
}

// Functions
const playGame = () => {
  console.log("\n--------\nplayGame()\n---------");
  if (round < maxRounds) {
    playRound();
  } else {
    endGame();
  }
};

function endGame() {
  console.log("\nFINAL SCORE: " + score + "\n");

  if (score > 0) {
    console.log(
      "Good game, everyone!\nYour current starters' stats have improved!"
    );
    for (var i = 0; i < starters.length; i++) {
      starters[i].goodGame();
    }
  }

  if (score < 0) {
    console.log(
      "That was a poor performance!\nYour current starters' stats have decreased!"
    );
    for (var i = 0; i < starters.length; i++) {
      starters[i].badGame();
    }
  }
  if (score === 0) {
    console.log("It was a tie game! Not good. Not bad.");
  }

  inquirer
    .prompt({
      name: "again",
      type: "confirm",
      message: "Would you like to play another match?"
    })
    .then(function(answer) {
      if (answer.again === true) {
        round = 0;
        playGame();
      } else {
        "\nDefense: " + console.log("Come back again soon!");
      }
    });
}

const askQuestion = function() {
  if (playerCount < 3) {
    console.log("NEW PLAYER");
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the player's name?"
        },
        {
          type: "list",
          name: "position",
          choices: [new inquirer.Separator(), "starter", "sub"],
          message: "What is their position?"
        },
        {
          type: "list",
          name: "offense",
          choices: [
            new inquirer.Separator(),
            "10 (amazing!)",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2",
            "1 (not so great)"
          ],
          message: "Pick a number that reflects the player's offensive skills."
        },
        {
          type: "list",
          name: "defense",
          choices: [
            new inquirer.Separator(),
            "10 (amazing!)",
            "9",
            "8",
            "7",
            "6",
            "5",
            "4",
            "3",
            "2",
            "1 (not so great)"
          ],
          message: "Pick a number that reflects the player's defensive skills."
        }
      ])
      .then(function(answers) {
        let printPlayer = new Player(
          answers.name,
          answers.position,
          answers.offense,
          answers.defense
        );
        team.push(printPlayer);
        team.forEach(player => {
          if (player.position === "starter") {
            starters.push(player);
          }
          if (player.position === "sub") {
            subs.push(player);
          }
        });
        playerCount++;
        askQuestion();
      });
  } else {
    for (let x = 0; x < team.length; x++) {
      team[x].printStats();
    }
    playRound();
  }
};

const calcStats = players => {
  players.forEach(player => {
    defense += parseInt(player.defense);
    offense += parseInt(player.offense);
  });
};

let playRound = function() {
  round++;
  console.log(`ROUND: ${round}`);
  calcStats(team);

  for (let x = 0; x < 5; x++) {
    let randNum1 = Math.floor(Math.random() * 20) + 1;
    let randNum2 = Math.floor(Math.random() * 20) + 1;

    if (randNum1 < offense) {
      score++;
    }
    if (randNum2 < defense) {
      score--;
    }
    subPlayer();
  }
  displayResults();
};

const displayResults = () => {
  if (score > 0) {
    console.log("You lost.");
  } else if (score < 0) {
    console.log("You won.");
  } else {
    console.log("Neutral?");
  }
};

const subPlayer = () => {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Would you like to substitute a starter player with a sub?",
        default: true
      }
    ])
    .then(function(answer) {
      if (answer.confirm === true) {
        inquirer
          .prompt([
            {
              name: "sub",
              type: "rawlist",
              message: "Who would you like to sub in?",
              choices: subs
            }
          ])
          .then(function(subIn) {
            let sideline = {};
            let number = 0;
            for (let i = 0; i < subs.length; i++) {
              if (subs[i].name === subIn.sub) {
                number = i;
                sideline = subs[i];
              }
            }
            inquirer
              .prompt([
                {
                  name: "sub",
                  type: "rawlist",
                  message: "Who would you like to sub out?",
                  choices: starters
                }
              ])
              .then(function(subOut) {
                for (let i = 0; i < starters.length; i++) {
                  if (starters[i].name === subOut.sub) {
                    subs[number] = starters[i];
                    starters[i] = sideline;
                    console.log("SUBSTITUTION MADE!");
                  }
                }
                playRound();
              });
          });
      } else {
        playRound();
      }
    });
};

// call askQuestion to run our code
askQuestion();
