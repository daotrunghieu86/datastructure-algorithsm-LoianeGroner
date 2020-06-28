class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  // Adds a new element at the back of the queue.
  enqueue(ele) {
    this.items[this.count++] = ele;
    // objectName["propertyName"]
  }

  // removes the first element from the queue. It also returns the removed element.
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount]; // {1}
    delete this.items[this.lowestCount]; // {2}
    this.lowestCount++; // {3}
    // Như bình thường sẽ giảm 'this.count' nhưng vì 'count' đã được gán cho các giá trị. Nên nếu muốn giảm 'count' phải thay đổi tất cả các property khác.
    // Nên sử dụng 'this.lowestCount' để tăng lên 1 đơn vị, ý là đẩy vị trí thấp nhất lên 1 đơn vị để đuổi bắt được cái giá trị thấp nhất khi hành động 'xóa' item vừa diễn ra.
    return result; // {4}
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
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
    console.log(`this.lowestCount ${this.lowestCount}`);
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

const newQueue = new Queue();
console.log(newQueue.isEmpty()); // true
newQueue.enqueue("dao");
newQueue.enqueue("trung");
newQueue.enqueue("hieu");

console.log(newQueue.items);
// { '0': 'dao', '1': 'trung', '2': 'hieu' }

console.log(newQueue.toString()); // dao, trung, hieu

console.log(newQueue.size()); // 3

console.log(newQueue.isEmpty()); // false

console.log(newQueue.dequeue()); // dao
console.log(newQueue.dequeue()); // trung

console.log(newQueue.toString()); // hieu
console.log(newQueue.items); // { '2': 'hieu' }
