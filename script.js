console.log("script.js is connected")

let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let timer;
let player1;
let player2;
let end;


class Player {

  constructor() {
    this.col = 0;
    this.row = 0;
  }

}

class Cell {

  constructor(col, row) {
    this.col = col;
    this.row = row;

    this.eastWall = true;
    this.northWall = true;
    this.southWall = true;
    this.westWall = true;

    this.visited = false;
  }

}

class Maze {

  constructor(cols, rows, size) {
    this.cols = cols;
    this.rows = rows;
    this.size = size;
    this.endColor = "yellow";
    this.mazeColor = "#000000";
    this.playerColor = "blue";
    this.backgroundColor = "gray";

    this.cells = [];

    this.generate()
  }

  generate() {

    mazeHeight = this.rows * this.size;
    mazeWidth = this.cols * this.size;
    canvas.height = mazeHeight;
    canvas.width = mazeWidth;
    canvas.style.height = mazeHeight;
    canvas.style.width = mazeWidth;

    for (let col = 0; col < this.cols; col++) {
      this.cells[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.cells[col][row] = new Cell(col, row);
      }
    }

    let rndCol = Math.floor(Math.random() * this.cols);
    let rndRow = Math.floor(Math.random() * this.rows);
    let stack = [];
    stack.push(this.cells[rndCol][rndRow]);

    let currentCell;
    let direction;
    let neighbor;
    let nextCell;

    while (this.unvisited(this.cells)) {
      currentCell = stack[stack.length - 1];
      currentCell.visited = true;
      if (this.unvisitedNeighbor(currentCell)) {
        nextCell = null;
        neighbor = false;
        do {
          direction = Math.floor(Math.random() * 4);
          switch (direction) {
            case 0:
              if (currentCell.col !== (this.cols - 1) && !this.cells[currentCell.col + 1][currentCell.row].visited) {
                currentCell.eastWall = false;
                nextCell = this.cells[currentCell.col + 1][currentCell.row];
                nextCell.westWall = false;
                neighbor = true;
              }
              break;
            case 1:
              if (currentCell.row !== 0 && !this.cells[currentCell.col][currentCell.row - 1].visited) {
                currentCell.northWall = false;
                nextCell = this.cells[currentCell.col][currentCell.row - 1];
                nextCell.southWall = false;
                neighbor = true;
              }
              break;
            case 2:
              if (currentCell.row !== (this.rows - 1) && !this.cells[currentCell.col][currentCell.row + 1].visited) {
                currentCell.southWall = false;
                nextCell = this.cells[currentCell.col][currentCell.row + 1];
                nextCell.northWall = false;
                neighbor = true;
              }
              break;
            case 3:
              if (currentCell.col !== 0 && !this.cells[currentCell.col - 1][currentCell.row].visited) {
                currentCell.westWall = false;
                nextCell = this.cells[currentCell.col - 1][currentCell.row];
                nextCell.eastWall = false;
                neighbor = true;
              }
              break;
          }
          if (neighbor) {
            stack.push(nextCell);
          }
        } while (!neighbor)
      } else {
        currentCell = stack.pop();
      }
    }

    this.draw();

  }

  unvisited() {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (!this.cells[col][row].visited) {
          return true;
        }
      }
    }
    return false;
  }

  unvisitedNeighbor(mazeCell) {
    return ((mazeCell.col !== 0 && !this.cells[mazeCell.col - 1][mazeCell.row].visited) ||
            (mazeCell.col !== (this.cols - 1) && !this.cells[mazeCell.col + 1][mazeCell.row].visited) ||
            (mazeCell.row !== 0 && !this.cells[mazeCell.col][mazeCell.row - 1].visited) ||
            (mazeCell.row !== (this.rows - 1) && !this.cells[mazeCell.col][mazeCell.row + 1].visited));
  }

  draw() {

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, mazeHeight, mazeWidth);

    ctx.fillStyle = this.endColor;
    ctx.fillRect((this.cols - 1) * this.size, (this.rows - 1) * this.size, this.size, this.size);
  
    
    

    ctx.strokeStyle = this.mazeColor;
    ctx.strokeRect(0, 0, mazeHeight, mazeWidth);

    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.cells[col][row].eastWall) {
          ctx.beginPath();
          ctx.moveTo((col + 1) * this.size, row * this.size);
          ctx.lineTo((col + 1) * this.size, (row + 1) * this.size);
          ctx.stroke();
        }
        if (this.cells[col][row].northWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.size, row * this.size);
          ctx.lineTo((col + 1) * this.size, row * this.size);
          ctx.stroke();
        }
        if (this.cells[col][row].southWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.size, (row + 1) * this.size);
          ctx.lineTo((col + 1) * this.size, (row + 1) * this.size);
          ctx.stroke();
        }
        if (this.cells[col][row].westWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.size, row * this.size);
          ctx.lineTo(col * this.size, (row + 1) * this.size);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = this.playerColor;
    ctx.fillRect((player1.col * this.size) + 2, (player1.row * this.size) + 2, this.size - 4, this.size - 4);
    ctx.fillStyle = this.playerColor;
    ctx.fillRect((player2.col * this.size) + 2, (player2.row * this.size) + 2, this.size - 4, this.size - 4);

  }

// winGame() {
//   for (let col = 0; col < this.cols; col++) {
//     for (let row = 0; row < this.rows; row++) {
//       if (this.cell[col][row])
//     }
//   }
 
// } 
}

// Player 1 Keys
function onKeyDown1(event) {
  switch (event.keyCode) {
    case 65:
      if (!maze.cells[player1.col][player1.row].westWall) {
        player1.col -= 1;
      }
      break;
      case 68:
      if (!maze.cells[player1.col][player1.row].eastWall) {
        player1.col += 1;
      }
      break;
      case 83:
      if (!maze.cells[player1.col][player1.row].southWall) {
        player1.row += 1;
      }
      break;
      case 87:
      if (!maze.cells[player1.col][player1.row].northWall) {
        player1.row -= 1;
      }
      break;
    default:
      break;
  }
  maze.draw();
}
// Player 2 Keys
function onKeyDown2(event) {
  switch (event.keyCode) {
    case 37:
      if (!maze.cells[player2.col][player2.row].westWall) {
        player2.col -= 1;
      }
      break;
    case 39:
      if (!maze.cells[player2.col][player2.row].eastWall) {
        player2.col += 1;
      }
      break;
    case 40:
      if (!maze.cells[player2.col][player2.row].southWall) {
        player2.row += 1;
      }
      break;
    case 38:
      if (!maze.cells[player2.col][player2.row].northWall) {
        player2.row -= 1;
      }
      break;
    default:
      break;
  }
  maze.draw();
}

// Win Condition


// Timer: Lose condition

let timeLeft = 45;
const clock = document.querySelector('.timer');
timer = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == -1) {
    alert('Game Over')
    location.reload();
    return false;
  } else {
    timeLeft--;
    console.log(timeLeft);
  }
}

function onLoad() {

  canvas = document.getElementById("maze");
  ctx = canvas.getContext("2d");
  console.log(ctx)
  player1 = new Player();
  player2 = new Player();
  maze = new Maze(20, 20, 40);
  console.log(maze);
  document.addEventListener("keydown", onKeyDown1);
  document.addEventListener("keydown", onKeyDown2);
 

}
