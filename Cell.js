// Import klasy Distance z osobnego pliku
// Jeśli używasz modułów ES6, użyj: import Distance from './Distance.js';

// Zaawansowana klasa Cell przepisana z C# na JavaScript
class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.visited = false;
    this.links = [];
    this.neighbours = new Map(); // Używamy Map zamiast Dictionary
  }

  // Gettery i settery (opcjonalne w JS, ale dla zgodności z C#)
  get Row() { return this.row; }
  set Row(value) { this.row = value; }

  get Column() { return this.column; }
  set Column(value) { this.column = value; }

  get Links() { return this.links; }
  set Links(value) { this.links = value; }

  get Visited() { return this.visited; }
  set Visited(value) { this.visited = value; }

  get Neighbours() { return this.neighbours; }
  set Neighbours(value) { this.neighbours = value; }

  // Zwraca listę wszystkich sąsiadów
  getNeighbours() {
    const neighbours = [];
    for (const cell of this.neighbours.values()) {
      neighbours.push(cell);
    }
    return neighbours;
  }

  // Łączy dwie komórki (tworzy połączenie)
  link(cell, bidirectional = true) {
    this.links.push(cell);
    if (bidirectional) {
      cell.link(this, false);
    }
  }

  // Usuwa połączenie między komórkami
  unlink(cell, bidirectional = true) {
    const index = this.links.indexOf(cell);
    if (index > -1) {
      this.links.splice(index, 1);
    }
    if (bidirectional) {
      cell.unlink(this, false);
    }
  }

  // Sprawdza czy komórki są połączone
  linked(cell) {
    return this.links.includes(cell);
  }

  // Zwraca listę nieodwiedzonych sąsiadów
  getUnvisitedNeighbours() {
    const unvisitedNeighbours = [];
    const neighbours = this.getNeighbours();
    
    for (const cell of neighbours) {
      if (!cell.visited) {
        unvisitedNeighbours.push(cell);
      }
    }
    return unvisitedNeighbours;
  }

  // Zwraca listę odwiedzonych sąsiadów
  getVisitedNeighbours() {
    const visitedNeighbours = [];
    const neighbours = this.getNeighbours();
    
    for (const cell of neighbours) {
      if (cell.visited) {
        visitedNeighbours.push(cell);
      }
    }
    return visitedNeighbours;
  }

  // Algorytm Dijkstry do obliczania odległości
  distances() {
    const distance = new Distance(this);
    const pending = new Map();
    pending.set(this, 0);

    while (pending.size > 0) {
      // Znajdź komórkę z najmniejszą odległością
      let minCell = null;
      let minValue = Infinity;
      
      for (const [cell, value] of pending) {
        if (value < minValue) {
          minValue = value;
          minCell = cell;
        }
      }

      pending.delete(minCell);

      // Sprawdź wszystkich połączonych sąsiadów
      for (const neighbour of minCell.links) {
        const totalWeight = distance.getValue(minCell) + 1;
        
        if (!distance.has(neighbour) || totalWeight < distance.getValue(neighbour)) {
          pending.set(neighbour, totalWeight);
          distance.set(neighbour, totalWeight);
        }
      }
    }

    return distance;
  }

  // Dodatkowa metoda do dodawania sąsiadów (pomocnicza)
  addNeighbour(direction, cell) {
    this.neighbours.set(direction, cell);
  }

  // Dodatkowa metoda do pobierania sąsiada w określonym kierunku
  getNeighbour(direction) {
    return this.neighbours.get(direction);
  }

  // Metoda do sprawdzania czy komórka ma sąsiada w danym kierunku
  hasNeighbour(direction) {
    return this.neighbours.has(direction);
  }

  // Przydatna metoda do debugowania
  toString() {
    return `Cell(${this.row}, ${this.column})`;
  }
}

// Eksport dla użycia w innych plikach (jeśli używasz modułów)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Cell;
}
