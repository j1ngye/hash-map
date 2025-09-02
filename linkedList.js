export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  // adds a new node containing value to the end of the list
  append(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.size++;
  }
  // adds a new node containing value to the start of the list
  prepend(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.size++;
  }
  // returns the node at the given index
  at(index) {
    if (index < 0) return null;
    let current = this.head;
    let i = 0;
    while (current !== null && i < index) {
      current = current.nextNode;
      i++;
    }
    return current;
  }
  // removes the last element from the list
  pop() {
    if (this.head === null) return null;

    if (this.head === this.tail) {
      // Only one value
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.size--;
      return value;
    }

    // More than one elements
    let current = this.head;
    while (current.nextNode !== this.tail) {
      current = current.nextNode;
    }
    const value = this.tail.value;
    current.nextNode = null;
    this.tail = current;
    this.size--;
    return value;
  }
  // returns true if the passed in value is in the list and otherwise returns false.
  contains(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }
  // returns the index of the node containing value, or null if not found.
  find(value) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.value === value) {
        return index;
      }
      index++;
      current = current.nextNode;
    }
    return null;
  }
  /* 
  represents your LinkedList objects as strings, 
  so you can print them out and preview them in the console.
  The format should be: ( value ) -> ( value ) -> ( value ) -> null 
  */
  toString() {
    let string = "";
    let current = this.head;
    while (current !== null) {
      string += `(${current.value}) -> `;
      current = current.nextNode;
    }
    return string + "null";
  }
  // inserts a new node with the provided value at the given index.
  insertAt(value, index) {
    if (index > this.size || index < 0) return null;

    const newNode = new Node(value);
    //  insert at the start
    if (index === 0) {
      newNode.nextNode = this.head;
      this.head = newNode;
      if (this.size === 0) {
        this.tail = newNode;
      }
      this.size++;
      return;
    }

    // insert at the end
    if (index === this.size) {
      this.tail.nextNode = newNode;
      this.tail = newNode;
      this.size++;
      return;
    }

    // insert in the middle
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.nextNode;
    }
    newNode.nextNode = prev.nextNode;
    prev.nextNode = newNode;
    this.size++;
  }
  // removes the node at the given index.
  removeAt(index) {
    if (index >= this.size || index < 0) return null;

    // Remove from the start
    if (index === 0) {
      const value = this.head.value;
      this.head = this.head.nextNode;
      this.size--;
      if (this.size === 0) {
        this.tail = null;
      }
      return value;
    }

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      prev = prev.nextNode;
    }

    const value = prev.nextNode.value;
    prev.nextNode = prev.nextNode.nextNode;

    if (index === this.size - 1) {
      this.tail = prev;
    }

    this.size--;
    return value;
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.nextNode = next;
  }
}

const list = new LinkedList();
