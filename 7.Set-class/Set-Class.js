class Set {
  constructor() {
    this.items = {};
  }

  //   has(ele) {
  //     return ele in items;
  //   }

  has(ele) {
    return Object.prototype.hasOwnProperty.call(this.items, ele);
  }

  add(ele) {
    if (!this.has(ele)) {
      this.items[ele] = ele;
      return true;
    }
    return false;
  }

  delete(ele) {
    if (this.has(ele)) {
      delete this.items[ele];
      return true;
    }
    return false;
  }

  clear() {
    this.items = {};
  }

  //only work in modern browsers (such as IE9+, FF4+, Chrome5+, Opera12+, Safari5+, and so on).
  size() {
    return Object.keys(this.items).length;
  }

  // This method will work in any browser
  sizeLegacy() {
    let count = 0;
    for (let key in this.items) {
      //   if (this.has(i)) {
      //     count++;
      //   }
      if (this.items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
  }

  // Returns an array of all of the properties' values of a given object.
  // It was added in ECMAScript 2017 and it is only available in modern browsers.
  value() {
    return Object.values(this.items);
  }

  valueLegacy() {
    let value = [];
    for (let key in this.items) {
      //   value = `${value}, ${this.items[key]}`;
      if (this.items.hasOwnProperty(key)) {
        // value.push(key);
        value.push(this.items[key]);
      }
    }
    return value;
  }

  // SET UNION
  // uses the methods in ECMAScript 2015
  union(otherSet) {
    let newUnionSet = new Set();
    this.value().forEach((ele) => newUnionSet.add(ele));
    otherSet.value().forEach((ele) => newUnionSet.add(ele));
    return newUnionSet;
  }
  // non uses the methods in ECMAScript 2015
  unionSet(other) {
    let newUnionSet = new Set();
    let values = this.value();
    for (let i = 0; i < values.length; i++) {
      newUnionSet.add(values[i]);
    }
    let otherSet = other.value();
    for (let i = 0; i < otherSet.length; i++) {
      newUnionSet.add(otherSet[i]);
    }
    return newUnionSet;
  }

  // SET INTERSECTION
  intersection(otherSet) {
    let intersectionSet = new Set();
    let values = this.value();
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }
    return intersectionSet;
  }
  // Improving the intersection method
  intersectionImprove(other) {
    let intersectionSet = new Set();
    let value = this.value();
    let otherValue = other.value();
    let bigger = value;
    let smaller = otherValue;
    if (bigger.length - smaller.length > 0) {
      bigger = value;
      smaller = otherValue;
    }
    smaller.forEach((ele) => {
      if (bigger.includes(ele)) {
        // includes() method
        intersectionSet.add(ele);
      }
    });
    return intersectionSet;
  }

  // SET DIFFERENCE
  difference(other) {
    let difference = new Set();
    this.value().forEach((ele) => {
      if (!other.has(ele)) {
        difference.add(ele);
      }
    });
    return difference;
  }

  // SUBSET
  // SET là tập con của 'other' đúng hay saI?
  subset(other) {
    if (this.size() > other.size()) {
      return false;
    }
    let isSubSet = true;
    this.value().every((ele) => {
      if (!other.has(ele)) {
        isSubSet = false;
        return false;
      }
      return true; // The "every" method will be evoked as long as the callback function returns true
    });
    return isSubSet;
  }
}

const newSet1 = new Set();
newSet1.add(1);
newSet1.add(2);
newSet1.add(3);

const newSet2 = new Set();
newSet2.add(1);
newSet2.add(2);
newSet2.add(3);
newSet2.add(4);
newSet2.add(5);
newSet2.add(6);

// console.log(newSet1.union(newSet2));
console.log(newSet1.unionSet(newSet2));
// console.log(newSet1.intersection(newSet2));
console.log(newSet1.intersectionImprove(newSet2));
console.log(newSet1.difference(newSet2));
console.log(newSet1.subset(newSet2)); // Set1 là tập con của Set2 đúng k? ==> true;

// console.log("valueLegacy");
// console.log(newSet1.valueLegacy());
