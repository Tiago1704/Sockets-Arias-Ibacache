class Queue {
  constructor() {
    this.queue = [];
  }

  agregar(element) {
    this.queue.push(element);
    return this.queue;
  }

  obtener() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  print() {
    return this.queue;
  }
}

module.exports = Queue;
