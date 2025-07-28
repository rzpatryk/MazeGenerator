export default class AldousBroderAlgorithm {
  static generate(grid) {
    let current = grid.getRandomCell();
    let unvisited = grid.row * grid.column - 1;
    current.visited = true;
    
    while (unvisited > 0) {
      const neighbours = current.getNeighbours();
      const neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
      
      if (!neighbour.visited) {
        current.link(neighbour);
        neighbour.visited = true;
        unvisited--;
      }
      current = neighbour;
    }
  }
}