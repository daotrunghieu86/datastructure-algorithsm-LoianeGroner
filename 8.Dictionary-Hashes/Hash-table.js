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

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key;
    }
    let hash = 0;
    let tableKey = this.toStrFn(key);
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    if (key != null && value !== null) {
      let position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  size() {
    console.log(Object.keys(this.table)); // (3) ["15", "20", "27"]
    return Object.keys(this.table).length;
    // return this.keyValues().length; // mất nhiều bộ nhớ hoạt động
  }

  remove(key) {
    let hash = this.hashCode(key);
    let valuePair = this.table[hash];
    if (valuePair !== null) {
      //   delete valuePair; // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode. because ↡ ↡ ↡
      // The delete operator is designed to be used on object properties. It has no effect on variables or functions.

      delete this.table[hash];
      return true;
    }
    return false;
  }

  isEmpty() {
    return this.table.length == 0 ? true : false; //
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString}, {${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}

// const hash1 = new HashTable();
// hash1.put("hieu", "daotrunghieu@gmail.com");
// hash1.put("huong", "nguyenthihuong@gmail.com");
// hash1.put("taubi", "taubi@gmail.com");
// console.log(hash1.table); // {15: ValuePair, 20: ValuePair, 27: ValuePair}
// console.log(hash1.size());
// console.log(hash1.remove("hieu")); // true
// console.log(hash1.get("hieu")); // undefined

// //

// // Handling collisions between hash tables;
// // is overwrite
// const hash = new HashTable();
// hash.put("Ygritte", "ygritte@email.com"); // 4 - Ygritte
// hash.put("Jonathan", "jonathan@email.com"); // 5 - Jonathan
// hash.put("Jamie", "jamie@email.com"); //5 - Jamie
// hash.put("Jack", "jack@email.com"); // 7 - Jack
// hash.put("Jasmine", "jasmine@email.com"); // 8 - Jasmine
// hash.put("Jake", "jake@email.com"); // 9 - Jake
// hash.put("Nathan", "nathan@email.com"); // 10 - Nathan
// hash.put("Athelstan", "athelstan@email.com"); // 7 - Athelstan;
// hash.put("Sue", "sue@email.com"); // 5 - Sue;
// hash.put("Aethelwulf", "aethelwulf@email.com"); // 5 - Aethelwulf;
// hash.put("Sargeras", "sargeras@email.com"); // 10 - Sargeras;

// console.log(hash.toString());
// // {4 => [#Ygritte: ygritte@email.com]}, {5 => [#Aethelwulf: aethelwulf@email.com]}, {7 => [#Athelstan: athelstan@email.com]}, {8 => [#Jasmine: jasmine@email.com]}, {9 => [#Jake: jake@email.com]}, {10 => [#Sargeras: sargeras@email.com]}

// console.log(hash.table);
// // 4: ValuePair {key: "Ygritte", value: "ygritte@email.com"}
// // 5: ValuePair {key: "Aethelwulf", value: "aethelwulf@email.com"}
// // 7: ValuePair {key: "Athelstan", value: "athelstan@email.com"}
// // 8: ValuePair {key: "Jasmine", value: "jasmine@email.com"}
// // 9: ValuePair {key: "Jake", value: "jake@email.com"}
// // 10: ValuePair {key: "Sargeras", value: "sargeras@email.com"}
// // console.log(defaultExport());

let arr = [2, 7, 11, 15];
let twoSum = new HashTable();
function TwoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    twoSum.put(arr[i], arr[i]);
  }
  console.log(twoSum);
  for (let i = 0; i < arr.length; i++) {}
}

TwoSum(arr, 9);
