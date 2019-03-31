// dependencies
require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

// apis
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.id;
var bandsintown = keys.bandsintown.id;

// node arguments
var nodeArgs = process.argv;
var action = process.argv[2];
var request = "";

// shape request for use in query string
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    request = request + "+" + nodeArgs[i];
  } else {
    request += nodeArgs[i];
  }
}

// functions
const getConcertInfo = userRequest => {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${userRequest}/events?app_id=${bandsintown}`
    )
    .then(function(response) {
      if (!response.data.length) {
        console.log("\nNo upcoming events for this artist!\n");
      } else {
        console.log(`\n`);
        console.log(`Upcoming Concerts for: ${userRequest}`);
        response.data.forEach(event => {
          var date = moment(event.datetime).format(
            "dddd, MMMM Do YYYY, h:mm a"
          );
          console.log(`--------------------`);
          console.log(`Venue: ${event.venue.name}`);
          console.log(`Location: ${event.venue.city}`);
          console.log(`Date: ${date}`);
        });
        console.log(`\n`);
      }
    });
};

const getSpotifyInfo = userRequest => {
  if (userRequest === "") {
    userRequest = "I saw the sign";
  }
  spotify
    .request(`https://api.spotify.com/v1/search?type=track&q=${userRequest}`)
    .then(function(data) {
      let preview = data.tracks.items[0].preview;
      if (preview === undefined) {
        preview = "No preview available for this track";
      }
      console.log(`\n`);
      console.log(`Spotify Search Results for: ${userRequest}`);
      console.log(`--------------------`);
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song: ${data.tracks.items[0].name}`);
      console.log(`Preview: ${preview}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      console.log(`\n`);
    })
    .catch(function(err) {
      console.error("Error occurred: " + err);
    });
};

const getMovieInfo = userRequest => {
  let data = [];

  if (userRequest === "") {
    userRequest = "Mr. Nobody";
  }
  axios
    .get(
      `http://www.omdbapi.com/?t=${userRequest}&y=&plot=short&apikey=${omdb}`
    )
    .then(function(response) {
      console.log(`\n`);
      console.log(`OMDB Search Results for: ${userRequest}`);
      console.log(`--------------------`);
      console.log(`Title: ${response.data.Title}`);
      console.log(`Released: ${response.data.Year}`);
      console.log(`Produced in: ${response.data.Country}`);
      if (response.data.Ratings.length >= 1) {
        console.log(`IMDB rating: ${response.data.Ratings[0].Value}`);
      }
      if (response.data.Ratings.length >= 2) {
        console.log(`Rotten Tomatos rating: ${response.data.Ratings[1].Value}`);
      }
      console.log(`Language: ${response.data.Language}`);
      console.log(`Plot: ${response.data.Plot}`);
      console.log(`Actors: ${response.data.Actors}`);
      console.log(`\n`);
    });
};

const doWhatItSays = () => {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    handleRequest(dataArr[0], dataArr[1]);
  });
};

var handleRequest = (action, request) => {
  switch (action) {
    case "concert-this":
      getConcertInfo(request);
      break;
    case "spotify-this-song":
      getSpotifyInfo(request);
      break;
    case "movie-this":
      getMovieInfo(request);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Unexpected request.");
  }
};

// run the program
handleRequest(action, request);
