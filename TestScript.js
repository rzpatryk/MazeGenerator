const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let grid = [];
let cellWidth, cellHeight;
let rows, cols; // Domyślna liczba wierszy
document.getElementById('generateMaze').addEventListener('click', () => {
  rows = parseInt(document.getElementById('rows').value);
  cols = parseInt(document.getElementById('cols').value);

  generateGrid(rows, cols);

  drawGrid();
});


function generateGrid(r, c) {
  cellWidth = (canvas.width - canvas.width * 0.05) / c;
  cellHeight = (canvas.height - canvas.height * 0.05) / r;
  
  // Tworzenie obiektu SquareGrid zamiast prostej tablicy
  grid = new SquareGrid(r, c);
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  for (let r = 0; r < grid.row; r++) {
    for (let c = 0; c < grid.column; c++) {
      const cell = grid.grid[r][c]; // Dostęp do komórki w tablicy 2D
      cell.draw(ctx, cellWidth, cellHeight, canvas)
    }
  }
}