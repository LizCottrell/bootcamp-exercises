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
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrainTime = moment(
    $("#firstTrainTime")
      .val()
      .trim(),
    "HH:mm A"
  ).format("X");
  var frequency = $("#frequency")
    .val()
    .trim();

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

    console.log("snapshot frequency: ", sv.frequency);
    console.log("snapshot first train: ", sv.firstTrainTime);

    var diffInMin = moment().diff(moment(sv.firstTrainTime, "X"), "minutes");
    var minAway = sv.frequency - (diffInMin % sv.frequency);
    var nextArrival = moment(sv.firstTrainTime, "X")
      .add(diffInMin + minAway, "minutes")
      .format("LT");

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
