// 1. Recursive to computing Fibonacci
function recurFib(n) {
  if (n < 2) {
    return n;
  } else {
    return recurFib(n - 1) + recurFib(n - 2);
  }
}
console.log(recurFib(5));

//

// 2. The Dynamic-Programming solution to computing Fibonacci numbers
function dynFib(n) {
  var val = [];
  for (var i = 0; i <= n; ++i) {
    val[i] = 0;
  }
  if (n == 1 || n == 2) {
    return 1;
  } else {
    val[1] = 1;
    val[2] = 2;
    for (var i = 3; i <= n; ++i) {
      val[i] = val[i - 1] + val[i - 2];
    }
    return val[n - 1];
    // return val;
  }
}
console.log(dynFib(5)); // [ 0, 1, 2, 3, 5, 8 ]

// Timing test for recursive and dynamic programming versions of Fibonaci function
var start = new Date().getTime();
// console.log(recurFib(10)); // Recursive time - 0 milliseconds
console.log(recurFib(20)); // Recursive time - 3 milliseconds
// console.log(recurFib(30)); // Recursive time - 20 milliseconds
var stop = new Date().getTime();
console.log(`Recursive time - ${stop - start} milliseconds`);

start = new Date().getTime();
// console.log(dynFib(10)); // Dynamic programming time - 0 milliseconds
console.log(dynFib(20)); // Dynamic programming time - 0 milliseconds
// console.log(dynFib(30)); // Dynamic programming time - 0 milliseconds
stop = new Date().getTime();
console.log(`Dynamic programming time - ${stop - start} milliseconds`);

//

// 3. The definition of an iterative Fibonacci function that doesn't use an array
function interFib(n) {
  var last = 1;
  var nextLast = 1;
  var result = 1;
  for (let i = 2; i < n; i++) {
    result = last + nextLast;
    nextLast = last;
    last = result;
  }
  return result;
}
console.log(interFib(5)); //  5

//

// 4. Finding the Longest Common Substring
function lcs(word1, word2) {
  var max = 0;
  var index = 0;
  var lcsarr = new Array(word1.length + 1);

  // add 0 in all items
  for (let i = 0; i <= word1.length + 1; i++) {
    lcsarr[i] = new Array(word2.length + 1);
    for (let j = 0; j <= word2.length + 1; j++) {
      lcsarr[i][j] = 0;
    }
  }

  // keeps track of characters match
  for (let i = 0; i <= word1.length; i++) {
    for (let j = 0; j <= word2.length; j++) {
      if (i == 0 || j == 0) {
        lcsarr[i][j] = 0;
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
        } else {
          lcsarr[i][j] = 0;
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j];
        index = i;
      }
    }
  }

  // Builds the longest common substring by determining where to start
  var str = "";
  if (max === 0) {
    return "";
  } else {
    for (let i = index - max; i <= max; i++) {
      // i = index - max: là điểm khởi đầu của chuỗi trùng nhau dài nhất
      str += word1[i];
    }
    return str;
  }
}

console.log(lcs("abcde", "bbcde"));

//

// The Knapsack Problem

// is a really interesting problem in combinatorics — to cite Wikipedia:
// “given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.”

// 5. The Knapsack Problem: A Recursive Solution
function max(a, b) {
  return a > b ? a : b;
}
function knapsack(capacity, size, value, n) {
  if (n == 0 || capacity == 0) {
    return 0;
  }
  if (size[n - 1] > capacity) {
    return knapsack(capacity, size, value, n - 1);
  } else {
    return max(
      value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1),
      knapsack(capacity, size, value, n - 1)
    );
  }
}
var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
console.log(knapsack(capacity, size, value, n));

//

// 6. The Knapsack Problem: A Dynamic Programming Solution
// function dKnapsack(capacity, size, value, n) {
//   var K = [];
//   for (let i = 0; i <= capacity + 1; i++) {
//     K[i] = [];
//   }
//   for (let i = 0; i <= n; i++) {
//     for (let w = 0; w <= capacity; w++) {
//       if (i === 0 || w === 0) {
//         K[i][w] = 0;
//       } else if (size[i - 1] <= w) {
//         K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]], K[i - 1][w]);
//       } else {
//         kS[i][w] = kS[i - 1][w];
//       }
//       putstr(K[i][w] + ""); // not defined
//     }
//     print();
//   }
//   return K[n][capacity];
// }
// console.log(dKnapsack(capacity, size, value, n));

// 6. The knapsack problem - LoianeGroner
function knapSack(capacity, weights, values, m) {
  const kS = [];
  for (let i = 0; i <= m; i++) {
    // {1}
    kS[i] = [];
  }
  for (let i = 0; i <= m; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        // {2}
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        // {3}
        const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
        const b = kS[i - 1][w];
        kS[i][w] = a > b ? a : b; // {4} max(a,b)
      } else {
        kS[i][w] = kS[i - 1][w]; // {5}
      }
    }
  }
  findValues(m, capacity, kS, weights, values); // {6} additional code
  return kS[m][capacity]; // {7}
}
function findValues(m, capacity, kS, weights, values) {
  let i = m;
  let k = capacity;
  console.log("Items that are part of the solution:");
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(
        `item ${i} can be part of solution w,v: ${weights[i - 1]} , ${
          values[i - 1]
        }`
      );
      i--;
      // k -= kS[i][k];
      k -= weights[i - 1]; // thế này ms đúng
    } else {
      i--;
    }
  }
}

// const values = [60, 50, 70, 30],
//   weights = [5, 3, 4, 2];
// m = values.length;
// capacity = 7;
// console.log(knapSack(capacity, weights, values, m)); //outputs 120

const values = [3, 4, 5],
  weights = [2, 3, 4],
  m = values.length;
capacity = 5;
console.log(knapSack(capacity, weights, values, n)); //outputs 7
