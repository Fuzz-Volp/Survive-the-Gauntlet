console.log("app.js is connected")



// Global Variables
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;


// Classes
// class Player {

// }

// class Gameboard{

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