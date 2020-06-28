function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "number" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

function defaultEquals(a, b) {
  return a == b;
}

class Node {
  constructor(ele) {
    this.ele = ele;
    this.next = undefined;
  }
}

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  isEmpty() {
    return this.count === 0;
  }

  getHead() {
    return this.head;
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
}

class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashTable(key) {
    let hash = 0;
    let tableKey = this.toStrFn(key);
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashTable(key);
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(ValuePair(key, value));
      return true;
    }
    return false;
  }

  get(key) {
    let position = this.hashCode(key);
    let linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.ele.key === key) {
          return current.ele.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  remove(key) {
    let position = this.hashCode(key);
    let linkList = this.table[position];
    if (linkList != null && !linkList.isEmpty()) {
      let current = this.head;
      while (current != null) {
        if (current.ele.key === key) {
          linkList.remove(current.ele);
          if (linkList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
}
