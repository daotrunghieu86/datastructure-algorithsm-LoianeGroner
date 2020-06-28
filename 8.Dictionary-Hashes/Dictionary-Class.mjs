function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  console.log("item" + item);
  return item.toString(); // {1}
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

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn; //
    this.table = {}; //  {Gandalf: ValuePair, John: ValuePair, Tyrion: ValuePair}
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
    // return this.table[key] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      // console.log(tableKey);
      // console.log(tableKey instanceof String);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return `${key} was removed!`;
    }
    return `${key} wasn't removed!`;
  }

  // get(key) {
  //   const valuePair = this.table[this.toStrFn(key)];
  //   return valuePair == null ? undefined : valuePair.value;
  // }

  // In this second approach, we would be retrieving the string for the key and accessing the table object twice: the first time in the hasKey method and the second time inside the if statement. It is a small detail, but the first approach has a cheaper processing cost.
  get(key) {
    if (this.hasKey(key)) {
      // return this.table[key].value;
      return this.table[this.toStrFn(key)].value;
    }
    return undefined;
  }

  // the built-in values method from the JavaScript Object class introduced in the ECMAScript 2017
  // keyValues() {
  //   return Object.values(this.table);
  // }
  keyValues() {
    let valuePair = [];
    for (let i in this.table) {
      if (this.hasKey(i)) {
        valuePair.push(this.table[i]);
      }
    }
    return valuePair; // [ValuePair, ValuePair, ValuePair(object)]
  }

  // keys() {
  //   return this.keyValues().map(valuePair => valuePair.key);
  // }

  keys() {
    let key = [];
    const valuePair = this.keyValues();
    for (let i = 0; i < valuePair.length; i++) {
      key.push(valuePair[i].key);
    }
    return key;
  }

  values() {
    return this.keyValues().map((valuePair) => valuePair.value);
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  size() {
    console.log(Object.keys(this.table));
    return Object.keys(this.table).length;
    // return this.keyValues().length; // mất nhiều bộ nhớ hoạt động
  }

  isEmpty() {
    return this.table.length == 0 ? true : false; //
  }

  clear() {
    this.table = {};
  }

  // toString() {
  //   if (this.isEmpty()) {
  //     return "";
  //   }
  //   let toString = "";
  //   for (let i in this.table) {
  //     toString = `${toString}, ${this.table[i].key}: ${this.table[i].value}`;
  //   }
  //   return toString;
  // }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`; // {1}
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`; // {2}
    }
    return objString; // {3}
  }
}

const dictionary = new Dictionary();
// console.log(dictionary.set("Gandalf", "gandalf@email.com")); // true
dictionary.set("Gandalf", "gandalf@email.com");
dictionary.set("Gandalf", "daotrunghieu@email.com");
dictionary.set("John", "johnsnow@email.com");
dictionary.set("Tyrion", "tyrion@email.com");
dictionary.set(123, "hieu@email.com");
console.log(dictionary.keyValues()); //(3) [ValuePair, ValuePair, ValuePair]
console.log(dictionary.table); // {Gandalf: ValuePair, John: ValuePair, Tyrion: ValuePair}
console.log(dictionary.hasKey("Gandalf")); // true
console.log(dictionary.size()); // 4
console.log(dictionary.keys()); // (4) [123, "Gandalf", "John", "Tyrion"]
console.log(dictionary.values()); // (4) ["hieu@email.com", "gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(dictionary.get("Tyrion")); // tyrion@email.com
console.log(dictionary.remove("Tyrion")); // Tyrion was removed!
dictionary.forEach((k, v) => {
  console.log(`forEach: `, `key: ${k}, value: ${v}`);
  //   forEach:  key: 123, value: hieu@email.com
  //  forEach:  key: Gandalf, value: gandalf@email.com
  // forEach:  key: John, value: johnsnow@email.com
});
console.log(dictionary.toString());
