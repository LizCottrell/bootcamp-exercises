// Display questions
questions.map(question => {
  $("#questions").append(`
    <div class="form-group mb-5">
      <label for="q${question.id}">
        <strong>Question ${question.id}</strong>
        <br />
        ${question.question}
      </label><br> 
      <select class="chosen-select" id="q${question.id}">
        <option value=""></option>
        <option value="1">1 (Strongly Disagree)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (Strongly Agree)</option>
      </select>
    </div>
  `)
})

// Chosen CSS
var config = {
  ".chosen-select": {},
  ".chosen-select-deselect": {
    allow_single_deselect: true
  },
  ".chosen-select-no-single": {
    disable_search_threshold: 10
  },
  ".chosen-select-no-results": {
    no_results_text: "Oops, nothing found!"
  },
  ".chosen-select-width": {
    width: "95%"
  }
};

for (var selector in config) {
  $(selector).chosen(config[selector]);
}

// Capture the form inputs
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Form validation
  function validateForm() {
    var isValid = true;
    $(".form-control").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });

    $(".chosen-select").each(function() {

      if ($(this).val() === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  // If all required fields are filled
  if (validateForm()) {
    // Create an object for the user"s data
    var userData = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      scores: [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
      ]
    };

    // AJAX post the data to the friends API.
    $.post("/api/friends", userData, function(data) {
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);
      $("#results-modal").modal("toggle");
    });
  } else {
    alert("Please fill out all fields before submitting!");
  }
});