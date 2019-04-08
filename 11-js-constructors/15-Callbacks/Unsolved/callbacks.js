var fs = require("fs");

let randFunc = () => {
  console.log("chicken");
};
let text = "Edith";

// Write a function that logs a message, then executes
// a function argument.

var func1 = (str, func) => {
  console.log(str);
  func();
};

func1("cheese", randFunc);

// Write a function that runs a function argument if
// its other argument is truthy.

var func2 = (bool, func) => {
  if (bool) {
    func();
  }
};

func2(true, randFunc);

// Write a function that accepts a function argument and
// a value, and returns a function that returns the result
// of executing the function argument with the value.
// This isn't as hard as it sounds!

var func3 = (func, val) => {
  return () => {
    return func(val);
  };
};

// Use fs.writeFile to log a message to a file called
// log.txt. Are yo using callbacks anywhere? Where?
fs.writeFile("log.txt", text, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("Edith");
});
