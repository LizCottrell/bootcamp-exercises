var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runBamazon();
});

function runBamazon() {
  const query = "SELECT * FROM products;"
  connection.query(query, function(err, res) {
    console.log('\n');
    if (err) throw err;
    if (res.length === 0) {
      console.log(`There are no products currently. Try again later.`)
    }
    console.log('LIST OF PRODUCTS: \n----------------\nID | ITEM | CATEGORY | PRICE\n----------------');
    res.map(product => console.log(`${product.item_id} | ${product.product_name} | ${product.department_name} | ${product.price}`))
    console.log('\n');

    customerFlow();
  });
}

function customerFlow(){
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "What is the ID of the item you would like to buy?",
      },
      {
        type: "input",
        name: "amount",
        message: "How many units of the product would you like to buy?",
      }
    ])
    .then(answers => {
      const query = "SELECT * FROM products WHERE ?;"
      const param = { item_id: answers.item_id }

      connection.query(query, param, function(err, res) {
        console.log('\n');
        if (err) throw err;
        if (res.length === 0) {
          console.log(`There are no products currently. Try again later.`)
        }
        if (res[0].stock_quantity < answers.amount) {
          console.log("Insufficient quantity! Try again.");
        } else {
          updateStock(answers.amount);
        }
        console.log('\n');
        runBamazon();
      });
    });
}

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

function updateStock(amount) {
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