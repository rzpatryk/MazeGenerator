export default class RecursiveBacktracker {
  static generate(grid) {
    const stack = [];
    const startCell = grid.getRandomCell();
    startCell.visited = true;
    stack.push(startCell);
    
    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const unvisitedNeighbours = current.getUnvisitedNeighbours();
      
      if (unvisitedNeighbours.length > 0) {
        const randomIndex = Math.floor(Math.random() * unvisitedNeighbours.length);
        const chosen = unvisitedNeighbours[randomIndex];
        
        current.link(chosen);
        chosen.visited = true;
        stack.push(chosen);
      } else {
        stack.pop();
      }
    }
  }
}