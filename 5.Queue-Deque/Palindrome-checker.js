class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  isEmpty() {
    // return this.count - this.lowestCount === 0;
    return this.size() === 0 ? true : false;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clean() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }

  addBack(ele) {
    this.items[this.count++] = ele;
  }

  addFront(ele) {
    if (this.isEmpty()) {
      this.addBack(ele);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = ele;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = ele;
    }
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    let result = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return result;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount]; // {1}
    delete this.items[this.lowestCount]; // {2}
    this.lowestCount++; // {3}
    return result; // {4}
  }
}

function palindromeChecker(string) {
  if (
    (string.length === 0 && string !== null) ||
    string === undefined ||
    string == null
  ) {
    return false;
  }

  const deque = new Deque();
  const ConvertString = string
    .toLowerCase()
    .split(" ")
    .join("");
  let isEqual = true;
  let firstChar, lastChar;

  // add string character into deque.items
  for (let i = 0; i < ConvertString.length; i++) {
    deque.addBack(ConvertString[i]);
  }
  console.log(deque.items);

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }

  return isEqual;
}

// console.log("undefined", palindromeChecker());
// console.log("null", palindromeChecker(""));
// console.log("empty", palindromeChecker(" "));
// console.log("a", palindromeChecker("a"));
// console.log("aa", palindromeChecker("aa"));
console.log("kayak", palindromeChecker("kayak"));
console.log("level", palindromeChecker("level"));
console.log(
  "Was it a car or a cat I saw",
  palindromeChecker("Was it a car or a cat I saw")
);
console.log("Step on no pets", palindromeChecker("Step on no pets"));
