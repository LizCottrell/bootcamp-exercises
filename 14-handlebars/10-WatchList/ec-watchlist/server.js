const express = require('express');
const mysql = require('mysql');
const exphbs = require('express-handlebars');

// express
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mysql
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'moviePlanner_db'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



// Routes

// Read movie
app.get("/", function(req, res) {
  connection.query("SELECT * FROM movies;", function(err, data) {
    res.render("index", { movie: data });
  });
});

// Create movie
app.post("/movies", function(req, res) {
  connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result) {
    if (err) {
      return res.status(500).end();
    }
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Update movie
app.put("/movies/:id", function(req, res) {
  connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function(err, result) {
    if (err) {
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Delete movie
app.delete("/movies/:id", function(req, res) {
  connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});