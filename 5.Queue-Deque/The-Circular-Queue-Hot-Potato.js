class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(ele) {
    this.items[this.count++] = ele;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount]; // {1}
    delete this.items[this.lowestCount]; // {2}
    this.lowestCount++; // {3}
    return result; // {4}
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  isEmpty() {
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
}

function hotPotato(elementsList, num) {
  const queue = new Queue(); // {1}
  const elimitatedList = [];
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]); // {2}
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // {3}
    }
    console.log("queue.items:  ");
    console.log(queue.items);

    elimitatedList.push(queue.dequeue()); // {4}
    console.log("elimitatedList:  ");
    console.log(elimitatedList);

    console.log(queue.size());
  }

  return {
    eliminated: elimitatedList,
    winner: queue.dequeue() // {5}
  };
}

const names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
const result = hotPotato(names, 7);
result.eliminated.forEach(name => {
  console.log(`${name} was eliminated from the Hot Potato game.`);
});
console.log(`The winner is: ${result.winner}`);
