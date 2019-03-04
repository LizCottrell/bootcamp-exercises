// Initialize Firebase (YOUR OWN APP)
var config = {
  apiKey: "AIzaSyDKp9dV9ufQTSkjxjBbEMURJLQRDmr3vSg",
  authDomain: "testproject-290fd.firebaseapp.com",
  databaseURL: "https://testproject-290fd.firebaseio.com",
  projectId: "testproject-290fd",
  storageBucket: "testproject-290fd.appspot.com",
  messagingSenderId: "540813625846"
};

firebase.initializeApp(config);

var database = firebase.database();
var initialValue = 100; // Set Initial Counter
var clickCounter = initialValue;

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
database.ref().on(
  "value",
  function(snapshot) {
    console.log(snapshot.val());
    clickCounter = snapshot.val().clickCount;
    $("#click-value").text(snapshot.val().clickCount);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

// Print the initial data to the console.

// Change the html to reflect the initial value.
$("#click-value").text(clickCounter);

// Change the clickCounter to match the data in the database

// Log the value of the clickCounter

// Change the HTML Value

// If any errors are experienced, log them to console.

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#click-button").on("click", function() {
  // Reduce the clickCounter by 1
  clickCounter--;
  // Alert User and reset the counter
  // Save new value to Firebase
  database.ref().set({
    clickCount: clickCounter
  });
  // Log the value of clickCounter
});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {
  // Set the clickCounter back to initialValue
  clickCounter = 100;
  // Save new value to Firebase
  database.ref().set({
    clickCount: clickCounter
  });
  // Log the value of clickCounter
  // Change the HTML Values
  $("#click-value").text(clickCounter);
});
