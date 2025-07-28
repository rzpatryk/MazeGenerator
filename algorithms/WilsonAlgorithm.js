export default class WilsonAlgorithm {
  static generate(grid) {
    const unvisited = [];
    
    // Wszystkie komórki są początkowo nieodwiedzone
    for (let r = 0; r < grid.row; r++) {
      for (let c = 0; c < grid.column; c++) {
        unvisited.push(grid.grid[r][c]);
      }
    }
    
    // Wybierz pierwszą komórkę i oznacz jako odwiedzoną
    const first = unvisited[Math.floor(Math.random() * unvisited.length)];
    const index = unvisited.indexOf(first);
    unvisited.splice(index, 1);
    first.visited = true;
    
    while (unvisited.length > 0) {
      let cell = unvisited[Math.floor(Math.random() * unvisited.length)];
      const path = [cell];
      
      // Wykonuj losowy spacer aż nie osiągniesz odwiedzonej komórki
      while (!cell.visited) {
        const neighbours = cell.getNeighbours();
        cell = neighbours[Math.floor(Math.random() * neighbours.length)];
        
        const position = path.indexOf(cell);
        if (position >= 0) {
          // Usuń pętlę
          path.splice(position + 1);
        } else {
          path.push(cell);
        }
      }
      
      // Połącz ścieżkę
      for (let i = 0; i < path.length - 1; i++) {
        path[i].link(path[i + 1]);
        path[i].visited = true;
        const index = unvisited.indexOf(path[i]);
        if (index >= 0) {
          unvisited.splice(index, 1);
        }
      }
    }
  }
}