// Create the node and BinarySearchTree classes
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

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

// THE BINARY AND BINARY SEARCH TREE
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  // insert a new Node 'key' in a tree (is  element root)
  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  // insert a new Node in the tree
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  // TREE TRAVERSAL IN-ORDER: from left to right
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    if (node != null) {
      // {2}
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  // TREE TRAVERSAL PRE-ORDER: from the node prior to its descendant
  PreOrderTraverse(callback) {
    this.PreOrderTraverseNode(this.root, callback);
  }

  PreOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.PreOrderTraverseNode(node.left, callback);
      this.PreOrderTraverseNode(node.right, callback);
    }
  }

  // TREE TRAVERSAL POST-ORDER: traversal visits the node after it visits its descendants.
  PostOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // SEARCH FOR VALUES IN A TREE
  // 1 Search for minimum and maximum values
  // 1.1 min value
  min() {
    return console.log(this.minNode(this.root));
  }
  minNode(node) {
    let currentNode = node;
    while (currentNode != null && currentNode.left != null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  // 1.2 max value
  max() {
    return console.log(this.maxNode(this.root));
  }
  maxNode(node) {
    let currentNode = node;
    while (currentNode != null && currentNode.right != null) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  // 2. Search for a specific value
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(CurrentNode, key) {
    if (CurrentNode == null) {
      return false;
    } else if (this.compareFn(key, CurrentNode.key) === Compare.LESS_THAN) {
      return this.searchNode(CurrentNode.left, key);
    } else if (this.compareFn(key, CurrentNode.key) === Compare.BIGGER_THAN) {
      // nếu không trả về 'return' thì 'searchNode is not defined' nguyên nhân bởi trong phạm vi block này không có hàm 'searchNode'
      return this.searchNode(CurrentNode.right, key);
    }
    return true;
  }

  // REMOVING A NODE
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node == null) {
      // {2}
      return null;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // {3}
      node.left = this.removeNode(node.left, key); // {4}
      return node; // {5}
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // {6}
      node.right = this.removeNode(node.right, key); // {7}
      return node; // {8}
    } else {
      // key is equal to node.item
      // case 1: Removing a leaf node
      if (node.left == null && node.right == null) {
        // {9}
        node = null; // {10}
        return node; // {11}
      }
      // case 2: Removing a node with a left or right child
      if (node.left == null) {
        // {12}
        node = node.right; // {13}
        return node; // {14}
      } else if (node.right == null) {
        // {15}
        node = node.left; // {16}
        return node; // {17}
      }
      // case 3: Removing a node with two children
      const aux = this.minNode(node.right); // {18}
      node.key = aux.key; // {19}
      node.right = this.removeNode(node.right, aux.key); // {20}
      return node; // {21}
    }
  }
}

const tree = new BinarySearchTree();
tree.insert(11);
console.log(tree);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
console.log(tree);
const printNode = (value) => console.log(value);
// tree.inOrderTraverse(printNode);
console.log("---------------");
// tree.PreOrderTraverse(printNode);
console.log("---------------");
tree.PostOrderTraverse(printNode);
console.log("---------------");
tree.min();
tree.max();
console.log(tree.search(14));
console.log(tree.search(4));
console.log("---------------");
console.log(tree.remove(18));
tree.PostOrderTraverse(printNode);

//

// Adelson-Velskii and Landi’s tree (AVL tree)
const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
  BALANCED: 3,
};

class AVLTree extends BinarySearchTree() {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    // this.compareFn = compareFn;
    this.root = null;
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  // LEFT-LEFT CASE: single rotation to the right
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  // RIGHT-RIGHT CASE: single rotation to the left
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  // LEFT-RIGHT CASE: double rotation to the right
  rotationLR(node) {
    // const tmp1 = node.left;
    // tmp2 = tmp1.right;
    // node.left = tmp2;
    // tmp2.left = tmp1;
    // tmp2.right = node;
    // return tmp2;
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  // RIGHT-LEFT CASE: double rotation to the left
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  // Inserting a node in the AVL tree
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  insertNode(node, key) {
    // insert node as a BST tree
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node, key);
    } else {
      return node;
    }
    // balance if must do
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left) == Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    } else if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right) === compareFn.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node);
      }
    }
    return node;
  }

  // Removing a node from the AVL tree
  removeNode(node, key) {
    node = super.removeNode(node, key);
    if (node === null) {
      return node;
    }
    // Veryfy if tree is balanced
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }
}

//

// Red - Black tree

class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.key = key;
    this.color = Colors.RED;
    this.parent = null;
  }
  isRed() {
    return (this.color = Colors.RED);
  }
}

class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    // this.compareFn = compareFn;
    this.root = null;
  }

  // Inserting a node in the Red-Black tree
  insert(key = T) {
    if (this.root === null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertNode(node.right, key);
    }
  }

  // Verifying the Red-Black tree properties after insertion
  fixTreeProperties(node) {
    while (
      node &&
      node.parent &&
      node.parent.color.isRed() &&
      node.color !== Colors.BLACK
    ) {
      let parent = node.parent;
      const grandParent = parent.parent;

      // case A: parent is left child
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right;

        // case A1: uncle of node is also red - only recoloring
        if (uncle && unclie.color === Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // case A2: node is right child - left rotate
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }
          // case A3: node is left child - right rotate
          this.rotationLL(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      } else {
        // case B: parent is right child
        const uncle = grandParent.left;

        // case B1: uncle is red - only recoloring
        if (uncle & (uncle.color === Colors.RED)) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // case B2: node is left child - right rotate
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }
          // case B3: node is right child - left rotate
          this.rotationRR(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
    }
    this.root.color = Colors.BLACK;
  }

  // Red-Black tree rotations
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.right = node;
    node.parent = tmp;
  }
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    if (tmmp.left && tmp.left.key) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.left = node;
    node.parent = tmp;
  }
}
