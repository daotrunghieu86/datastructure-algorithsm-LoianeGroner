// SORTING ALGORITHMS

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  } else {
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
}

//

// The bubble sort =============  ////
function bubbleSort(array, compareFn = defaultCompare) {
  let { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}
function swap(array, a, b) {
  // classic way
  //   const temp = array[a];
  //   array[a] = array[b];
  //   array[b] = temp;

  // ES2015 way
  [array[a], array[b]] = [array[b], array[a]];
}
console.log("=============");
console.log("bubbleSort normal: ");
const arrayBubble = [1, 5, 2, 10, 4, 69, 32];
console.log(bubbleSort(arrayBubble)); // [ 1, 2, 4, 5, 10, 32, 69 ]

// The improved bubble sort
// If we subtract the number of passes from the inner loop, we will avoid all the unnecessary comparisons made by the inner loop ({1})
function bubbleSort(array, compareFn = defaultCompare) {
  let { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      // {1}
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}
console.log("=============");
console.log("bubbleSort improved: ");
const arrayBubbleSort = [1, 5, 2, 10, 4, 69, 32];
console.log(bubbleSort(arrayBubbleSort)); // [ 2, 3, 4, 5, 6,

//

// The selection sort =============  ////
function selectionSort(array, compareFn = defaultCompare) {
  const { length } = array;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i; j < length; j++) {
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      swap(array, i, indexMin);
    }
  }
  return array;
}
console.log("=============");
console.log("selectionSort: ");
const arraySelection = [6, 7, 2, 3, 5, 4];
console.log(selectionSort(arraySelection)); // [ 2, 3, 4, 5, 6, 7 ]

//

// The insertion sort =============  ////
function insertionSort(array, compareFn = defaultCompare) {
  const { length } = array;
  let temp;
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }
  return array;
}
console.log("=============");
console.log("insertionSort: ");
const arrayInsertion = [3, 5, 1, 4, 2];
console.log(insertionSort(arrayInsertion));

//

// The merge sort =============  ////
function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}
function merge(left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(
      compareFn(left[i], right[j]) === Compare.LESS_THAN
        ? left[i++]
        : right[j++]
    );
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

console.log("=============");
console.log("mergeSort: ");
const arrayMergeSort = [3, 7, 5, 2, 1, 4];
console.log(mergeSort(arrayMergeSort));

//

// The quick sort =============  ////
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
console.log("=============");
console.log("quickSort: ");
const arrayQuickSort = [3, 5, 1, 6, 4, 7, 2];
console.log(quickSort(arrayQuickSort)); // [ 1, 2, 3, 4, 5, 6, 7 ]

//

// The counting sort ============== //
function countingSort(array) {
  if (array.length < 2) {
    return array;
  }
  const maxValue = findMaxValue(array);
  const counts = new Array(maxValue + 1); // [a,b,c,d,e,f] ví dụ mảng gồm các phần tử như vậy. Nhưng thực tế là trống như này..
  // console.log("counts.. " + counts); // [,,,,,]

  array.forEach((ele) => {
    if (!counts[ele]) {
      counts[ele] = 0;
    }
    counts[ele]++;
  });
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      array[sortedIndex++] = i;
      count--;
    }
  });
  return array;
}
function findMaxValue(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

console.log("=============");
console.log("countingSort: ");
const arrayCounting = [5, 4, 3, 2, 3, 1];
console.log(countingSort(arrayCounting));

//

// The bucket sort ============== //
function bucketSort(array, bucketSize = 3) {
  // {1}
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize); // {2}
  return sortBuckets(buckets); // {3}
}
function createBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) {
    // 4
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // {5}
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) {
    // {6}
    buckets[i] = [];
  }
  for (let i = 0; i < array.length; i++) {
    // {7}
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); // {8}
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}
function sortBuckets(buckets) {
  const sortedArray = []; // {9}
  for (let i = 0; i < buckets.length; i++) {
    // {10}
    if (buckets[i] != null) {
      insertionSort(buckets[i]); // {11}
      sortedArray.push(...buckets[i]); // {12}
    }
  }
  return sortedArray;
}

const arrayBuketSort = [4, 9, 7, 10, 5, 2, 6, 3, 1, 8];
console.log("=============");
console.log("bucketSort: ");
console.log(bucketSort(arrayBuketSort));

//

// The radix sort ============== //
function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array;
  }
  const minValue = findMinValue(array);
  const maxValue = findMaxValue(array);
  let significantDigit = 1; // {1}
  while ((maxValue - minValue) / significantDigit >= 1) {
    // {2}
    array = countingSortForRadix(array, radixBase, significantDigit, minValue); // {3}
    significantDigit *= radixBase; // {4}
  }
  return array;
}
function countingSortForRadix(array, radixBase, significantDigit, minValue) {
  let bucketsIndex;
  const buckets = [];
  const aux = [];
  for (let i = 0; i < radixBase; i++) {
    // {5}
    buckets[i] = 0;
  }
  for (let i = 0; i < array.length; i++) {
    // {6}
    bucketsIndex = Math.floor(
      ((array[i] - minValue) / significantDigit) % radixBase
    ); // {7}
    buckets[bucketsIndex]++; // {8}
  }
  for (let i = 1; i < radixBase; i++) {
    // {9}
    buckets[i] += buckets[i - 1];
  }
  for (let i = array.length - 1; i >= 0; i--) {
    // {10}
    bucketsIndex = Math.floor(
      ((array[i] - minValue) / significantDigit) % radixBase
    ); // {11}
    aux[--buckets[bucketsIndex]] = array[i]; // {12}
  }
  for (let i = 0; i < array.length; i++) {
    // {13}
    array[i] = aux[i];
  }
  return array;
}
