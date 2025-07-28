export default class RecursiveDivisionAlgorithm {
  static generate(grid) {
    // Mark all cells as visited and create initial connections
    for (let r = 0; r < grid.row; r++) {
      for (let c = 0; c < grid.column; c++) {
        const cell = grid.grid[r][c];
        cell.visited = true;
        
        // Connect to all neighbors initially
        if (r > 0) cell.link(grid.grid[r-1][c]);
        if (c > 0) cell.link(grid.grid[r][c-1]);
      }
    }
    
    // Recursively divide the maze
    this.divide(grid, 0, 0, grid.column, grid.row);
  }
  
  static divide(grid, x, y, width, height) {
    if (width < 2 || height < 2) return;
    
    const horizontal = width < height;
    
    if (horizontal) {
      // Horizontal division
      const wallY = y + Math.floor(Math.random() * (height - 1));
      const passageX = x + Math.floor(Math.random() * width);
      
      for (let i = x; i < x + width; i++) {
        if (i !== passageX && wallY < grid.row - 1) {
          const cell1 = grid.grid[wallY][i];
          const cell2 = grid.grid[wallY + 1][i];
          cell1.unlink(cell2);
        }
      }
      
      this.divide(grid, x, y, width, wallY - y + 1);
      this.divide(grid, x, wallY + 1, width, height - (wallY - y + 1));
    } else {
      // Vertical division
      const wallX = x + Math.floor(Math.random() * (width - 1));
      const passageY = y + Math.floor(Math.random() * height);
      
      for (let i = y; i < y + height; i++) {
        if (i !== passageY && wallX < grid.column - 1) {
          const cell1 = grid.grid[i][wallX];
          const cell2 = grid.grid[i][wallX + 1];
          cell1.unlink(cell2);
        }
      }
      
      this.divide(grid, x, y, wallX - x + 1, height);
      this.divide(grid, wallX + 1, y, width - (wallX - x + 1), height);
    }
  }
}