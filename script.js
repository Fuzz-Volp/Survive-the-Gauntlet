console.log('script.js is loaded')

// Global Variables
let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player1;
let player2;

// Classes

class Player {
    constuctor() {
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
    constuctor(cols, rows, size) {
        this.cols = cols; 
        this.rows = rows;
        this.size = size; 
        this.backgroundColor = 'gray';
        this.mazeColor = 'white';
        this.endColor = 'yellow';
        this.playerColor = 'blue';
        this.cells = [];
        this.generate();
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
        let randomCol = Math.floor(Math.random() * this.cols); 
        let randomRow = Math.floor(Math.random() * this.rows);
    
        let stack = []; 
        stack.push(this.cells[randomCol][randomRow]);

        let currentCell;
        let direction; 
        let neighbor;
        let nextCell; 

        while (this.unvisited(this.cells)) {
            currentCell = stack[stack.length - 1]; 
            currentCell.visited = true; 
            if (this.unvisited(currentCell)) {
                nextCell = null; 
                neighbor = false; 
                do {
                    direction = Math.floor(Math.random() * 4); 
                    switch (direction) {
                        case 0: 
                            if (currentCell.col !== (this.cols -1) && !this.cells[currentCell.col +1][currentCell.row].visited) {
                                currentCell.eastWall = false;
                                nextCell = this.cells[currentCell.col + 1][currentCell.row];
                                nextCell.westWal = false; 
                                neighbor = true;
                            }
                            break;
                        case 1:
                            if (currentCell.row !== 0 && !this.cells[currentCell.col][currentCell.row - 1].visited) {
                                currentCell.northWall = false;
                                nextCell = this.cells[currentCell.col][currentCell.row -1];
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
                                currentCell.westWal = false; 
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

    isUnvisited() {
        for (let col = 0; col < this.cols; col++) {
            for(let row = 0; row < this.rows; row++) {
                if (!this.cells[col][row].visited) {
                    return true;
                }
            }
        }
        return false;
    }

    neighborUnvisited(cellSection) {
        return ((cellSection.col !== 0 && !this.cells[cellSection.col - 1][cellSection.row].visited) ||
                (cellSection.col !== (this.cols - 1) && !this.cells[cellSection.col + 1][cellSection.row].visited) ||
                (cellSection.row !== 0 && !this.cells[cellSection.col][cellSection.row - 1].visited) ||
                (cellSection.row !== (this.rows - 1) && !this.cells[cellSection.col][cellSection.row + 1].visited));
    }

    draw() {
        ctx.fillStyle = this.backgroundColor; 
        ctx.fillRect(0, 0, mazeHeight, mazeWidth);
        ctx.fillStyle = this.endColor; 
        ctx.fillRect(0, 0, mazeHeight, mazeWidth);
        ctx.fillStyle = this.mazeColor;
        ctx.strokeRect(0, 0, mazeHeight, mazeWidth0);

        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.cells[col][row].eastWall) {
                    ctx.beginPath();
                    ctx.moveTo((col + 1) * this.size, row * this.size);
                    ctx.lineTo((col + 1) * this.size, (row + 1 ) * this.size); 
                    ctx.strok(); 
                }
                if (this.cells[col][row].northWall) {
                    ctx.beginPath();
                    ctx.moveTo((col + 1) * this.size, row * this.size);
                    ctx.lineTo((col + 1) * this.size,  row  * this.size); 
                    ctx.strok(); 
                }
                if (this.cells[col][row].southWall) {
                    ctx.beginPath();
                    ctx.moveTo(col  * this.size, (row + 1) * this.size);
                    ctx.lineTo((col + 1) * this.size, (row + 1 ) * this.size); 
                    ctx.strok(); 
                }
                if (this.cells[col][row].westWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.size, row * this.size);
                    ctx.lineTo(col * this.size, (row + 1 ) * this.size); 
                    ctx.strok(); 
                }
            }
        }
        ctx.fillStyle = this.playerColor; 
        ctx.fillRect((player1.col * this.size) + 2, (player1.row * this.size) + 2, this.size - 4, this.size - 4)
        // ctx.fillRect((player2.col * this.size) + 2, (player2.row * this.size) + 2, this.size - 4, this.size - 4)
    }

}

function onKeyDown(evt) {
    switch (evt.keyCode) {
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


