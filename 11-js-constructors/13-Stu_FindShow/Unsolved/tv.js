var fs = require("fs");
var axios = require("axios");

var TV = function() {
  this.findShow = function(show) {
    var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;
    var search;

    axios.get(URL).then(
      function(response) {
        search = `
          ---------------------------
          name: ${response.data.name}
          genre(s): ${response.data.genres.join(", ")}
          average rating: ${Object.values(response.data.rating)}
          network name: ${response.data.network.name}
          summary: ${response.data.summary}
          ---------------------------
        `;
        fs.appendFile("log.txt", search, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Content Added!");
          }
        });
        console.log(search);
      },
      function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );
  };
};

module.exports = TV;
