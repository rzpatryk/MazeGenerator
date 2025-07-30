const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let rows = 10;
let cols = 10;
let grid = [];
let cellWidth, cellHeight;

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

  has(cell) {
    return this.cells.has(cell);
  }

  set(cell, value) {
    this.cells.set(cell, value);
  }
}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    // Zachowujemy oryginalną funkcjonalność ścian dla rysowania
    this.walls = { top: true, right: true, bottom: true, left: true };
    this.visited = false;
    
    // Dodajemy nowe funkcjonalności z C#
    this.links = [];
    this.neighbours = new Map();
  }

  // Gettery i settery dla zgodności z C#
  get Row() { return this.row; }
  set Row(value) { this.row = value; }

  get Column() { return this.col; }
  set Column(value) { this.col = value; }

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

  // Dodatkowa metoda do dodawania sąsiadów
  addNeighbour(direction, cell) {
    this.neighbours.set(direction, cell);
  }

  // Metoda do pobierania sąsiada w określonym kierunku
  getNeighbour(direction) {
    return this.neighbours.get(direction);
  }

  // Oryginalnie funkcja rysowania (zachowana)
  draw(ctx) {
    const x = this.col * cellWidth + (canvas.width * 0.05 / 2);
    const y = this.row * cellHeight + (canvas.height * 0.05 / 2);

    ctx.strokeStyle = "#fff"; // Zmienione z "#000" na "#fff" dla białych ścian
    ctx.lineWidth = 2;

    if (this.walls.top) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellWidth, y);
      ctx.stroke();
    }
    if (this.walls.right) {
      ctx.beginPath();
      ctx.moveTo(x + cellWidth, y);
      ctx.lineTo(x + cellWidth, y + cellHeight);
      ctx.stroke();
    }
    if (this.walls.bottom) {
      ctx.beginPath();
      ctx.moveTo(x + cellWidth, y + cellHeight);
      ctx.lineTo(x, y + cellHeight);
      ctx.stroke();
    }
    if (this.walls.left) {
      ctx.beginPath();
      ctx.moveTo(x, y + cellHeight);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

// document.getElementById('generateMaze').addEventListener('click', () => {
//   rows = parseInt(document.getElementById('rows').value);
//   cols = parseInt(document.getElementById('cols').value);
//   //const algorithm = document.getElementById('algorithm').value;

//   generateGrid(rows, cols);

// //   if (algorithm === 'dfs') {
// //     generateMazeDFS();
// //   } else if (algorithm === 'prim') {
// //     generateMazePrim();
// //   } else if (algorithm === 'kruskal') {
// //     generateMazeKruskal();
// //   }

//   drawGrid();
// });

function generateGrid(r, c) {
  cellWidth = (canvas.width - canvas.width * 0.05) / c;
  cellHeight = (canvas.height - canvas.height * 0.05) / r;
  grid = [];

  for (let row = 0; row < r; row++) {
    for (let col = 0; col < c; col++) {
      grid.push(new Cell(row, col));
    }
  }
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Ustaw czarne tło
  ctx.fillStyle = '#2c2c2c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let cell of grid) {
    cell.draw(ctx);
  }
}

// Puste funkcje na przyszłość
function generateMazeDFS() {
  console.log("TODO: algorytm DFS");
}

function generateMazePrim() {
  console.log("TODO: algorytm Prim");
}

function generateMazeKruskal() {
  console.log("TODO: algorytm Kruskal");
}
