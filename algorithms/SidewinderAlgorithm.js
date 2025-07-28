export default class SidewinderAlgorithm {
  static generate(grid) {
    for (let r = 0; r < grid.row; r++) {
      let run = [];
      
      for (let c = 0; c < grid.column; c++) {
        const cell = grid.grid[r][c];
        cell.visited = true;
        run.push(cell);
        
        const atEasternBoundary = !cell.neighbours.has('East');
        const atNorthernBoundary = !cell.neighbours.has('North');
        
        const shouldCloseOut = atEasternBoundary || 
          (!atNorthernBoundary && Math.random() < 0.5);
        
        if (shouldCloseOut) {
          const member = run[Math.floor(Math.random() * run.length)];
          if (member.neighbours.has('North')) {
            member.link(member.neighbours.get('North'));
          }
          run = [];
        } else {
          cell.link(cell.neighbours.get('East'));
        }
      }
    }
  }
}