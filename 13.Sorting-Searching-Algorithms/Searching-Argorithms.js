// SEARCH ALGORITHMS

//

function defaultEquals(a, b) {
  return a === b ? true : false;
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  } else {
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
}

// The sequential search =============  ////
const DOES_NOT_EXIST = -1;
function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(array[i], value)) {
      return i;
    }
  }
  return DOES_NOT_EXIST;
}
console.log("=============");
console.log("sequentialSearch: ");
const arraySequentialSearch = [5, 3, 6, 2, 10, 3, 1];
console.log(sequentialSearch(arraySequentialSearch, 10));

//

// The binary search =============  ////
// Swap
function swap(array, a, b) {
  return ([array[a], array[b]] = [array[b], array[a]]);
}

// The quick sort
function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}
function quick(array, left, right, compareFn) {
  let index; // {1}
  if (array.length > 1) {
    index = partition(array, left, right, compareFn); // {3}
    if (left < index - 1) {
      // {4}
      quick(array, left, index - 1, compareFn); // {5}
    }
    if (index < right) {
      // {6}
      quick(array, index, right, compareFn); // {7}
    }
  }
  return array;
}
function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((right + left) / 2)]; // {8quickSort}
  let i = left; // {9}
  let j = right; // {10}

  while (i <= j) {
    // {11}
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      // {12}
      i++;
    }
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      // {13}
      j--;
    }
    if (i <= j) {
      // {14}
      swap(array, i, j); // {15}
      i++;
      j--;
    }
  }
  return i; // {16}
}

function binarySearch(array, value, compareFn = defaultCompare) {
  const sortedArray = quickSort(array); // {1}
  let low = 0; // {2}
  let high = sortedArray.length - 1; // {3}
  while (lesserOrEquals(low, high, compareFn)) {
    // {4}
    const mid = Math.floor((low + high) / 2); // {5}
    const element = sortedArray[mid]; // {6}
    if (compareFn(element, value) === Compare.LESS_THAN) {
      // {7}
      low = mid + 1; // {8}
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      // {9}
      high = mid - 1; // {10}
    } else {
      return mid; // {11}
    }
  }
  return DOES_NOT_EXIST; // {12}
}

function lesserOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}
console.log("=============");
console.log("binarySearch: ");
let arrayBinarySearch = [5, 3, 6, 2, 10, 3, 1];
console.log(binarySearch(arrayBinarySearch, 10));
arrayBinarySearch = [8, 7, 6, 5, 4, 3, 2, 1];
console.log(binarySearch(arrayBinarySearch, 2));

//

// The interpolation search
function interpolationSearch(
  array,
  value,
  compareFn = defaultCompare,
  equalsFn = defaultEquals,
  diffFn = defaultDiff
) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;
  while (
    low <= heigh &&
    biggerOrEquals(value, array[low], compareFn) &&
    lesserOrEquals(value, array[(high, compareFn)])
  ) {
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low]); // {1}
    position = low + Math.floor((high - low) * delta); // {2}
    if (equalsFn(array[position], value)) {
      // {3}
      return position;
    }
    if (compareFn(array[position], value) === Compare.LESS_THAN) {
      // {4}
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return DOES_NOT_EXIST;
}
function lesserOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}
function biggerOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

//

// The Fisher-Yates shuffle (xáo trộn)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }
  return array;
}
const arrayShuffle = [1, 2, 3, 4, 5];
console.log(shuffle(arrayShuffle)); // một array bất kỳ đã bị đảo lộn không theo thứ tự nào cả
