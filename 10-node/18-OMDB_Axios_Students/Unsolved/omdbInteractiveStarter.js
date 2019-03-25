// INSTRUCTIONS:
// ---------------------------------------------------------------------------------------------------------
// Level 1:
// Take any movie with a word title (ex: Cinderella) as a Node argument and retrieve the year it was created

// Level 2 (More Challenging):
// Take a move with multiple words (ex: Forrest Gump) as a Node argument and retrieve the year it was created.
// ---------------------------------------------------------------------------------------------------------

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
// ...
var axios = require("axios");
var nodeArgs = process.argv;
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];
  }
}
// ...

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl =
  "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

// Then create a request with axios to the queryUrl
// ...
axios.get(queryUrl).then(function(response) {
  console.log(`${movieName} was made in ${response.data.Year}`);
});

// If the request with axios is successful
// ...

// Then log the Release Year for the movie
// ...
