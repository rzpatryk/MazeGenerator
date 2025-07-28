export default class EllerAlgorithm {
  static generate(grid) {
    // Simple implementation of Eller's algorithm
    for (let r = 0; r < grid.row; r++) {
      for (let c = 0; c < grid.column; c++) {
        const cell = grid.grid[r][c];
        cell.visited = true;
        
        // Connect randomly to east neighbor
        if (c < grid.column - 1 && Math.random() < 0.5) {
          cell.link(grid.grid[r][c + 1]);
        }
        
        // Connect randomly to south neighbor
        if (r < grid.row - 1 && Math.random() < 0.5) {
          cell.link(grid.grid[r + 1][c]);
        }
      }
    }
  }
}