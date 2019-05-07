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

function loadProducts() {
  const query = "SELECT * FROM products;"
  connection.query(query, function(err, res) {
    console.log('\n');
    if (err) throw err;
    if (res.length === 0) {
      console.log(`There are no products currently. Try again later.`)
    }
    console.log('LIST OF PRODUCTS: \n----------------\nID | ITEM | CATEGORY | PRICE\n----------------');
    res.map(product => console.log(`${product.item_id} | ${product.product_name} | ${product.department_name} | $${product.price}`))
    console.log('\n');
  });
}


function runBamazon() {
    loadProducts();
    customerFlow();
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
          updateStock(answers);
        }
        console.log('\n');
        runBamazon();
      });
    });
}

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

function updateStock(response) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [response.amount, response.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log(`\nSuccessfully purchased ${response.amount} units of item ${response.item_id}!`);
    }
  );
  connection.query(
    "SELECT * FROM products WHERE ?;",
    { item_id:response.item_id },
    function(err, res) {
      console.log(res)
      console.log(`\nThere are now only ${res[0].stock_quantity} ${res[0].product_name} left!`);
    }
  );
}
