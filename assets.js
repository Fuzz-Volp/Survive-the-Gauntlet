console.log("assets.js is connected")

// Global Variables
const canvas = document.querySelector('#maze');
const ctx = canvas.getContext('2d');


// Setting the color of the rectangle
ctx.fillStyle = 'beige';

// First parameter is the staring x postion on the canvas
  // value of 0 for x would start the rectangle all the way to the left
// Second parameter is the starting y position on the canvas
  // value of 0 for y would start the rectangle all the way to the top
// The third and fourth parameters are the width and height of the rectangle

ctx.fillRect(0, 0, 100, 50);

const tileAtlas = new Image();
tileAtlas.src = './img/Dungeon_Tileset.png';
tileAtlas.onload = drawMap;
console.log(tileAtlas)
console.log(tileAtlas.src);

// tileAtlas.onload = drawFunction;

    // maps
    const map = [
        1, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 3, 6,
        11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 26,
        21, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 36,
        31, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 16,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 26,
        11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 36,
        21, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 16,
        31, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 26,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 36,
        11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 16,
        21, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 26,
        31, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 36,
        1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 16,
        11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 26,
        21, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 36,
        41, 42, 42, 43, 45, 42, 42, 43, 45, 42, 43, 44, 45, 43, 46
    ]
    console.log(map)
    
        // obects
    const object = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ]
    
        // Map and Object Key
    // const space = 0;
    // const floor = 1;
    // const wall = 2;
    // const enemy = 3;
    // const item = 4;
    // const trap = 5;
    // const exit = 6;
    
        // Map Size Details
    const size = 64;
    const tileOutputSize = 1;
    const updatedTileSize = size * tileOutputSize; 
    const tileAtlasCol = 10;
    const tileAtlasRow = 10;
    const rows = 16;
    const colums = 16;
    const mapHeight = rows * size;
    const mapWidth = colums * size; 

    
        // Map Build
        let mapIndex = 0; 
        let x = 0; 
        let y = 0; 
    
    // Functions
    function drawMap() {
        for (let column = 0; column < mapHeight; column += size) {
            for (let row = 0; row < mapWidth; row += size) {
                let tileVal = map[mapIndex];
                if(tileVal != 0) {
                    tileVal -= 1;
                    y = Math.floor(tileVal / tileAtlasCol) * size;
                    x = (tileVal % tileAtlasCol) * size; 
                    ctx.drawImage(tileAtlas, x, y, size,
                        size, row * tileOutputSize, column * tileOutputSize,
                        updatedTileSize, updatedTileSize);
                    
                }
                mapIndex ++;
            }
        }
    }

    
    
    // Event Listeners