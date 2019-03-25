// Quick warm-up activity
// Create an application that takes in a series of numbers then sorts them.
// Feel encouraged to use Stack or Google to find the "sort" code.
// ===========================================================================================
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var nums = [];

for (var i = 2; i < nodeArgs.length; i++) {
  num = parseFloat(nodeArgs[i]);
  nums.push(num);
}

console.log(nums.sort((a, b) => a - b));
