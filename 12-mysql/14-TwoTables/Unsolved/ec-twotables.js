var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "musicDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  const queries = [
    "If an artist's song and album made it into the charts at the time of their release",
    "All songs sung by a particular artist", 
    "All artists who appear within the top 5000 more than once", 
    "All data contained within a specific range", 
    "Data for a specific song",
    "Exit search"
  ];
  inquirer
    .prompt([
      {
        type: "list",
        name: "search",
        message: "What would you like to search for in the topSongs database?",
        choices: queries
      }
    ])
    .then(answer => {
      switch(answer.search) {
        case "If an artist's song and album made it into the charts at the time of their release":
          getSuperHitInfo();
          break;
        case "All songs sung by a particular artist":
          getSongsByArtist();
          break;
        case "All artis who appear within the top 5000 more than once":
          getDuplicateArtists();
          break;
        case "All data contained within a specific range":
          getRange()
          break;
        case "Data for a specific song":
          getSongs()
          break;
        case "Exit search":
          connection.end();
          break;
        default:
          // code block
      }
    });
}

function getSuperHitInfo() {
  // If artist matches and year matches for both album and song tables, display
  const query = "SELECT artist, COUNT(*) AS totalSongs FROM topSongs  GROUP BY artist HAVING COUNT(*) > 1 ORDER BY totalSongs ASC;"

  connection.query(query, function(err, res) {
      console.log('\n');
      if (err) throw err;
      if (res.length === 0) {
        console.log(`There are no artists in the top 5000 list with more than one hit`)
      }
      res.map(song => console.log(`${song.artist} | ${song.totalSongs}`))
      console.log('\n');
      runSearch();
    }
  )

}

function getSongsByArtist() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "artist",
        message: "Enter the name of the artist",
      }
    ])
    .then(answer => {
      const query = "SELECT * FROM topSongs WHERE ?"; 
      const param = { artist: answer.artist };

      connection.query(query, param, function(err, res) {
          console.log('\n');
          if (err) throw err;
          if (res.length === 0) {
            console.log(`This artist does not have a top 5000 song`)
          }
          res.map(song => console.log(`${song.position} | ${song.artist} | ${song.song}`))
          console.log('\n');
          runSearch();
        }
      )
    });
}

function getDuplicateArtists() {
  const query = "SELECT artist, COUNT(*) AS totalSongs FROM topSongs  GROUP BY artist HAVING COUNT(*) > 1 ORDER BY totalSongs ASC;"

  connection.query(query, function(err, res) {
      console.log('\n');
      if (err) throw err;
      if (res.length === 0) {
        console.log(`There are no artists in the top 5000 list with more than one hit`)
      }
      res.map(song => console.log(`${song.artist} | ${song.totalSongs}`))
      console.log('\n');
      runSearch();
    }
  )
}

function getRange() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "start",
        message: "Enter the starting position of the range",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        name: "end",
        message: "Enter the end position",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(answer => {
      const query = "SELECT * FROM topSongs WHERE position BETWEEN ? AND ?;"; 
      const param = [ answer.start, answer.end ];

      connection.query(query, param, function(err, res) {
          console.log('\n');
          if (err) throw err;
          if (res.length === 0) {
            console.log(`This range is not valid`)
          }
          res.map(song => console.log(`${song.position} | ${song.artist} | ${song.song}`))
          console.log('\n');
          runSearch();
        }
      )
    });
}

function getSongs() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "song",
        message: "Enter the song",
      }
    ])
    .then(answer => {
      const query = "SELECT * FROM topSongs WHERE ?"; 
      const param = { song: answer.song };

      connection.query(query, param, function(err, res) {
          console.log('\n');
          if (err) throw err;
          if (res.length === 0) {
            console.log(`This song does not exist in the top 5000`)
          }
          res.map(song => console.log(`${song.position} | ${song.artist} | ${song.song} | ${song.year}`))
          console.log('\n');
          runSearch();
        }
      )
    });
}