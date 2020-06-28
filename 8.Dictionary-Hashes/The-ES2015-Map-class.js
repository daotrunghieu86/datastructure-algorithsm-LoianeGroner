const map = new Map();

map.set("Gandafl", "gandalf@email.com");
map.set("John", "john@email.com");
map.set("Tyrion", "tyrion@email.com");

console.log(map.has("Gandafl")); // true
console.log(map.size); // 3
console.log(map.keys()); // [Map Iterator] { 'Gandafl', 'John', 'Tyrion' }
console.log(map.values()); // [Map Iterator] { 'gandalf@email.com', 'john@email.com', 'tyrion@email.com' }
console.log(map.get("John")); // john@email.com

function Dog() {}

// Dog.prototype.name = "Puppy";

// Dog.prototype.run = function () {
//   console.log(this.name + " is running...");
// };

console.log(Dog);
console.log(Dog.prototype);

puppy = new Dog();
console.log("puppy");
console.log(puppy);
puppy.run();
Dog.prototype.isPrototypeOf(puppy);
puppy.__proto__ === Dog.prototype;
