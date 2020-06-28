function defaultEquals(a, b) {
  return a === b;
}

class Node {
  constructor(ele) {
    this.ele = ele;
    this.next = undefined;
  }
}

// ========================
// LinkedList
// ========================

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    //   constructor(equalsFn) {
    this.count = 0; // {2}
    this.head = undefined; // {3}
    this.equalsFn = equalsFn; // {4}
  }

  push(ele) {
    const node = new Node(ele);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index == 0) {
        this.head = current.next;
      } else {
        // Cách 1:
        // let previous;
        // for (let i = 0; i < index; i++) {
        //   previous = current;
        //   current = current.next;
        // }
        // previous.next = current.next;

        // Cách 2:
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.ele;
    }
    return undefined;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        // node != null: là để cho i chạy tới phần tử gần cuối của list. Rồi còn thực hiện lệnh dưới nữa
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  insert(ele, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(ele);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        previous.next = node;
        node.next = current;
      }
      this.count++;
      return true;
    }
    return false;
  }

  indexOf(ele) {
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (this.equalsFn(ele, current.ele)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  remove(ele) {
    const index = this.indexOf(ele);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.head === null) {
      return "";
    }
    let objString = this.head.ele;
    let current = this.head.next;
    for (let i = 0; i < this.count && current != null; i++) {
      // current != null: ý là không để current chạy quá link-list, không thì sẽ không đọc được 'ele' vì phần tử gán vào không có giá trị ele
      objString = `${objString}, ${current.ele}`;
      current = current.next;
    }
    return objString;
  }
}

// const list = new LinkedList();
// list.push(1);
// list.push(2);
// list.push(3);
// list.push(4);
// list.push(5);
// // list.removeAt(1); // done
// // list.insert(10, 4); // done
// // console.log(list.count);
// // console.log(list.getElementAt(5));
// // console.log(list.getElementAt(3));
// // console.log(list.indexOf(4));
// list.remove(1);
// console.log(list);
// console.log(list.toString());

//

// ===================================
// DoublyLinkListed
// ===================================

class DoublyNode extends Node {
  constructor(ele, next, prev) {
    super(ele, next);
    this.prev = prev;
  }
}

class DoublyLinkListed extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  push(ele) {
    const node = new DoublyNode(ele);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  insert(ele, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(ele);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
        // if there is only one item, then we update tail as well NEW
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
      } else if (index === this.count - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        previous.next = current.next;
        current.next.previous = previous;
      }
      this.count--;
      return current.ele;
    }
    return undefined;
  }
}
// Uncaught TypeError: Cannot set property 'next' of undefined. Có lẽ vì 'this.tail' chưa có property 'next'

// const doublyListed = new DoublyLinkListed();
// doublyListed.push(0);
// doublyListed.push(1);
// doublyListed.push(2);
// doublyListed.push(3);
// // doublyListed.insert(4, 4);
// // doublyListed.removeAt(0);
// console.log(doublyListed);

//

// ===================================
// CircularLinkListed
// ===================================
class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  insert(ele, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(ele);
      let current = this.head;
      if (index == 0) {
        if (this.head == null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.count);
          this.head = node;
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index == 0) {
        if (this.count === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.count);
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.ele;
    }
    return undefined;
  }
}

// const CircularList = new CircularLinkedList();
// CircularList.push(0);
// CircularList.push(1);
// CircularList.push(2);
// CircularList.push(3);
// CircularList.insert(3, 3);
// console.log(CircularList);

//

// ===================================
// SortedLinkListed
// ===================================

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

class SortedLinkListed extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.compareFn = compareFn;
  }

  getIndexNextSortedElement(ele) {
    let current = this.head;
    let i = 0;
    for (; i < this.count; i++) {
      const comp = this.compareFn(ele, current.ele);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    return i;
  }

  insert(ele, index = 0) {
    if (this.isEmpty()) {
      return super.insert(ele, 0);
    }
    const pos = this.getIndexNextSortedElement(ele);
    return super.insert(ele, pos);
  }
}

//

// ===================================
// StackLinkedList Class
// ===================================

class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkListed();
  }
  push(ele) {
    this.items.push(ele);
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(this.size() - 1);
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElementAt(this.count - 1).ele;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size();
  }
  clear() {
    this.items.clear();
  }
  toString() {
    return this.items.toString();
  }
}
