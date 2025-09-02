import { LinkedList } from "./linkedList.js";

export class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }

    let currentNode = this.buckets[index].head;
    while (currentNode !== null) {
      if (currentNode.value[0] === key) {
        // key exists, update the value;
        currentNode.value[1] = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }
    // the bucket is empty
    this.buckets[index].append([key, value]);

    if (this.length() / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      let currentNode = bucket.head;
      while (currentNode !== null) {
        if (currentNode.value[0] === key) {
          return currentNode.value[1];
        }
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;
    let currentNode = bucket.head;
    while (currentNode !== null) {
      if (currentNode.value[0] === key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;
    let currentNode = bucket.head;
    let i = 0;
    while (currentNode !== null) {
      if (currentNode.value[0] === key) {
        bucket.removeAt(i);
        return true;
      }
      i++;
      currentNode = currentNode.nextNode;
    }
  }

  length() {
    let total = 0;
    for (let bucket of this.buckets) {
      if (bucket) {
        total += bucket.size;
      }
    }
    return total;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        let currentNode = bucket.head;
        while (currentNode !== null) {
          keys.push(currentNode.value[0]);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        let currentNode = bucket.head;
        while (currentNode !== null) {
          values.push(currentNode.value[1]);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        let currentNode = bucket.head;
        while (currentNode !== null) {
          entries.push(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return entries;
  }

  resize() {
    this.capacity *= 2;
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity);

    for (let bucket of oldBuckets) {
      if (bucket) {
        let node = bucket.head;
        while (node) {
          this.set(node.value[0], node.value[1]);
          node = node.nextNode;
        }
      }
    }
  }
}
