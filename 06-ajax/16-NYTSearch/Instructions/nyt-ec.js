var searchTerm;
var numberOfRecords;
var startYear;
var endYear;

var apiKey = "YDCfs2qABWmPGM9bZTyAqMcPFA9OOjZ5";
var queryURL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  apiKey +
  "&q=" +
  searchTerm;

$("#formSearch").on("click", function() {
  event.preventDefault();

  searchTerm = $("#formSearchTerm").val();
  numberOfRecords = $("#formNumberOfRecords").val();
  startYear = $("#formStartYear").val();
  endYear = $("#formEndYear").val();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var result = response.response.docs;

    for (let i = 0; i < 5; i++) {
      var newDiv = $(`
        <div>
          <h3>${result[i].snippet}</h3>
          <p>${result[i].lead_paragraph}</p>
          <p></p>
          <p></p>
          <p><a href="${result[i].web_url}">${result[i].web_url}</a></p>
        </div>
      `);

      $("#formResults").append(newDiv);
    }
  });
});

$("#formClear").on("click", function() {
  event.preventDefault();

  searchTerm = "";
  numberOfRecords = "";
  startYear = "";
  endYear = "";

  $("#formResults").html("");
});
