export default class KruskalAlgorithm {
  static generate(grid) {
    const edges = [];
    const sets = new Map();
    
    // Inicjalizuj każdą komórkę jako osobny zbiór
    for (let r = 0; r < grid.row; r++) {
      for (let c = 0; c < grid.column; c++) {
        const cell = grid.grid[r][c];
        sets.set(cell, new Set([cell]));
        cell.visited = true;
      }
    }
    
    // Zbierz wszystkie możliwe krawędzie
    for (let r = 0; r < grid.row; r++) {
      for (let c = 0; c < grid.column; c++) {
        const cell = grid.grid[r][c];
        for (const neighbour of cell.getNeighbours()) {
          if (cell.row < neighbour.row || (cell.row === neighbour.row && cell.column < neighbour.column)) {
            edges.push([cell, neighbour]);
          }
        }
      }
    }
    
    // Losowo mieszaj krawędzie
    for (let i = edges.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [edges[i], edges[j]] = [edges[j], edges[i]];
    }
    
    // Przetwarzaj krawędzie
    for (const [cell1, cell2] of edges) {
      const set1 = sets.get(cell1);
      const set2 = sets.get(cell2);
      
      if (set1 !== set2) {
        cell1.link(cell2);
        
        // Połącz zbiory
        const newSet = new Set([...set1, ...set2]);
        for (const cell of newSet) {
          sets.set(cell, newSet);
        }
      }
    }
  }
}