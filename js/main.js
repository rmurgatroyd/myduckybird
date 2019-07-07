
var state = {
  boxes: [],
  spacePressed: false,

};

var canvas = document.querySelector("#screen")
canvas.width = 500;
canvas.height = 300;

var ctx = canvas.getContext("2d");

function clickHandler(e){
  console.log(e);
  var proportions = Math.random() * 100;
  var offsetX = e.offsetX;
  var offsetY = e.offsetY;
  var colours = ["pink", "coral", "yellow", "green"];
  var coloursChoose = colours[Math.round(Math.random()*3)];

  var newBox = {
    x: offsetX,
    y: offsetY,
    size: proportions,
    colour: coloursChoose,
  }
    state.boxes.push(newBox);
  }

function gameLoop(){
  // application logic
  moveBoxes();


  // display code
  clearScreen();
  renderBoxes();

  setTimeout(gameLoop, 100);
}
// Start gameLoop running
gameLoop();

// application logic functions
function moveBoxes() {
  for (var i = 0; i < state.boxes.length; i = i + 1) {
    var box = state.boxes[i];

    if (state.spacePressed === true) {
      box.x = box.x - 10;
    } else {
      box.x = box.x + 10;
    }

    if (box.x > canvas.width) {
      box.x = 0;
    } else if (box.x < 0) {
      box.x = canvas.width;
    }
  }
}

// display code functions
function clearScreen() {
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function renderBoxes() {
  for (var i = 0; i < state.boxes.length; i = i + 1) {
    var box = state.boxes[i];

    drawBox(box.x, box.y, box.size);
    ctx.fillStyle = box.colour;
  }
}

function drawBox(x, y, size){

  // var colours = ["pink", "coral", "yellow", "green"];
  // ctx.fillStyle = colours[Math.round(Math.random()*3)];
  // ctx.fillStyle = box.colour;

  // ctx.fillStyle = "pink"

  ctx.fillRect(x, y, size, size);
}

// input handling code
var body = document.getElementById("body");

canvas.addEventListener("click", clickHandler)

function handleKeyDown(e) {
  if (e.code === "Space") {
    state.spacePressed = true;
  }
}
body.addEventListener("keydown", handleKeyDown);

function handleKeyUp(e) {
  if (e.code === "Space") {
    state.spacePressed = false;
  }
}
body.addEventListener("keyup", handleKeyUp);
