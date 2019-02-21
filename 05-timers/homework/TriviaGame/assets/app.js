const trivia = [
  {
    question: "What was Edith's prison name?",
    options: ["Dead Eyes", "Sunflower", "Stilty Paws", "Peg Leg"],
    answer: "Sunflower",
    image: "assets/images/sunflower.gif"
  },
  {
    question: "What is Edith's core value?",
    options: ["Walks", "Treats", "Trauma", "Fish"],
    answer: "Fish",
    image: "assets/images/fish.gif"
  },
  {
    question: "What does Edith's bark sound like?",
    options: ["Roof.", "Bark!", "Bruff.", "Grrrr!"],
    answer: "Bruff.",
    image: "assets/images/bruff.gif"
  },
  {
    question: "How many rodents has Edith killed this past year?",
    options: ["10", "1", "2", "7"],
    answer: "10",
    image: "assets/images/rodent.gif"
  },
  {
    question: "How old is Edith?",
    options: ["10", "3", "5", "7"],
    answer: "7",
    image: "assets/images/birthday.gif"
  },
  {
    question: "What is Edith's middle name?",
    options: ["Bouvier", "Butternut", "Pumpkinseed", "Peppercorn"],
    answer: "Peppercorn",
    image: "assets/images/pepper.gif"
  }
];

let currentQuestion = 0;
let startTimer;
let count = 15;
let userPick;
let correctAnswer;
let numRight = 0;
let numWrong = 0;
let numNoAnswer = 0;

let startRound = function() {
  loadQuestion(trivia[currentQuestion]);
  $("#question ul button").on("click", function() {
    userPick = this.innerHTML;
    correctAnswer = trivia[currentQuestion].answer;

    clearInterval(startTimer);

    if (userPick === correctAnswer) {
      numRight++;
      $("#answer h2").text("You are correct!");
      loadAnswer(trivia[currentQuestion]);
    } else {
      numWrong++;
      $("#answer h2").text("Nope!");
      loadAnswer(trivia[currentQuestion]);
    }
  });
};

let loadQuestion = function(data) {
  $("#timer span").text(count);
  $("#question h2").text(data.question);
  for (let i = 0; i < data.options.length; i++) {
    $("#question ul").append(
      `<li><button id="option-${i}">${data.options[i]}</button></li>`
    );
  }
  startTimer = setInterval(loadTimer, 1000);

  $("#start").hide();
  $("#question").show();
};

let loadAnswer = function(data) {
  $("#answer figure").append(
    `<figcaption>Correct answer: ${data.answer}</figcaption>`
  );
  $("#answer figure").append(`<img src=${data.image} alt=""/>`);
  $("#question").hide();
  $("#answer").show();

  setTimeout(function() {
    resetRound();
    currentQuestion++;
    if (currentQuestion <= trivia.length - 1) {
      startRound();
    } else {
      $("#results").show();
      $("#results ul")
        .append(`<li>Correct Answers: ${numRight}</li>`)
        .append(`<li>Inorrect Answers: ${numWrong}</li>`)
        .append(`<li>Unanswered: ${numNoAnswer}</li>`);
    }
  }, 1000 * 3);
};

let resetRound = function() {
  count = 15;
  $("#question h2").text("");
  $("#question ul").html("");
  $("#answer h2").text("");
  $("#answer figure").html("");
  $("#results h2").text("");
  $("#results ul").html("");
};

let loadTimer = function() {
  count--;
  $("#timer span").text(count);
  if (count === 0) {
    numNoAnswer++;
    clearInterval(startTimer);
    $("#answer h2").text("Out of time!");
    loadAnswer();
  }
};

// initial state
$("#timer").hide();
$("#question").hide();
$("#answer").hide();
$("#results").hide();

$(document).ready(function() {
  $("#start").on("click", function() {
    $("#timer").show();
    startRound();
  });

  $("#reset").on("click", function() {
    currentQuestion = 0;
    numRight = 0;
    numWrong = 0;
    numNoAnswer = 0;
    resetRound();
    $("#results").hide();

    startRound();
  });
});
