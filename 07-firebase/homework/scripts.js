var config = {
  apiKey: "AIzaSyDVxLsaoasVbatt9sR41-NmqWk_Wd44J24",
  authDomain: "train-activity-ec.firebaseapp.com",
  databaseURL: "https://train-activity-ec.firebaseio.com",
  projectId: "train-activity-ec",
  storageBucket: "train-activity-ec.appspot.com",
  messagingSenderId: "926647257758"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function() {
  event.preventDefault();

  var name = $("#name")
    .val()
    .trim();
  var role = $("#destination")
    .val()
    .trim();
  var firstTrainTime = $("#firstTrainTime")
    .val()
    .trim();
  var frequency = moment(
    $("#frequency")
      .val()
      .trim(),
    "YYYY-MM-DD"
  ).format("X");

  database.ref().push({
    name: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

  alert("Train successfully added");
  $("#name").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});

database.ref().on(
  "child_added",
  function(snapshot) {
    const sv = snapshot.val();

    var firstTrain = moment.unix(sv.firstTrainTime).format("MM-DD-YYYY");
    var minAway = moment().diff(moment(sv.firstTrainTime, "X"), "months");
    var nextArrival = monthsWorked * sv.rate;

    $("#table-body").append(`
    <tr>
      <td>${sv.name}</td>
      <td>${sv.destination}</td>
      <td>${sv.frequency}</td>
      <td>${nextArrival}</td>
      <td>${minAway}</td>
    </tr>
  `);
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
