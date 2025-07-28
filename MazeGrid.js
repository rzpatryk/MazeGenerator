// Abstrakcyjna klasa MazeGrid przepisana z C# na JavaScript
// Wymaga: Cell.js (lub odpowiednia klasa Cell)
//const Cell = require('./Cell'); // Dodano import klasy Cell

class MazeGrid {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.grid = null;
    
    this.prepareGrid();
    this.configureNeighbours();
  }

  // Gettery i settery dla zgodności z C#
  get Row() { return this.row; }
  set Row(value) { this.row = value; }

  get Column() { return this.column; }
  set Column(value) { this.column = value; }

  get Grid() { return this.grid; }
  set Grid(value) { this.grid = value; }

  // Abstrakcyjne metody - muszą być zaimplementowane w klasach dziedziczących
  prepareGrid() {
    throw new Error("prepareGrid() must be implemented by subclass");
  }

  configureNeighbours() {
    throw new Error("configureNeighbours() must be implemented by subclass");
  }

  // Generuje losową liczbę z zakresu [low, high)
  getRandomNumber(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
  }

  // Liczy nieodwiedzone komórki
  unvisitedCellsCount() {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].visited === false) {
          count++;
        }
      }
    }
    return count;
  }

  // Zwraca listę nieodwiedzonych komórek
  getUnvisitedCells() {
    const unvisitedCells = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].visited === false) {
          unvisitedCells.push(this.grid[i][j]);
        }
      }
    }
    return unvisitedCells;
  }

  // Zwraca losową komórkę z siatki
  getRandomCell() {
    const r = this.getRandomNumber(0, this.row);
    const c = this.getRandomNumber(0, this.grid[r].length);
    return this.grid[r][c];
  }

  // Sprawdza czy pozycja jest w granicach siatki
  isOnGrid(row, col) {
    if (row < 0 || row > this.row - 1) {
      return false;
    }
    if (col < 0 || col > this.grid[row].length - 1) {
      return false;
    }
    return true;
  }

  // Prywatna metoda do znajdowania ślepych zaułków
  getDeadEnds() {
    const deadEnds = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].links.length === 1) {
          deadEnds.push(this.grid[i][j]);
        }
      }
    }
    return deadEnds;
  }

  // Usuwa niektóre ślepe zaułki
  removeDeadEnds() {
    const deadEnds = this.getDeadEnds();
    
    deadEnds.forEach(cell => {
      const randomNumber = this.getRandomNumber(0, 3);
      if (randomNumber === 0) {
        // Znajdź sąsiadów, którzy nie są połączeni z aktualną komórką
        const neighbours = [];
        for (const neighbour of cell.neighbours.values()) {
          if (!neighbour.linked(cell)) {
            neighbours.push(neighbour);
          }
        }

        if (neighbours.length > 0) {
          let neighbour = null;
          
          // Szukaj sąsiada, który też ma tylko jedno połączenie
          for (const cellNeighbour of neighbours) {
            if (cellNeighbour.links.length === 1) {
              neighbour = cellNeighbour;
              break;
            }
          }

          // Jeśli nie znaleziono, wybierz losowego sąsiada
          if (neighbour === null) {
            neighbour = neighbours[this.getRandomNumber(0, neighbours.length)];
          }

          cell.link(neighbour, true);
        }
      }
    });
  }

  // Pomocnicza metoda do wyświetlania informacji o siatce
  toString() {
    return `MazeGrid(${this.row}x${this.column})`;
  }

  // Metoda do pobierania konkretnej komórki
  getCell(row, col) {
    if (this.isOnGrid(row, col)) {
      return this.grid[row][col];
    }
    return null;
  }

  // Metoda do resetowania wszystkich komórek (oznaczanie jako nieodwiedzone)
  resetCells() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].visited = false;
        this.grid[i][j].links = [];
      }
    }
  }
}

// Eksport dla użycia w innych plikach
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MazeGrid;
}
