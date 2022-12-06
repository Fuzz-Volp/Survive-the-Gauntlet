console.log("app.js is connected")



// Global Variables

    
    // player movement
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;


// Classes
// class Player {
//     constructor(name, health, coord, damage) {
//         this.name = name;
//         this.health = health; 
//         this.coord = coord;
//         this.damage = damage;
//     }
// }

// class enemy{
//     constructor(health, coord, dmg) {
//         this.health = health;
//         this.coord = coord;
//         this.dmg = dmg;
//     }
// }

// Game.prototype.reset = function() {
//     this.enemy = [];
//     this.map = [];
// }


// Functions

function keyDownHandler(event) {
    if (event.keyCode === 39) {
      rightPressed = true;
    } else if (event.keyCode === 37) {
      leftPressed = true;
    }
    if (event.keyCode === 40) {
      downPressed = true;
    } else if (event.keyCode === 38) {
      upPressed = true;
    }
  }
function keyUpHandler(event) {
    if (event.keyCode === 39) {
      rightPressed = false;
    } else if (event.keyCode === 37) {
      leftPressed = false;
    }
    if (event.keyCode === 40) {
      downPressed = false;
    } else if (event.keyCode === 38) {
      upPressed = false;
    }
  }

// Event Listeners

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);