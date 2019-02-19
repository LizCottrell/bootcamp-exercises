// Buy Low, Sell High -- Starter Code

// Stock Prices
var stockPrices = [1.32, 1.14, 1.45, 1.2, 1.34, 1.74, 1.18, 1.9, 1.1];

// Your Biggest Profit function
var biggestProfit = function(stockArray, sharesBought) {
  var low;
  var high = Math.max(stockArray);
  var highIndex = stockArray.indexOf(high);
  stockArray.slice(high);
  return (high - low) * sharesBought;
};

// A Call to your Biggest Profit function.
biggestProfit(stockPrices, 10000);

// NOTE: This should return 7600,
// because you could have bought it at 1.14 per share
// and then sold it at 1.90 per share.
// 1.90 - 1.14 = 0.76. 0.76 * 10000 is 7600.
