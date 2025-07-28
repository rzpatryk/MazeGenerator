export default class BinaryTreeAlgorithm {
  static generate(grid) {
    for (let r = 0; r < grid.row; r++) {
      for (let c = 0; c < grid.column; c++) {
        const cell = grid.grid[r][c];
        cell.visited = true;
        
        const neighbours = [];
        if (cell.neighbours.has('South')) neighbours.push(cell.neighbours.get('South'));
        if (cell.neighbours.has('East')) neighbours.push(cell.neighbours.get('East'));
        
        if (neighbours.length > 0) {
          const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
          cell.link(randomNeighbour);
        }
      }
    }
  }
}