var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "popquiz_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createNewRow();
  printAll();
  connection.end();
});

function createNewRow() {
  console.log("Inserting a new person...\n");
  connection.query(
    "INSERT INTO people SET ?",
    {
      name: "Rat",
      favfood: "Dogfood",
      nickname: "Mouse"
    },
    function (err, res) {
      if (err) { console.log(err) };
      console.log(res.affectedRows + " person inserted!\n");
    }
  );
}

function printAll() {
  console.log("Printing everything...\n");
  connection.query(
    "SELECT * FROM people",
    function (err, res) {
      if (err) { console.log(err) };
      console.log(res);
    }
  )
}