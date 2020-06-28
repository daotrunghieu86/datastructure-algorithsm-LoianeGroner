// Iterative factorial
function iterativeFactorial(n) {
  let total = 1;
  for (let i = n; n > 1; n--) {
    total = total * n;
  }
  return total;
}
console.log("Iterative factorial: " + iterativeFactorial(5)); // 120

// Recursive Factorial
function recursive(n) {
  if (n === 1) {
    return 1;
  }
  return n * recursive(n - 1);
}
console.log("Recursive Factorial: " + recursive(5)); // 120

// Iterative Fibonaci
function fibonacciIterative(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  let fibNMinus2 = 0;
  let fibNMinus1 = 1;
  let fibN = n;
  for (let i = 2; i <= n; i++) {
    // n >= 2
    fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}
console.log("Iterative Fibonaci: " + fibonacciIterative(5)); // 5

// Recursive Fibonacci
function recursiveFibonacci(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}
console.log("Recursive Fibonacci: " + recursiveFibonacci(5)); // 5

// Fibonacci with memoization
function fibonacciMemoization(n) {
  const memo = [0, 1]; // {1}
  const fibonacci = n => {
    if (memo[n] != null) return memo[n]; // {2}
    return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)); // {3}
  };
  return fibonacci(n);
}
console.log("Fibonacci with memoization: " + fibonacciMemoization(5)); // 5
