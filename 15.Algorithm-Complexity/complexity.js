// O(1) Constant
// O(log(n)) Logarithmic
// O((log(n))c) Poly-logarithmic
// O(n) Linear
// O(n^2) Quadratic
// O(n^c) Polynomial
// O(c^n) Exponential

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
};

function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  } else {
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
}

// O1
function increment(num) {
  return ++num;
}

//

// O(n)
function sequentialSearch(array, value, equalsFn = defaultCompare) {
  let cost = 0;
  for (let i = 0; i < array.length; i++) {
    cost++;
    if (equalsFn(value, array[i]) === Compare.LESS_THAN) {
      return i;
    }
  }
  console.log(
    `cost for sequentialSearch with input size ${array.length} is ${cost}`
  );
  return -1;
}
const arrayN = [1, 2, 3, 4, 4, 5, 6, 7, 8, 9];
console.log(sequentialSearch(arrayN, 11, defaultCompare));

//

// 0(n^2)
function bubbleSort(array, compareFn = defaultCompare) {
  const { length } = array;
  // 'typeof length' is number // it's equal length = array.length

  let cost = 0;
  for (let i = 0; i < length; i++) {
    cost++;
    for (let j = 0; j < length - 1; j++) {
      cost++;
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  console.log(`cost for sequentialSearch with input size ${length} is ${cost}`);
  return array;
}

const arrayNN = [1, 2, 3, 4, 4, 5, 6, 7, 8, 9];
console.log(bubbleSort(arrayNN, defaultCompare));

//// FROM-CrackingTheCodingInterview.com'

// Log N Runtimes
// 1. Let's look at binary search as an example. In binary search, we are looking for an example x in an N-element sorted array. We first compare x to the midpoint of the array. If x == middle, then we return. If x < middle, then we search on the left side of the array. If x > middle, then we search on the right side of the array

// 2. The total runtime is then a matter of how many steps (dividing N by 2 each time) we can take until N becomes 1.
// N = 16
// N 8 /* divide by 2 */
// N 4 /* divide by 2 *I
// N 2 /* divide by 2 */
// N 1 I* divide by 2 */

// 3. We could look at this in reverse (going from 1 to 16 instead of 16 to 1). How many times we can multiply 1 by 2 until we get N?
// N 1
// N 2 /* multiply by 2 */
// N 4 /* multiply by 2 */
// N 8 /* multiply by 2 */
// N 16 /* multiply by 2 */
// What is kin the expression 2k = N?This is exactly what log expresses.
// 2^4 = 16 -> log2(l6) = 4
// log2(N) = k -> 2^k = N

//

// From https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/
// O(2^n)
function Fibonaci(num) {
  if (num <= 1) return num;
  return Fibonaci(num - 2) + Fibonaci(num - 1);
}
