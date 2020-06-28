// A First Greedy Algorithms Example: The Coin-Changing Problem
function makeChange(origAmt, coins) {
  var remainAmt = 0;

  if (origAmt % 0.25 < origAmt) {
    coins[3] = parseInt(origAmt / 0.25);
    remainAmt = origAmt % 0.25;
    origAmt = remainAmt;
  }

  if (origAmt % 0.1 < origAmt) {
    coins[2] = parseInt(origAmt / 0.1);
    remainAmt = origAmt % 0.1;
    origAmt = remainAmt;
  }

  if (origAmt % 0.05 < origAmt) {
    coins[1] = parseInt(origAmt / 0.05);
    remainAmt = origAmt % 0.05;
    origAmt = remainAmt;
  }

  coins[0] = parseInt(origAmt / 0.01);
}
function showChange(coins) {
  if (coins[3] > 0) {
    console.log(`Number of quarters: ${coins[3]} * 0.25`);
  }
  if (coins[2] > 0) {
    console.log(`Number of quarters: ${coins[2]} * 0.1`);
  }
  if (coins[1] > 0) {
    console.log(`Number of quarters: ${coins[1]} * 0.05`);
  }
  if (coins[0] > 0) {
    console.log(`Number of quarters: ${coins[0]} * 0.01`);
  }
}
const origAmt = 0.66,
  coins = [];
makeChange(origAmt, coins);
showChange(coins);
