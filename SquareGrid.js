// Klasa SquareGrid przepisana z C# na JavaScript
// Wymaga: MazeGrid.js i CellAdvanced.js (lub odpowiednia klasa Cell)
import Cell from './Cell'; 
import Cell from './MazeGrid'; 
class SquareGrid extends MazeGrid {
  constructor(row, column) {
    super(row, column);
  }

  // Implementacja abstrakcyjnej metody z MazeGrid
  prepareGrid() {
    this.grid = [];
    
    for (let r = 0; r < this.row; r++) {
      this.grid[r] = [];
      for (let c = 0; c < this.column; c++) {
        this.grid[r][c] = new Cell(r, c);
      }
    }
  }

  // Implementacja abstrakcyjnej metody z MazeGrid
  configureNeighbours() {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.column; c++) {
        const cell = this.grid[r][c];
        
        // Sąsiad na południu (wiersz - 1)
        if (this.isOnGrid(r - 1, c)) {
          cell.neighbours.set("South", this.grid[r - 1][c]);
        }
        
        // Sąsiad na północy (wiersz + 1)
        if (this.isOnGrid(r + 1, c)) {
          cell.neighbours.set("North", this.grid[r + 1][c]);
        }
        
        // Sąsiad na wschodzie (kolumna + 1)
        if (this.isOnGrid(r, c + 1)) {
          cell.neighbours.set("East", this.grid[r][c + 1]);
        }
        
        // Sąsiad na zachodzie (kolumna - 1)
        if (this.isOnGrid(r, c - 1)) {
          cell.neighbours.set("West", this.grid[r][c - 1]);
        }
      }
    }
  }

  // Dodatkowe metody specyficzne dla SquareGrid

  // Pobiera sąsiada w określonym kierunku
  getNeighbour(row, col, direction) {
    if (!this.isOnGrid(row, col)) {
      return null;
    }
    
    const cell = this.grid[row][col];
    return cell.neighbours.get(direction) || null;
  }

  // Pobiera wszystkich sąsiadów komórki
  getCellNeighbours(row, col) {
    if (!this.isOnGrid(row, col)) {
      return [];
    }
    
    return this.grid[row][col].getNeighbours();
  }

  // Sprawdza czy dwie komórki są sąsiadami
  areNeighbours(row1, col1, row2, col2) {
    if (!this.isOnGrid(row1, col1) || !this.isOnGrid(row2, col2)) {
      return false;
    }
    
    const cell1 = this.grid[row1][col1];
    const cell2 = this.grid[row2][col2];
    
    return cell1.neighbours.has(cell2) || cell2.neighbours.has(cell1);
  }

  // Metoda do debugowania - wyświetla siatkę w konsoli
  printGrid() {
    console.log(`SquareGrid ${this.row}x${this.column}:`);
    for (let r = 0; r < this.row; r++) {
      let rowStr = '';
      for (let c = 0; c < this.column; c++) {
        const cell = this.grid[r][c];
        rowStr += `[${r},${c}:${cell.visited ? 'V' : 'U'}] `;
      }
      console.log(rowStr);
    }
  }

  // Metoda do sprawdzania integralności siatki
  validateGrid() {
    let isValid = true;
    
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.column; c++) {
        const cell = this.grid[r][c];
        
        // Sprawdź czy pozycja komórki się zgadza
        if (cell.row !== r || cell.column !== c) {
          console.error(`Cell position mismatch at [${r},${c}]`);
          isValid = false;
        }
        
        // Sprawdź czy sąsiedzi są wzajemni
        for (const [direction, neighbour] of cell.neighbours) {
          const oppositeDirection = this.getOppositeDirection(direction);
          if (!neighbour.neighbours.has(oppositeDirection) || 
              neighbour.neighbours.get(oppositeDirection) !== cell) {
            console.error(`Neighbour relationship not mutual between [${r},${c}] and [${neighbour.row},${neighbour.column}]`);
            isValid = false;
          }
        }
      }
    }
    
    return isValid;
  }

  // Pomocnicza metoda do znajdowania przeciwnego kierunku
  getOppositeDirection(direction) {
    const opposites = {
      'North': 'South',
      'South': 'North',
      'East': 'West',
      'West': 'East'
    };
    return opposites[direction];
  }

  // Metoda do konwersji na prostą reprezentację (do debugowania)
  toSimpleArray() {
    const result = [];
    for (let r = 0; r < this.row; r++) {
      result[r] = [];
      for (let c = 0; c < this.column; c++) {
        result[r][c] = {
          row: this.grid[r][c].row,
          column: this.grid[r][c].column,
          visited: this.grid[r][c].visited,
          linksCount: this.grid[r][c].links.length,
          neighboursCount: this.grid[r][c].neighbours.size
        };
      }
    }
    return result;
  }
}

// Eksport dla użycia w innych plikach
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SquareGrid;
}
