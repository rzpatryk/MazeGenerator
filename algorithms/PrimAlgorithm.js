export default class PrimAlgorithm {
  static generate(grid) {
    const walls = [];
    const startCell = grid.getRandomCell();
    startCell.visited = true;
    
    // Dodaj wszystkich sąsiadów startowej komórki do listy ścian
    for (const neighbour of startCell.getNeighbours()) {
      if (!neighbour.visited) {
        walls.push([startCell, neighbour]);
      }
    }
    
    while (walls.length > 0) {
      const randomIndex = Math.floor(Math.random() * walls.length);
      const [current, next] = walls[randomIndex];
      walls.splice(randomIndex, 1);
      
      if (!next.visited) {
        current.link(next);
        next.visited = true;
        
        // Dodaj nowych sąsiadów do listy ścian
        for (const neighbour of next.getNeighbours()) {
          if (!neighbour.visited) {
            walls.push([next, neighbour]);
          }
        }
      }
    }
  }
}