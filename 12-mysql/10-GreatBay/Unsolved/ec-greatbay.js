const inquirer = require("inquirer");
const mysql = require("mysql");

const start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "postOrBid",
        message: "Would you like to POST an item or BID on an item?",
        choices: ["POST an item", "BID on an item"]
      }
    ])
    .then(function(answer) {
      if (answer.postOrBid === "POST an item") {
        post();
      } else {
        bid();
      }
    });
};

const post = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "itemName",
        message: "What is the item you would like to post?"
      },
      {
        type: "list",
        name: "itemCategory",
        message:
          "What type of item is this (what category would it fall into)?",
        choices: ["Animal", "Thing", "Service", "Human", "Other"]
      },
      {
        type: "input",
        name: "itemStartingBid",
        message: "What do you want the starting bid for your item to be?",
        validate: function(value) {
          if (
            isNaN(value) === false &&
            parseInt(value) > 0 &&
            parseInt(value) <= 100
          ) {
            return true;
          }
          console.log(
            " -- please choose a starting bid between 1 and 100 (numbers only)"
          );
          return false;
        }
      }
    ])
    .then(function(answers) {
      addItemToDB(answers);
    });
};

const addItemToDB = response => {
  console.log("Adding a new item...\n");
  var query = connection.query(
    "INSERT INTO items SET ?",
    {
      item: response.itemName,
      category: response.itemCategory,
      startingBid: response.itemStartingBid,
      highestBid: response.itemStartingBid
    },
    function(err, res) {
      console.log("-------------");
      console.log(res.affectedRows + " item inserted!\n");
      console.log("-------------");
    }
  );
  console.log(query.sql);
  connection.end();
};

const bid = () => {
  connection.query(`SELECT * FROM items`, function(err, res) {
    if (err) throw err;
    let itemArr = [];
    let startingBidsArr = [];

    console.log(
      "\n-------------\nItem | Category | Starting Bid\n-------------"
    );
    res.map(item => {
      console.log(`${item.item} | ${item.category} | ${item.startingBid}`);
      itemArr.push(item.item);
      startingBidsArr.push(item.startingBid);
    });
    console.log("-------------");

    inquirer
      .prompt([
        {
          type: "list",
          name: "item",
          message: "Which item do you want to bid on?",
          choices: itemArr
        }
      ])
      .then(function(answer1) {
        let index = itemArr.indexOf(answer1.item);

        inquirer
          .prompt([
            {
              type: "input",
              name: "bid",
              message: "How much do you want to bid?",
              validate: function(value) {
                if (
                  isNaN(value) === false &&
                  parseInt(value) > startingBidsArr[index]
                ) {
                  return true;
                }
                console.log(
                  " -- please bid higher than the starting bid (numbers only)"
                );
                return false;
              }
            }
          ])
          .then(function(answer2) {
            console.log("\nUpdating highest bid...");
            var query = connection.query(
              "UPDATE items SET ? WHERE ?",
              [
                {
                  highestBid: answer2.bid
                },
                {
                  item: answer1.item
                }
              ],
              function(err, res) {
                console.log(
                  `The high bid for ${answer1.item} is now $${answer2.bid}\n`
                );
              }
            );
            connection.end();
          });
      });
  });
};

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pepperdog1",
  database: "greatbay_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});
