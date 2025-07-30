import TriangleCell from './TriangleCell.js';
import MazeGrid from './MazeGrid.js';

class TriangleGrid extends MazeGrid {
    constructor(row, column) {
        super(row, column);
    }

    prepareGrid() {
        this.grid = new Array(this.row);
        for (let i = 0; i < this.row; i++) {
            this.grid[i] = new Array(this.column);
            for (let j = 0; j < this.column; j++) {
                this.grid[i][j] = new TriangleCell(i, j);
            }
        }
    }

    configureNeighbours() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                const cell = this.grid[i][j];

                if (this.isOnGrid(i, j - 1)) {
                    cell.neighbours.set("West", this.grid[i][j - 1]);
                }
                if (this.isOnGrid(i, j + 1)) {
                    cell.neighbours.set("East", this.grid[i][j + 1]);
                }
                if (!cell.UpRight() && this.isOnGrid(i - 1, j)) {
                    cell.neighbours.set("North", this.grid[i - 1][j]);
                } else if (cell.UpRight() && this.isOnGrid(i + 1, j)) {
                    cell.neighbours.set("South", this.grid[i + 1][j]);
                }
            }
        }
    }
}

export default TriangleGrid;