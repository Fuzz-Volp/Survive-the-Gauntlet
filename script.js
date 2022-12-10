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

                            }
                    }
                }
            }
        }
    }
}
