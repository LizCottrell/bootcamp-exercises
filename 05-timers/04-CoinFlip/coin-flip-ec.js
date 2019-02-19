// Coin Flip JavaScript
// These variables are declared for us.
var headsCount = 0;
var tailsCount = 0;
var wins = 0;
var losses = 0;

function flipThatCoin(result) {
  var randomNumber = Math.floor(Math.random() * 2);
  var coinDisplay = document.getElementById("coin-image");

  if (randomNumber === 0) {
    coinDisplay.innerHTML =
      "<img src='http://random-ize.com/coin-flip/us-quarter/us-quarter-front.jpg' alt='heads' />";
  } else {
    coinDisplay.innerHTML =
      "<img src='http://random-ize.com/coin-flip/us-quarter/us-quarter-back.jpg' alt='heads' />";
  }

  if (result === randomNumber) {
    wins++;
    document.getElementById("win-lose").innerHTML = "<h2>Winner!</h2>";
    document.getElementById("wins").innerHTML = wins;
  } else {
    losses++;
    document.getElementById("win-lose").innerHTML = "<h2>Loser!</h2>";
    document.getElementById("losses").innerHTML = losses;
  }
}

// This on click function has been completed for us.
$("#heads").on("click", function() {
  headsCount++;
  $("#heads-chosen").text(headsCount);
  $("#guess").html("<b>Heads</b>");
  flipThatCoin(0);
});

$("#tails").on("click", function() {
  tailsCount++;
  $("#tails-chosen").text(tailsCount);
  $("#guess").html("<b>Tails</b>");
  flipThatCoin(1);
});
