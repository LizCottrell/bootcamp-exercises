$(document).ready(function() {
  // set variables
  let crystal1 = 0;
  let crystal2 = 0;
  let crystal3 = 0;
  let crystal4 = 0;
  let target = 0;
  let score = 0;
  let wins = 0;
  let losses = 0;

  // set functions
  function initializeNewGame() {
    // set random numbers
    crystal1 = 1 + Math.floor(Math.random() * 12);
    crystal2 = 1 + Math.floor(Math.random() * 12);
    crystal3 = 1 + Math.floor(Math.random() * 12);
    crystal4 = 1 + Math.floor(Math.random() * 12);
    target = 19 + Math.floor(Math.random() * 101);
    score = 0;

    // update display
    $('span[data-target="wins"]').text(wins);
    $('span[data-target="losses"]').text(losses);
    $('p[data-target="number"]').text(target);
    $('span[data-target="score"]').text(score);
  }

  function updateScore() {
    $('span[data-target="score"]').text(score);
  }

  function checkForWin() {
    if (score === target) {
      setTimeout(function() {
        alert("🔮 You've won! 🔮");
        wins++;
        $('span[data-target="wins"]').text(wins);
        initializeNewGame();
      }, 50);
    } else if (score > target) {
      setTimeout(function() {
        alert("💀 You've lost! 💀");
        losses++;
        $('span[data-target="losses"]').text(losses);
        initializeNewGame();
      }, 50);
    }
  }

  // start game
  initializeNewGame();

  // clicking crystals adds points to score
  $("div[data-target='crystal1']").click(function() {
    score += crystal1;
    updateScore();
    checkForWin();
  });
  $("div[data-target='crystal2']").click(function() {
    score += crystal2;
    updateScore();
    checkForWin();
  });
  $("div[data-target='crystal3']").click(function() {
    score += crystal3;
    updateScore();
    checkForWin();
  });
  $("div[data-target='crystal4']").click(function() {
    score += crystal4;
    updateScore();
    checkForWin();
  });
});
