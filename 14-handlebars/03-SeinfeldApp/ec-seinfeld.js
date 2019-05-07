var express = require("express");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "seinfeld_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Routes
app.get("/", function(req, res) {
  html = `<ul>
    <li><a href="/cast">Cast</a></li>
    <li><a href="/coolness-chart">Coolness Chart</a></li>
    <li><a href="/attitude-chart">Attitude Chart</a></li>
  </ul>` 
  res.send(html);
});

app.get("/cast", function(req, res) {
  connection.query("SELECT * FROM actors", function(err, result) {
    var html = "<h1> Cast by their IDs </h1>";
    html += "<ul>";
      for (var i = 0; i < result.length; i++) {
        html += `<li>ID: ${result[i].id} | Actor: ${result[i].name}</li>`;
      }
    html += "</ul>";
    res.send(html);
  });
});

app.get("/coolness-chart", function(req, res) {
  connection.query("SELECT * FROM actors order by coolness_points", function(err, result) {
    // result.sort((a, b) => (a.coolness_points > b.coolness_points) ? 1 : -1)
    
    var html = "<h1> Cast by their Coolness </h1>";
    html += "<ul>";
    for (var i = 0; i < result.length; i++) {
      html += `<li>Coolness: ${result[i].coolness_points} | Actor: ${result[i].name}</li>`;
    }
    html += "</ul>";
    res.send(html);
  });
});

app.get("/attitude-chart/:attitude", function(req, res) {
  var attitude = req.params.attitude;

  connection.query("SELECT * FROM actors WHERE attitude=?", attitude, function(err, result) {
    
    var html = "<h1> Cast by their Attitude </h1>";
    html += "<ul>";
      for (var i = 0; i < result.length; i++) {
        html += `<li>Attitude: ${result[i].attitude} | Actor: ${result[i].name}</li>`;
      }
    html += "</ul>";
    res.send(html);
  });
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
