var config = {
  apiKey: "AIzaSyDz1LwfRwPUlI4i6gKrLWLnwj0xDFILur0",
  authDomain: "upenn-bootcamp-firebase.firebaseapp.com",
  databaseURL: "https://upenn-bootcamp-firebase.firebaseio.com",
  projectId: "upenn-bootcamp-firebase",
  storageBucket: "upenn-bootcamp-firebase.appspot.com",
  messagingSenderId: "653330938611"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function() {
  event.preventDefault();

  var name = $("#name")
    .val()
    .trim();
  var role = $("#role")
    .val()
    .trim();
  var startDate = moment(
    $("#startDate")
      .val()
      .trim(),
    "YYYY-MM-DD"
  ).format("X");
  var rate = $("#rate")
    .val()
    .trim();

  console.log(startDate);

  database.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    rate: rate
  });

  alert("Employee successfully added");
  $("#name").val("");
  $("#role").val("");
  $("#startDate").val("");
  $("#rate").val("");
});

database.ref().on(
  "child_added",
  function(snapshot) {
    const sv = snapshot.val();

    var startFormatted = moment.unix(sv.startDate).format("MM-DD-YYYY");
    var monthsWorked = moment().diff(moment(sv.startDate, "X"), "months");
    var totalBilled = monthsWorked * sv.rate;

    $("#table-body").append(`
    <tr>
      <td>${sv.name}</td>
      <td>${sv.role}</td>
      <td>${startFormatted}</td>
      <td>${monthsWorked}</td>
      <td>${sv.rate}</td>
      <td>${totalBilled}</td>
    </tr>
  `);
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
