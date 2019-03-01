var apiKey = "cPHJBG5W7YeAMoUu72FUXO12yFNCVrsB";

var topics = [
  "Mommie Dearest",
  "Carrie Fisher",
  "Joan Crawford",
  "Little Edie",
  "Debbie Reynolds"
];

function displayGifs() {
  var params = $(this).attr("data-name");
  var queryURL = `http://api.giphy.com/v1/gifs/search?q=${params}&api_key=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (let i = 0; i < 10; i++) {
      var gif = $(`
      <button class="gif card btn btn-light m-4 d-flex justify-content-center" style="width: 18rem;">
        <img 
          src="${response.data[i].images.fixed_height_still.url}" 
          data-still="${response.data[i].images.fixed_height_still.url}"
          data-animate="${response.data[i].images.fixed_height.url}"
          data-state="still" 
          class="card-img-top" 
          alt="..."
        >
        <div class="card-body">
          <p class="card-text">Rating: ${response.data[i].rating}</p>
        </div>
      </button>
    `);
      $("#gifs").prepend(gif);
    }

    $(".gif").on("click", function() {
      var state = $("img", this).attr("data-state");

      if (state === "still") {
        $("img", this).attr("src", $("img", this).attr("data-animate"));
        $("img", this).attr("data-state", "animate");
      } else {
        $("img", this).attr("src", $("img", this).attr("data-still"));
        $("img", this).attr("data-state", "still");
      }
    });
  });
}

function renderButtons() {
  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++) {
    var a = $(
      `<button class='topic btn btn-secondary mr-3 mb-3' data-name='${
        topics[i]
      }'>
        ${topics[i]}
      </button>`
    );
    $("#buttons").append(a);
  }
}

$("#add-topic").on("click", function(event) {
  event.preventDefault();
  var topic = $("#topic-input")
    .val()
    .trim();

  topics.push(topic);

  renderButtons();
});

$(document).on("click", ".topic", displayGifs);
renderButtons();
