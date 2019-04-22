var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "pepperdog1",
  database: "playlist_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  updateSong();
  readAllSongs();
  readAlternativeSongs();
  createSong();
  deleteSong();
});

function readAllSongs() {
  connection.query("SELECT * FROM songs", function(err, res) {
    if (err) throw err;
    res.map(song =>
      console.log(`${song.title} | ${song.artist} | ${song.genre}`)
    );
    console.log("-------------");
  });
}

function readAlternativeSongs() {
  connection.query("SELECT * FROM songs WHERE genre='80s'", function(err, res) {
    if (err) throw err;
    res.map(song =>
      console.log(`${song.title} | ${song.artist} | ${song.genre}`)
    );
  });
}

function createSong() {
  console.log("Inserting a new song...\n");
  var query = connection.query(
    "INSERT INTO songs SET ?",
    {
      title: "The Promise",
      artist: "When in Rome",
      genre: "80s"
    },
    function(err, res) {
      console.log("-------------");
      console.log(res.affectedRows + " song inserted!\n");
      console.log("-------------");
    }
  );

  console.log(query.sql);
}

function deleteSong() {
  console.log("Deleting that new song...\n");
  var query = connection.query(
    "DELETE FROM songs WHERE ?",
    {
      title: "The Promise"
    },
    function(err, res) {
      console.log("-------------");
      console.log(res.affectedRows + " song deleted!\n");
      console.log("-------------");
    }
  );

  console.log(query.sql);
}

function updateSong() {
  console.log("Updating all 80s songs...\n");
  var query = connection.query(
    "UPDATE songs SET ? WHERE ?",
    [
      {
        genre: "80s"
      },
      {
        genre: "Classic Rock"
      }
    ],
    function(err, res) {
      console.log("-------------");
      console.log(res.affectedRows + " songs updated!\n");
      console.log("-------------");
    }
  );

  console.log(query.sql);
}
