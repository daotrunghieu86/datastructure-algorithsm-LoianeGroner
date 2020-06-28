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

  // Creating better hash functions
  // function djbHasCode(key) {
  //   const tableKey = this.toStrFn(key);
  //   let hash = 5381;
  //   for (let i = 0; i < tableKey.length; i++) {
  //     hash = hash * 33 + tableKey.charCodeAt(i);
  //   }
  //   return hash % 1013;
  // }

  // 807 - Ygritte;
  // 288 - Jonathan;
  // 962 - Jamie;
  // 619 - Jack;
  // 275 - Jasmine;
  // 877 - Jake;
  // 223 - Nathan;
  // 925 - Athelstan;
  // 502 - Sue;
  // 149 - Aethelwulf;
  // 711 - Sargeras;

  // Linear probing lazy
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
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  get(key) {
    let position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].key;
      }
      let index = position + 1;
      while (this.table[index].key != key && this.table[index] != null) {
        index++;
      }
      if (this.table[index].key === key && this.table[index] != null) {
        return this.table[index].value;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position]; // {1}
        this.verifyRemoveSideEffect(key, position); // {2}
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index]; // {3}
        this.verifyRemoveSideEffect(key, index); // {4}
        return true;
      }
    }
    return false;
  }

  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key); // {1}
    let index = removedPosition + 1; // {2}
    while (this.table[index] != null) {
      // {3}
      const posHash = this.hashCode(this.table[index].key); // {4}
      if (posHash <= hash || posHash <= removedPosition) {
        // {5}
        this.table[removedPosition] = this.table[index]; // {6}
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }
}
