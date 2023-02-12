const isNotDefined = (val) => val === null || val === undefined; 

class Node {
    constructor(val) {
        this.value = val;
        this.right = null;
        this.left = null;
    }
}

class BinaryTree {
    constructor(val) {
        this.root = val ? this.createNode(val) : null;
        this.insertItem = this.insertItem.bind(this);
    }

    createNode(value) {
        return new Node(value);
    }

    #hasNode(node) {
        return !!node;
    }

    insertItem(node) {
        const newNode = this.createNode(node);

        if(!this.root.value) {
            this.root = newNode;
            return;
        }

        this.#insertItemToTree(this.root, newNode);
    }

    #insertItemToTree(currentRoot, node) {
        if(node.value < currentRoot.value) {
            this.#nodeIterate(currentRoot, node, 'left');
        } else if(node.value > currentRoot.value) {
            this.#nodeIterate(currentRoot, node, 'right');
        } else if(node.value === currentRoot.value) {
            throw new Error('Leaf with same value is already exists');
        }
    }

    #nodeIterate(root, node, direction) {
        const hasNode = this.#hasNode(root[direction]);

        if(!hasNode) {
            root[direction] = node;
        } else {
            this.#insertItemToTree(root[direction], node);
        }
    }
}

class BinaryLevelOrderTraverser {
    constructor() {
        this.type = 'LEVELORDER';
    }

    traverse(root) {
        let queue = [root];
        const result = [];

        while(queue.length > 0) {
            const currentNode = queue.shift();
            result.push(currentNode.value);

            if(currentNode.left) {
                queue.push(currentNode.left);
            } 

            if(currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        return result;
    }
}

class BinaryTreeInDepthTraverser {
    constructor() {
        this.type = 'INDEPTH';
    }

    /**
     * inOrder method of in depth BST
     * benefits: sort our tree from less to more
     * @param {BinaryTree.root} root 
     * @returns {Array<number>} values of ast nodes
     */
    inOrder(root) {
        const result = [];

        function iterate(node) {
            if(isNotDefined(node)) return;

            iterate(node.left);
    
            result.push(node.value);
    
            iterate(node.right);
        }

        iterate(root);

        return result;
    }

    postOrder(root) {
        const result = [];

        function iterate(node) {
            if(isNotDefined(node)) return;

            iterate(node.left);

            iterate(node.right);
            
            result.push(node.value);
        }

        iterate(root);

        return result;
    }

    preOrder(root) {
        const result = [];

        function iterate(node) {
            if(isNotDefined(node)) return;

            result.push(node.value);

            iterate(node.left);

            iterate(node.right);
        }

        iterate(root);

        return result;
    }
}

// USAGE and TESTS

const tree = new BinaryTree(10);
[5,12,11,13,4,2,3,1,6].forEach(tree.insertItem);

const inDepthTraverser = new BinaryTreeInDepthTraverser();
const levelOrderTraverser = new BinaryLevelOrderTraverser();

// const result = levelOrderTraverser.traverse(tree.root);
// console.log({result});

// const result = inDepthTraverser.traverse('inOrder');
// console.log({result});

// const result = inDepthTraverser.preOrder(tree.root);
// console.log({result});

// const result1 = inDepthTraverser.postOrder(tree.root);
// console.log({result1});