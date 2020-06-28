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

// Create Min Heap Class
class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  getRightChildIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    return Math.floor(index / 2);
  }

  // Insert a value into the heap
  insert(value) {
    if (value !== null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  // The siftUp operation
  // we will swap the value with its parent until its parent is smaller than the value being inserted
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      this.swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  // Use ECMAScript 2015 (ES6)
  swap(array, a, b) {
    return ([array[a], array[b]] = [array[b], array[a]]);
  }

  // Finding the minimum or max value from the min heap or the max heap
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  // This method removes the minimum value (min heap) or the maximum value (max heap) and returns it.
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }
  // The sift down operation (heapify)
  siftDown(index) {
    let element = index;
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);
    const size = this.size();
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) > Compare.BIGGER_THAN
    ) {
      element = left;
    }
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[right]) > Compare.BIGGER_THAN
    ) {
      element = right;
    }
    if (index != element) {
      this.swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
}

const heap = new MinHeap();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);

heap.insert(1);
console.log(heap.heap); // [ 1, 2, 3, 5, 4 ] ??  // Lẽ phải: [ 1, 2, 4, 5, 3 ]
console.log("Heap size: ", heap.size()); // 5
console.log("Heap is empty: ", heap.isEmpty()); // false
console.log("Heap min value: ", heap.findMinimum()); // 1
console.log(heap.extract());
console.log(heap.heap);

//
// Creating the MaxHeap class
class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = this.ReverseCompareFn(compareFn);
  }
  ReverseCompareFn(compareFn) {
    return (a, b) => compareFn(b, a);
  }
}
const maxHeap = new MaxHeap();
maxHeap.insert(2);
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(5);

maxHeap.insert(1);
console.log("---------------------");
console.log(" Creating the MaxHeap class");
console.log("Heap size: ", maxHeap.size()); // 5
console.log("Heap size: ", maxHeap.heap);
console.log("Heap min value: ", maxHeap.findMinimum()); // 5

// The heap sort algorithms
function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  while (heapSize > 1) {
    swap(array, 0, --heapSize);
    siftDown(array, 0, heapSize, compareFn);
  }
  return array;
}
function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    siftDown(array, i, array.length, compareFn);
  }
  return array;
}
const array = [7, 6, 3, 5, 4, 1, 2];
console.log("Before sorting: ", array);
console.log("After sorting: ", heapSort(array));
