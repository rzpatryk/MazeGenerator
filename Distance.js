// Klasa Distance do obsługi odległości między komórkami
class Distance {
  constructor(root) {
    this.root = root;
    this.cells = new Map();
    this.cells.set(root, 0);
  }

  getValue(cell) {
    return this.cells.get(cell) || 0;
  }

  getCells() {
    return this.cells;
  }

  has(cell) {
    return this.cells.has(cell);
  }

  set(cell, value) {
    this.cells.set(cell, value);
  }
}

// Zmień na ES6 export
export default Distance;
