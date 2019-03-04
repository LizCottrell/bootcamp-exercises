// Initialize Firebase
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

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

//  At the page load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
// If Firebase has a highPrice and highBidder stored (first case)
// Set the variables for highBidder/highPrice equal to the stored values in firebase.
// highPrice = ...
// highBidder = ...
// Change the HTML to reflect the stored values
// Print the data to the console.
// Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
// Change the HTML to reflect the initial values
// Print the data to the console.

database.ref().on(
  "value",
  function(snapshot) {
    console.log(snapshot.val());
    if (snapshot.val().length > 0) {
      highPrice = snapshot.val().highPrice;
      highBidder = snapshot.val().highBidder;
      $("#highest-bidder").text(snapshot.val().name);
      $("#highest-price").text(snapshot.val().price);
    } else {
      $("#highest-bidder").text(initialBidder);
      $("#highest-price").text(initialBid);
    }
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
// prevent form from submitting with event.preventDefault() or returning false
// Get the input values
// Log the Bidder and Price (Even if not the highest)
// If Then statements to compare against previous high bidder
// Alert that they are High Bidder
// Save the new price in Firebase
// Log the new High Price
// Store the new high price and bidder name as a local variable (could have also used the firebase variable)
// Change the HTML to reflect the new high price and bidder
// Else tell user their bid was too low via alert

$("#submit-bid").on("click", function(event) {
  event.preventDefault();
  name = $("#bidder-name")
    .val()
    .trim();
  price = $("#bidder-price")
    .val()
    .trim();
  console.log("highPrice: ", highPrice);
  console.log("highBidder: ", highBidder);
  if (highPrice > price) {
    alert("Your bid was too low. Try again.");
  } else {
    alert("You won! You're now the high bidder.");
    database.ref().set({
      name: name,
      price: price
    });

    database.ref().on(
      "value",
      function(snapshot) {
        $("#highest-bidder").text(snapshot.val().name);
        $("#highest-price").text(snapshot.val().price);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }
});
