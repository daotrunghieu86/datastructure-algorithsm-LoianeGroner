// Create Queue
class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  // Adds a new element at the back of the queue.
  enqueue(ele) {
    this.items[this.count++] = ele;
  }

  // removes the first element from the queue. It also returns the removed element.
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
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

// Create Graph
class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Map();
  }

  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }
  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += "\n";
    }
    return s;
  }
}

const graph = new Graph();
const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");

// Tùy thuộc vào việc add 'G' hay 'D' trước thì DFS sẽ chạy từ 'C' qua 'G' hay 'D' trước!
graph.addEdge("C", "G");
graph.addEdge("C", "D");

graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
console.log(graph.vertices);
console.log(graph.adjList);
console.log(graph.toString());

// Color indicates whether vertex has been visited yet?
const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

// initializeColor for vertices
initializeColor = vertices => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

//

// BREADTH-FIRST SEARCH (BFS)
const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    console.log(`u --- ${u}`);
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      console.log("neighbors: " + w);
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enqueue(w);
        console.log("1");
      }
    }
    color[u] = Colors.BLACK;
    if (callback) {
      callback(u);
    }
  }
};

const printVertext = value => console.log("Visited vertext: " + value);
breadthFirstSearch(graph, myVertices[0], printVertext);

//

// FIND THE SHORTEST PATHS USING BFS

const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  const distance = {};
  const predecessors = {};
  queue.enqueue(startVertex);

  for (let i = 0; i < vertices.length; i++) {
    distance[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distance[w] = distance[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
  }
  return {
    distance,
    predecessors
  };
};

console.log("===========================");
console.log("Find the shortest paths using BFS");
const shortestPathA = BFS(graph, myVertices[0]);
console.log(shortestPathA);
console.log("============");

// With the prodecessor's array, we can build the path from vertex A to the other vertices using the following code;

class Stack {
  constructor() {
    this.count = 0;
    this.items = [];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  pop() {
    return this.items.pop();
  }
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  clear() {
    this.items = {};
    this.count = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`; // {1}
    for (let i = 1; i < this.count; i++) {
      // {2}
      objString = `${objString},${this.items[i]}`; // {3}
    }
    return objString;
  }
}

const shortPath2 = () => {
  const fromVertex = myVertices[0]; // {9}
  for (i = 1; i < myVertices.length; i++) {
    // {10}
    const toVertex = myVertices[i]; // {11}
    const path = new Stack(); // {12}
    for (
      let v = toVertex;
      v !== fromVertex;
      v = shortestPathA.predecessors[v]
    ) {
      // {13}
      path.push(v); // {14}
    }
    path.push(fromVertex); // {15}
    let s = path.pop(); // {16}
    while (!path.isEmpty()) {
      // {17}
      s += " - " + path.pop(); // {18}
    }
    console.log(s); // {19}
  }
};

shortPath2();

//

// DEPTH-FIRST SEARCH (DFS)
const depFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      deapFirstSearchVisited(vertices[i], color, adjList, callback);
    }
  }
};

function deapFirstSearchVisited(u, color, adjList, callback) {
  color[u] = Colors.GREY;
  if (callback) {
    callback(u);
  }
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      deapFirstSearchVisited(w, color, adjList, callback);
    }
  }
  color[u] = Colors.BLACK;
}

//

// EXPLORING THE DFS ALGORITHM
const DFS = graph => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d = {}; // The discovery time d[u] of u
  const f = {}; // The finish time f[u] when u is marked black
  const p = {}; // The predecessors p[u] of u
  const time = { count: 0 };

  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }
  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }
  return { discovery: d, finished: f, predecessors: p };
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY;
  d[u] = ++time.count;
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = u;
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time.count;
};

//

// TOPOLOGICAL SORTING USING DFS
const newGraph = new Graph(true);
const NewmyVertices = ["A", "B", "C", "D", "E", "F"];
for (i = 0; i < NewmyVertices.length; i++) {
  newGraph.addVertex(NewmyVertices[i]);
}
newGraph.addEdge("A", "C");
newGraph.addEdge("A", "D");
newGraph.addEdge("B", "D");
newGraph.addEdge("B", "E");
newGraph.addEdge("C", "F");
newGraph.addEdge("F", "E");

const result = DFS(newGraph);

const discoveryTime = result.discovery;
console.log(discoveryTime);

const finishedTimes = result.finished;
console.log(finishedTimes);

const predecessorsTimes = result.predecessors;
console.log(predecessorsTimes);

let s = "";
for (let count = 0; count < NewmyVertices.length; count++) {
  let max = 0;
  let maxName = null;
  for (let i = 0; i < NewmyVertices.length; i++) {
    if (finishedTimes[NewmyVertices[i]] > max) {
      max = finishedTimes[NewmyVertices[i]];
      maxName = NewmyVertices[i];
    }
  }
  s += " - " + maxName;
  delete finishedTimes[maxName];
}
console.log("===============");
console.log("// TOPOLOGICAL SORTING USING DFS");
console.log(newGraph.getVertices());
console.log(s);
console.log(finishedTimes);

//

// SHORTEST PATH ALGORITHMS - Dijkstra's algorithms
const shortestGraph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
];
const INF = Number.MAX_SAFE_INTEGER;
const dijkstra = (shortestGraph, src) => {
  const dist = [];
  const visited = [];
  const { length } = shortestGraph;
  for (let i = 0; i < length; i++) {
    // {1}
    dist[i] = INF;
    visited[i] = false;
  }
  dist[src] = 0; // {2}
  for (let i = 0; i < length - 1; i++) {
    // {3}
    const u = minDistance(dist, visited); // {4}
    visited[u] = true; // {5}
    for (let v = 0; v < length; v++) {
      if (
        !visited[v] &&
        shortestGraph[u][v] !== 0 &&
        dist[u] !== INF &&
        dist[u] + shortestGraph[u][v] < dist[v]
      ) {
        // {6}
        dist[v] = dist[u] + shortestGraph[u][v]; // {7}
      }
    }
  }
  return dist; // {8}
};

const minDistance = (dist, visited) => {
  let min = INF;
  let minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
};

console.log(dijkstra());
