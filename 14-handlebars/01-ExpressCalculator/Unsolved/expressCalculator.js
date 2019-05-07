var express = require("express");
var app = express();

var PORT = process.env.PORT || 8080;

app.get("/:operation/:firstNum/:secondNum", function(req, res) {

  var operation = req.params.operation;
  var firstNum = parseInt(req.params.firstNum);
  var secondNum = parseInt(req.params.secondNum);
  var result;

  switch (operation) {
    case "add":
      result = firstNum + secondNum;
      break;
    case "subtract":
      result = firstNum - secondNum;
      break;
    case "multiply":
      result = firstNum * secondNum;
      break;
    case "divide":
      result = firstNum / secondNum;
      break;
    default:
      result = "Sorry! The only valid operations are add, subtract, multiply, and divide.";
  }

  res.send(result.toString());
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
