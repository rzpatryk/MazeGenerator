import SquareGrid from './SquareGrid.js';
import HexGrid from './HexGrid.js';
import MazeAlgorithms from './algorithms/MazeAlgorithms.js';

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let grid = [];
let cellWidth, cellHeight;
let rows, cols;

document.getElementById('generateMaze').addEventListener('click', () => {
  rows = parseInt(document.getElementById('rows').value);
  cols = parseInt(document.getElementById('cols').value);
  const algorithm = document.getElementById('algorithm').value;

  generateGrid(rows, cols);
  
  MazeAlgorithms.generate(grid, algorithm);

  drawGrid();
});

function generateGrid(r, c) {
  cellWidth = (canvas.width - canvas.width * 0.05) /c;
  cellHeight = (canvas.height - canvas.height * 0.05) / r;
  
  //grid = new SquareGrid(r, c);
  grid = new HexGrid(r, c);
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#2c2c2c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let r = 0; r < grid.row; r++) {
    for (let c = 0; c < grid.column; c++) {
      const cell = grid.grid[r][c];
      //cell.draw(ctx, cellWidth, cellHeight, canvas);
      cell.drawHexGrid(ctx, cellWidth, cellHeight, canvas);
    }
  }

}