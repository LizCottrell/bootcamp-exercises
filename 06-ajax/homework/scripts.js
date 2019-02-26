var apiKey = "cPHJBG5W7YeAMoUu72FUXO12yFNCVrsB;
var queryURL = `http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=${apiKey}`;

var searchTerm;
var numberOfRecords;
var beginDate;
var endDate;
var params;

let resetForm = function() {
  event.preventDefault();
  searchTerm = "";
  numberOfRecords = "";
  beginDate = "";
  endDate = "";
  $("#formResults").html("");
};

$("#formSearch").on("click", function() {
  event.preventDefault();
  resetForm();

  searchTerm = $("#formSearchTerm").val();
  numberOfRecords = $("#formNumberOfRecords").val();
  beginDate = $("#formStartYear").val();
  endDate = $("#formEndYear").val();

  if (beginDate !== "" && endDate !== "") {
    params = `&q=${searchTerm}&begin_date=${beginDate}0101&end_date=${endDate}1231`;
  } else if (beginDate !== "" && endDate === "") {
    params = `&q=${searchTerm}&begin_date=${beginDate}0101`;
  } else if (beginDate === "" && endDate !== "") {
    params = `&q=${searchTerm}&end_date=${endDate}1231`;
  } else {
    params = `&q=${searchTerm}`;
  }

  console.log(queryURL + params);

  $.ajax({
    url: queryURL + params,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var result = response.response.docs;

    for (let i = 0; i < numberOfRecords; i++) {
      var newDiv = $(`
        <div>
          <h3>${result[i].headline.main}</h3>
          <p>${result[i].byline.original}</p>
          <p>Section: ${result[i].section_name}</p>
          <p>${result[i].pub_date}</p>
          <p><a href="${result[i].web_url}">${result[i].web_url}</a></p>
        </div>
      `);

      $("#formResults").append(newDiv);
    }
  });
});

$("#formClear").on("click", function() {
  resetForm();
});
