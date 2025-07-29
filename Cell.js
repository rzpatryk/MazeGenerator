import Distance from './Distance.js';

// Zaawansowana klasa Cell przepisana z C# na JavaScript
class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.visited = false;
    this.links = [];
    this.neighbours = new Map(); // Używamy Map zamiast Dictionary
  }

  // Gettery i settery (opcjonalne w JS, ale dla zgodności z C#)
  get Row() { return this.row; }
  set Row(value) { this.row = value; }

  get Column() { return this.column; }
  set Column(value) { this.column = value; }

  get Links() { return this.links; }
  set Links(value) { this.links = value; }

  get Visited() { return this.visited; }
  set Visited(value) { this.visited = value; }

  get Neighbours() { return this.neighbours; }
  set Neighbours(value) { this.neighbours = value; }

  // Zwraca listę wszystkich sąsiadów
  getNeighbours() {
    const neighbours = [];
    for (const cell of this.neighbours.values()) {
      neighbours.push(cell);
    }
    return neighbours;
  }

  // Łączy dwie komórki (tworzy połączenie)
  link(cell, bidirectional = true) {
    this.links.push(cell);
    if (bidirectional) {
      cell.link(this, false);
    }
  }

  // Usuwa połączenie między komórkami
  unlink(cell, bidirectional = true) {
    const index = this.links.indexOf(cell);
    if (index > -1) {
      this.links.splice(index, 1);
    }
    if (bidirectional) {
      cell.unlink(this, false);
    }
  }

  // Sprawdza czy komórki są połączone
  linked(cell) {
    return this.links.includes(cell);
  }

  // Zwraca listę nieodwiedzonych sąsiadów
  getUnvisitedNeighbours() {
    const unvisitedNeighbours = [];
    const neighbours = this.getNeighbours();
    
    for (const cell of neighbours) {
      if (!cell.visited) {
        unvisitedNeighbours.push(cell);
      }
    }
    return unvisitedNeighbours;
  }

  // Zwraca listę odwiedzonych sąsiadów
  getVisitedNeighbours() {
    const visitedNeighbours = [];
    const neighbours = this.getNeighbours();
    
    for (const cell of neighbours) {
      if (cell.visited) {
        visitedNeighbours.push(cell);
      }
    }
    return visitedNeighbours;
  }

  // Algorytm Dijkstry do obliczania odległości
  distances() {
    const distance = new Distance(this);
    const pending = new Map();
    pending.set(this, 0);

    while (pending.size > 0) {
      // Znajdź komórkę z najmniejszą odległością
      let minCell = null;
      let minValue = Infinity;
      
      for (const [cell, value] of pending) {
        if (value < minValue) {
          minValue = value;
          minCell = cell;
        }
      }

      pending.delete(minCell);

      // Sprawdź wszystkich połączonych sąsiadów
      for (const neighbour of minCell.links) {
        const totalWeight = distance.getValue(minCell) + 1;
        
        if (!distance.has(neighbour) || totalWeight < distance.getValue(neighbour)) {
          pending.set(neighbour, totalWeight);
          distance.set(neighbour, totalWeight);
        }
      }
    }

    return distance;
  }

  // Dodatkowa metoda do dodawania sąsiadów (pomocnicza)
  addNeighbour(direction, cell) {
    this.neighbours.set(direction, cell);
  }

  // Dodatkowa metoda do pobierania sąsiada w określonym kierunku
  getNeighbour(direction) {
    return this.neighbours.get(direction);
  }

  // Metoda do sprawdzania czy komórka ma sąsiada w danym kierunku
  hasNeighbour(direction) {
    return this.neighbours.has(direction);
  }

  // Przydatna metoda do debugowania
  toString() {
    return `Cell(${this.row}, ${this.column})`;
  }
  draw(ctx, cellWidth, cellHeight, canvas) {
    const x = this.column * cellWidth + (canvas.width * 0.05 / 2);
    const y = this.row * cellHeight + (canvas.height * 0.05 / 2);

    ctx.strokeStyle = "#fff"; // Zmienione z "#000" na "#fff" dla białych ścian
    ctx.lineWidth = 2;

    if (!this.neighbours.has("North") || (this.neighbours.has("North") && !this.linked(this.neighbours.get("North")))) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellWidth, y);
      ctx.stroke();
    }
    if(!this.neighbours.has("West")){
      ctx.beginPath();
      ctx.moveTo(x, y + cellHeight);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    if (!this.neighbours.has("East") || (this.neighbours.has("East") && !this.linked(this.neighbours.get("East")))) {
      ctx.beginPath();
      ctx.moveTo(x + cellWidth, y);
      ctx.lineTo(x + cellWidth, y + cellHeight);
      ctx.stroke();
    }
     if(!this.neighbours.has("South")){
      ctx.beginPath();
      ctx.moveTo(x + cellWidth, y + cellHeight);
      ctx.lineTo(x, y + cellHeight);
      ctx.stroke();
     }
  }

  drawHexGrid(ctx, cellWidth, cellHeight, canvas) {
        ctx.strokeStyle = "#fff"; // Zmienione z "#000" na "#fff" dla białych ścian
        ctx.lineWidth = 2;
        cellHeight -= (cellHeight / 2) / 10;
        cellWidth -= cellWidth / 3;
        let cx, cy;
        let x_fw, x_nw, x_ne, x_fe;
        let y_n, y_m, y_s;

        let a_size = cellWidth / 2;
        let b_size = cellHeight / 2;
        let height = b_size * 2;

        // cx = (cellWidth + 3 * cell.column * a_size) - (((cellWidth * 3 * column) / 2 - a_size) / 2) - (a_size);
        // cy = (b_size + cell.row * height) - (b_size * row) - (b_size / 2);
        cx = (cellWidth + 3 *  this.column * a_size); //+ (canvas.width * 0.05 / 2) - a_size/2;//this.column * cellWidth + cellWidth;
        cy = (this.row * cellHeight + cellHeight);
        if (this.column % 2 != 0){
            cy += b_size;
        }

        x_fw = cx - cellWidth
        x_nw = cx - a_size;
        x_ne = cx + a_size;
        x_fe = cx + cellWidth

        y_n = cy - b_size;
        y_m = cy;
        y_s = cy + b_size;

        if (!(this.neighbours.has("NorthWest")))
        {
            ctx.beginPath();
            ctx.moveTo(x_fw, y_m);
            ctx.lineTo(x_nw, y_n);
            ctx.stroke();
        }
         if ((this.neighbours.has("NorthEast") && !(this.linked(this.neighbours.get("NorthEast")))) || !this.neighbours.has("NorthEast"))
         {
             ctx.beginPath();
             ctx.moveTo(x_ne, y_n);
             ctx.lineTo(x_fe, y_m);
             ctx.stroke();
         }
         if ((this.neighbours.has("North") && !(this.linked(this.neighbours.get("North")))) || !this.neighbours.has("North"))
         {
             ctx.beginPath();
             ctx.moveTo(x_ne, y_n);
             ctx.lineTo(x_nw, y_n);
             ctx.stroke();
         }
         if (!(this.neighbours.has("South")))
          {
                  ctx.beginPath();
                  ctx.moveTo(x_ne, y_s);
                  ctx.lineTo(x_nw, y_s);
                  ctx.stroke();
                }
         if (!(this.neighbours.has("SouthWest")))
         {
             ctx.beginPath();
             ctx.moveTo(x_fw, y_m);
             ctx.lineTo(x_nw, y_s);
             ctx.stroke();
         }
         if ((this.neighbours.has("SouthEast") && !(this.linked(this.neighbours.get("SouthEast")))) || !this.neighbours.has("SouthEast"))
         {
             ctx.beginPath();
             ctx.moveTo(x_fe, y_m);
             ctx.lineTo(x_ne, y_s);
             ctx.stroke();
         }
  }
}

export default Cell;
