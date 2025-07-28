export default class HuntAndKillAlgorithm {
  static generate(grid) {
    let current = grid.getRandomCell();
    current.visited = true;
    
    while (current) {
      const unvisitedNeighbours = current.getUnvisitedNeighbours();
      
      if (unvisitedNeighbours.length > 0) {
        const neighbour = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];
        current.link(neighbour);
        neighbour.visited = true;
        current = neighbour;
      } else {
        current = null;
        
        // Hunt for unvisited cell with visited neighbor
        for (let r = 0; r < grid.row; r++) {
          for (let c = 0; c < grid.column; c++) {
            const cell = grid.grid[r][c];
            if (!cell.visited) {
              const visitedNeighbours = cell.getVisitedNeighbours();
              if (visitedNeighbours.length > 0) {
                cell.visited = true;
                const neighbour = visitedNeighbours[Math.floor(Math.random() * visitedNeighbours.length)];
                cell.link(neighbour);
                current = cell;
                break;
              }
            }
          }
          if (current) break;
        }
      }
    }
  }
}