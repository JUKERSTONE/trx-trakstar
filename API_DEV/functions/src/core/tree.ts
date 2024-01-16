export class TreeNode {
  value: any;
  default: TreeNode | null;
  like: TreeNode | null;
  dislike: TreeNode | null;

  constructor(value: any) {
    this.value = value;
    this.default = null;
    this.like = null;
    this.dislike = null;
  }
}

export class Tree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  addNode(node: TreeNode) {
    // If the tree is empty, make the new node the root
    if (this.root === null) {
      this.root = node;
    } else {
      // Otherwise, find the correct place for the new node
      this.insertNode(this.root, node);
    }
  }

  insertNode(currentNode: TreeNode, newNode: TreeNode) {
    // Use a queue to perform a breadth-first traversal until we find
    // a node that does not have all children filled
    const queue = [currentNode];

    while (queue.length > 0) {
      const node = queue.shift();

      if (!node) return;

      // Check each child and insert the new node at the first available position
      if (node.like === null) {
        node.like = newNode;
        return; // Stop the function once the node is inserted
      } else {
        queue.push(node.like); // Add the child to the queue for further traversal
      }

      if (node.dislike === null) {
        node.dislike = newNode;
        return; // Stop the function once the node is inserted
      } else {
        queue.push(node.dislike); // Add the child to the queue for further traversal
      }

      if (node.default === null) {
        node.default = newNode;
        return; // Stop the function once the node is inserted
      } else {
        queue.push(node.default); // Add the child to the queue for further traversal
      }
    }
  }

  // Additional tree methods like find, traverse, etc., can be added here
}
