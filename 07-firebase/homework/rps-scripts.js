const config = {
  apiKey: "AIzaSyBDYm0HaM2KbvLrD3y-y1scaHrEHnoCpP4",
  authDomain: "rock-paper-scissors-activity.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-activity.firebaseio.com",
  projectId: "rock-paper-scissors-activity",
  storageBucket: "",
  messagingSenderId: "585325472082"
};

firebase.initializeApp(config);

const database = firebase.database();
const chatData = database.ref("/chat");
const playersRef = database.ref("players");
const currentTurnRef = database.ref("turn");
const buttons = `
  <li class="mb-2">
    <button type="button" class="btn btn-lg btn-block btn-secondary" data-value="rock">Rock</button>
  </li>
  <li class="mb-2">
    <button type="button" class="btn btn-lg btn-block btn-secondary" data-value="paper">Paper</button>
  </li>
  <li class="mb-2">
    <button type="button" class="btn btn-lg btn-block btn-secondary" data-value="scissors">Scissors</button>
  </li>
  `;
let username = "Guest";
let currentPlayers = null;
let currentTurn = null;
let playerNum = false;
let playerOneExists = false;
let playerTwoExists = false;
let playerOneData = null;
let playerTwoData = null;

// START GAME
// 1. on click
// 2. on key-press
$("#start-game").click(function() {
  if ($("#name").val() !== "") {
    username = $("#name").val();
    startGame();
  }
});
$("#name").keypress(function(e) {
  if (e.which === 13 && $("#name").val() !== "") {
    username = $("#name").val();
    startGame();
  }
});

// ON-CHANGE (PLAYER DATA)
// 1. check player count - needed for startGame()
// 2. check which players exist - 1 and/or 2
// 3. update display
playersRef.on(
  "value",
  function(snapshot) {
    currentPlayers = snapshot.numChildren();
    playerOneExists = snapshot.child("1").exists();
    playerTwoExists = snapshot.child("2").exists();
    playerOneData = snapshot.child("1").val();
    playerTwoData = snapshot.child("2").val();
    if (playerOneExists) {
      $("#player-1 .name").text(playerOneData.name);
      $("#player-1 .wins").text(playerOneData.wins);
      $("#player-1 .losses").text(playerOneData.losses);
    } else {
      $("#player-1 .name").text("Waiting for Player 1");
      $("#player-1 .wins").text("0");
      $("#player-1 .losses").text("0");
    }
    if (playerTwoExists) {
      $("#player-2 .name").text(playerTwoData.name);
      $("#player-2 .wins").text(playerTwoData.wins);
      $("#player-2 .losses").text(playerTwoData.losses);
    } else {
      $("#player-2 .name").text("Waiting for Player 2");
      $("#player-2 .wins").text("0");
      $("#player-2 .losses").text("0");
    }
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

// ON-CHANGE (TURNS)
// 1.
currentTurnRef.on("value", snapshot => {
  currentTurn = snapshot.val();
  if (playerNum) {
    if (currentTurn === 1) {
      $("#player-1").css("border", "2px solid teal");
      $("#player-2").css("border", "1px solid #00000020");
      if (currentTurn === playerNum) {
        $("#player-turn").text("It's Your Turn!");
        $(`#player-${playerNum} .buttons`)
          .empty()
          .append(buttons);
      } else {
        $("#player-turn").text(`Waiting for ${playerOneData.name} to choose.`);
      }
    } else if (currentTurn === 2) {
      $("#player-2").css("border", "2px solid teal");
      $("#player-1").css("border", "1px solid #00000020");
      if (currentTurn === playerNum) {
        $("#player-turn").text("It's Your Turn!");
        $(`#player-${playerNum} .buttons`)
          .empty()
          .append(buttons);
      } else {
        $("#player-turn").text(`Waiting for ${playerTwoData.name} to choose.`);
      }
    } else if (currentTurn === 3) {
      compareResults(playerOneData.choice, playerTwoData.choice);
      $(`#player-1 .buttons`)
        .empty()
        .append(playerOneData.choice);
      $(`#player-2 .buttons`)
        .empty()
        .append(playerTwoData.choice);
      // clear result
      setTimeout(() => {
        $(`#player-${playerNum} .buttons`).empty();
        $("#result .card-body").empty();
        if (playerOneExists && playerTwoExists) {
          currentTurnRef.set(1);
        }
      }, 3000);
    } else {
      $("#player-1 .buttons").empty();
      $("#player-2 .buttons").empty();
      $("#player-turn").text("Waiting for another player to join.");
      $("#player-2").css("border", "1px solid #00000020");
      $("#player-1").css("border", "1px solid #00000020");
    }
  }
});

// UPDATE TURN
// 1. if only one player, set turn to 1
playersRef.on("child_added", function(snapshot) {
  if (currentPlayers === 1) {
    currentTurnRef.set(1);
  }
});

// UPDATE CHOICE
// 1. on-click of button
$(document).on("click", ".buttons button", function() {
  console.log("click");
  var clickChoice = $(this).attr("data-value");
  playerRef.child("choice").set(clickChoice);
  $(`#player-${playerNum} .buttons`)
    .empty()
    .append(`<li>You chose ${clickChoice}</li>`);

  currentTurnRef.transaction(turn => turn + 1);
});

// START GAME
// 1. assign players a number
// 2. set the player's database with their data
// 3. handle a player leaving - remove data + turns
// 4. update header to display user name + player number
// 5. reject people trying to join a full game
function startGame() {
  if (currentPlayers < 2) {
    if (playerOneExists) {
      playerNum = 2;
    } else {
      playerNum = 1;
    }
    playerRef = database.ref("/players/" + playerNum);
    playerRef.set({
      name: username,
      wins: 0,
      losses: 0,
      choice: null
    });
    playerRef.onDisconnect().remove();
    currentTurnRef.onDisconnect().remove();
    $("#player-form").remove();
    $("#header").prepend(
      `<h2>Hi ${username}! You are Player ${playerNum}</h2>`
    );
  } else {
    alert("Game Full - Try Again Later");
  }
}

// PLAY GAME
function compareResults(player1choice, player2choice) {
  if (
    (player1choice === "rock" && player2choice === "scissors") ||
    (player1choice === "paper" && player2choice === "rock") ||
    (player1choice === "scissors" && player2choice === "paper")
  ) {
    // player 1 wins
    $("#result h2").text(playerOneData.name + " Wins!");
    if (playerNum === 1) {
      playersRef
        .child("1")
        .child("wins")
        .set(playerOneData.wins + 1);
      playersRef
        .child("2")
        .child("losses")
        .set(playerTwoData.losses + 1);
    }
  } else if (
    (player1choice === "paper" && player2choice === "scissors") ||
    (player1choice === "scissors" && player2choice === "rock") ||
    (player1choice === "rock" && player2choice === "paper")
  ) {
    // player 2 wins
    $("#result h2").text(playerTwoData.name + " Wins!");
    if (playerNum === 2) {
      playersRef
        .child("2")
        .child("wins")
        .set(playerTwoData.wins + 1);
      playersRef
        .child("1")
        .child("losses")
        .set(playerOneData.losses + 1);
    }
  } else {
    // tie
    $("#result h2").text("Tie Game!");
  }
}
