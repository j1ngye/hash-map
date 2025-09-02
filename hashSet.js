import { LinkedList } from "./linkedList.js";

class HashSet {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
  }

  hash(value) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < value.length; i++) {
      hashCode = (primeNumber * hashCode + value.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  add(value) {
    const index = this.hash(value);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }

    let currentNode = this.buckets[index].head;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        currentNode.value = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }

    this.buckets[index].append(value);

    if (this.length() / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  has(value) {
    const index = this.hash(value);
    const bucket = this.buckets[index];

    if (bucket) {
      let currentNode = bucket.head;
      while (currentNode !== null) {
        if (currentNode.value === value) {
          return true;
        }
        currentNode = currentNode.nextNode;
      }
    }

    return false;
  }

  delete(value) {
    const index = this.hash(value);
    const bucket = this.buckets[index];
    if (bucket) {
      let currentNode = bucket.head;
      let i = 0;
      while (currentNode !== null) {
        if (currentNode.value === value) {
          bucket.removeAt(i);
          return true;
        }
        i++;
        currentNode = currentNode.nextNode;
      }
    }

    return false;
  }

  length() {
    let total = 0;
    this.buckets.forEach((b) => {
      if (b) {
        total += b.size;
      }
    });
    return total;
  }

  resize() {
    this.capacity *= 2;
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity);

    for (let bucket of oldBuckets) {
      if (bucket) {
        let currentNode = bucket.head;
        while (currentNode !== null) {
          this.add(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
  }
}

const mySet = new HashSet();
mySet.add("a");
mySet.add("b");
mySet.add("c");
mySet.add("d");
mySet.add("e");
console.log(mySet.length());
