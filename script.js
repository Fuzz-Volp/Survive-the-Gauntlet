console.log('script.js is loaded')

// Global Variables
let ctx;
let canvas;
let maze;
let mazeHeight;
let mazewidth;
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
}
