// DIVIDE AND CONQUER
//
// 1. Divide the original problem into smaller subproblems (smaller instances of the original problem).
// 2. Conquer the smaller subproblems by solving them with recursive algorithms that return the solution for the subproblems. The base case of the recursive algorithm solves and returns the solution for the smallest subproblem.
// 3. Combine the solutions of the subproblems into the solution for the original problem.

//

// BINARY SEARCH
// Divide: Calculate mid and search lower or upper half of the array
// Conquer: Search value in the lower or upper half of the array
// Combine: Not applicable as we are returning the index directly

function binarySearchRecursive(
  array,
  value,
  low,
  high,
  compareFn = defaultCompare
) {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) {
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      return binarySearchRecursive(array, value, mid, mid - 1, compareFn);
    } else {
      return mid;
    }
  }
  return DOES_NOT_EXIST;
}
function binarySearch(array, value, low, high, compareFn) {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;
  return binarySearchRecursive(array, value, low, high, compareFn);
}

//

// DYNAMIC PROGRAMMING
// Dynamic programming (DP) is an optimization technique used to solve complex problems by breaking them into smaller subproblems.

// The minimum coin change problem
function minCoinChange(coins, amount) {
  const cache = []; // {1}
  const makeChange = value => {
    // {2}
    if (!value) {
      // {3}
      return [];
    }
    if (cache[value]) {
      // {4}
      return cache[value];
    }
    let min = [];
    let newMin;
    let newAmount;
    for (let i = 0; i < coins.length; i++) {
      // {5}
      const coin = coins[i];
      newAmount = value - coin; // {6}
      if (newAmount >= 0) {
        newMin = makeChange(newAmount); // {7}
      }
      if (
        newAmount >= 0 && // {8}
        (newMin.length < min.length - 1 || !min.length) && // {9}
        (newMin.length || !newAmount) // {10}
      ) {
        min = [coin].concat(newMin); // {11}
        console.log("new Min " + min + " for " + amount);
      }
    }
    return (cache[value] = min); // {12}
  };
  return makeChange(amount); // {13}
}

console.log(minCoinChange([1, 5, 10, 25], 36));

//

// The knapsack problem
