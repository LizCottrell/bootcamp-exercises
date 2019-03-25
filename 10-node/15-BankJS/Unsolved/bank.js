var fs = require("fs");
var action = process.argv[2];
var amount = process.argv[3];

var accountBalance = 0;

switch (action) {
  case "total":
    total();
    break;
  case "deposit":
    deposit(amount);
    break;
  case "withdraw":
    withdraw(amount);
    break;
  case "lotto":
    lotto();
    // code block
    break;
  default:
  // code block
}

function total() {
  fs.readFile("bank.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var data = data.split(", ");
      for (let i = 0; i < data.length; i++) {
        if (parseFloat(data[i])) {
          accountBalance += parseFloat(data[i]);
        }
      }
      console.log(`You have a total of ${accountBalance.toFixed(2)}`);
    }
  });
}

function deposit(val) {
  ledger(val, "", "Deposited");
}

function withdraw(val) {
  ledger(val, "-", "Withdrew");
}

function ledger(val, op, opText) {
  fs.appendFile("bank.txt", `, ${op}${val}`, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`${opText} ${val}`);
    }
  });
}

function lotto() {
  randomNum = Math.floor(Math.random() * 2);
  if (randomNum) {
    deposit(2);
    console.log("You won 2 bones! 💰");
  } else {
    withdraw(0.25);
    console.log("You lost! 💸");
  }
}
