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
  database: 'wishes_db'
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
app.get("/", function(req, res) {
  connection.query("SELECT * FROM wishes;", function(err, data) {
    res.render("index", { wish: data });
  });
});

app.post("/", function(req, res) {
  connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});


app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});