import Cell from './Cell.js';
import MazeGrid from './MazeGrid.js';

class HexGrid extends MazeGrid {
    constructor(row, column) {
        super(row, column);
    }

    prepareGrid() {
        this.grid = new Array(this.row);
        for (let i = 0; i < this.row; i++) {
            this.grid[i] = new Array(this.column);
            for (let j = 0; j < this.column; j++) {
                this.grid[i][j] = new Cell(i, j);
            }
        }
    }

    configureNeighbours() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                const cell = this.grid[i][j];
                const row = cell.row;
                const col = cell.column;

                if (col % 2 === 0) {
                    if (this.isOnGrid(row - 1, col - 1)) {
                        cell.neighbours.set("NorthWest", this.grid[row - 1][col - 1]);
                    }
                    if (this.isOnGrid(row - 1, col + 1)) {
                        cell.neighbours.set("NorthEast", this.grid[row - 1][col + 1]);
                    }
                    if (this.isOnGrid(row, col - 1)) {
                        cell.neighbours.set("SouthWest", this.grid[row][col - 1]);
                    }
                    if (this.isOnGrid(row, col + 1)) {
                        cell.neighbours.set("SouthEast", this.grid[row][col + 1]);
                    }
                } else {
                    if (this.isOnGrid(row + 1, col - 1)) {
                        cell.neighbours.set("SouthWest", this.grid[row + 1][col - 1]);
                    }
                    if (this.isOnGrid(row + 1, col + 1)) {
                        cell.neighbours.set("SouthEast", this.grid[row + 1][col + 1]);
                    }
                    if (this.isOnGrid(row, col - 1)) {
                        cell.neighbours.set("NorthWest", this.grid[row][col - 1]);
                    }
                    if (this.isOnGrid(row, col + 1)) {
                        cell.neighbours.set("NorthEast", this.grid[row][col + 1]);
                    }
                }
                
                if (this.isOnGrid(row - 1, col)) {
                    cell.neighbours.set("North", this.grid[row - 1][col]);
                }
                if (this.isOnGrid(row + 1, col)) {
                    cell.neighbours.set("South", this.grid[row + 1][col]);
                }
            }
        }
    }
}

export default HexGrid;