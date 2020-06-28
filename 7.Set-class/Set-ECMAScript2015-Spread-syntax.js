// The Set object lets you store unique values of any type, whether primitive values or object references.

// The difference between our Set class and the ES2015 Set class is that the values method returns Iterator (which you learned in Chapter 3, Arrays) instead of the array with the values. Another difference is that we developed a size method to return the number of values the Set stores. The ES2015 Set class has a property named size.

const set = new Set();
set.add(0);
set.add(1);
set.add(2);
set.add(3);
console.log(set.values()); // return 'object' instate of 'array' as in 'Set-Class.js'
// ▼ SetIterator {0, 1, 2, 3}
//  ▼ [[Entries]]
//    ► 0: 0
//    ► 1: 1
//    ► 2: 2
//    ► 3: 3
//  ► __proto__: Set Iterator
// [[IteratorHasMore]]: true
// [[IteratorIndex]]: 0
// [[IteratorKind]]: "values"

console.log(set.has(2)); // true
console.log(set.size); // 4
console.log(set);
// ▼ Set(4) {0, 1, 2, 3}
//  ▼ [[Entries]]
//    ► 0: 0
//    ► 1: 1
//    ► 2: 2
//    ► 3: 3
//    size: (...) // 4
//  ► __proto__: Set

const setA = new Set();
setA.add(0);
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
setB.add(5);

// UNION
const union = (set1, set2) => {
  const uniSet = new Set();
  // The 'forEach()' method executes a provided function once for each value in the 'Set' object, in insertion order.
  set1.forEach((value) => uniSet.add(value));
  set2.forEach((value) => uniSet.add(value));
  return uniSet;
};

// INTERSECTION
const intersection = (set1, set2) => {
  let resultIntersection = new Set();
  set1.forEach((value) => {
    if (set2.has(value)) {
      resultIntersection.add(value);
    }
  });
  return resultIntersection;
};

// DIFFERENCE
const difference = (set1, set2) => {
  let diference = new Set();
  set1.forEach((value) => {
    if (!set2.has(value)) {
      diference.add(value);
    }
  });
  return diference;
};

console.log(union(setA, setB)); // Set { 0, 1, 2, 3, 4, 5}
console.log(intersection(setA, setB)); // Set { 2, 3 }
// setA khác setB: x thuộc A và x không thuộc B
console.log(difference(setA, setB));

// SPREAD OPERATOR - UNION
console.log(new Set([...setA, ...setB])); // Set { 0, 1, 2, 3, 4, 5 }

// SPREAD OPERATOR - INTERSECTION
console.log(new Set([...setA].filter((x) => setB.has(x)))); //Set { 2, 3 }

// SPREAD OPERATOR - DIFFERENCE
console.log(new Set([...setA].filter((x) => !setB.has(x)))); // Set { 0, 1 }
