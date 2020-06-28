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

const deque = new Deque();
console.log(deque.isEmpty()); // true

deque.addBack("John");
deque.addBack("Jack");
console.log(deque.toString()); // John,Jack

deque.addBack("Camila");
console.log(deque.toString()); // John,Jack,Camila
console.log(deque.size()); //  3
console.log(deque.isEmpty()); // false

deque.removeFront(); // remove John
console.log(deque.lowestCount); // 1
console.log(deque.toString()); // Jack,Camila

deque.removeBack(); // Camila decides to leave
console.log(deque.toString()); // Jack

deque.addFront("John"); // John comes back for information
console.log(deque.toString()); // John,Jack

console.log(deque); // Deque { count: 2, lowestCount: 0, items: { '0': 'John', '1': 'Jack' } }
