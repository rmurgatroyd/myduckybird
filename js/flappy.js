
var canvas = document.querySelector("#screen")
canvas.width = 500;
canvas.height = 300;

var ctx = canvas.getContext("2d");

ctx.font = "20px Georgia";
ctx.fillText("Welcome to Flappy Bird", canvas.width/3.3, canvas.height/2)

var maxPipeSize = canvas.height / 2.5;

var pipe1Bottom = {
  height: Math.random() * maxPipeSize,
  width: 40,
  x: canvas.width - 100,

}
var pipe1Top = {
  height: Math.random() * maxPipeSize,
  width: 40,
  x: canvas.width - 100,

}
var pipe2Bottom = {
  height: Math.random() * maxPipeSize,
  width: 40,
  x: canvas.width - 50,

}
var pipe2Top = {
  height: Math.random() * maxPipeSize,
  width: 40,
  x: canvas.width - 50,

}
var state = {
  spacePressed: false,
  bird: {
    y: canvas.height / 2,
    x: canvas.width / 4,
    size: 20,
    speed: 4,
  },
  timeInterval: 20,
  pipesBottom: [pipe1Bottom,pipe2Bottom],
  pipesTop: [pipe1Top,pipe2Top],
  pipeSpeed: 10,
};

// Pipe code

function drawPipesBottom() {
  ctx.fillStyle = "blue";
  for (var i = 0; i < state.pipesBottom.length; i = i + 1) {
    var pipe = state.pipesBottom[i];
    ctx.fillRect(pipe.x, canvas.height - pipe.height, pipe.width, pipe.height);
  }
}

function drawPipesTop() {
  ctx.fillStyle = "blue";
  for (var i = 0; i < state.pipesTop.length; i = i + 1) {
    var pipe = state.pipesTop[i];
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.height);
  }
}

function movePipesBottom() {
  for (var i = 0; i < state.pipesBottom.length; i = i + 1) {
    var pipe = state.pipesBottom[i];
    if (state.bird.y + state.bird.size >= canvas.height - pipe.height && pipe.x <= state.bird.x && state.bird.x <= pipe.x + pipe.width) {
      gameOver()
    }
    else if (pipe.x > 0) {
      pipe.x = pipe.x - state.pipeSpeed;
    } else {
      pipe.x = canvas.width;
      pipe.height = Math.random() * maxPipeSize

    }
  }
}

function movePipesTop() {
  for (var i = 0; i < state.pipesTop.length; i = i + 1) {
    var pipe = state.pipesTop[i];
    if (state.bird.y <= pipe.height && pipe.x <= state.bird.x && state.bird.x <= (pipe.x + pipe.width)) {
      gameOver()
    }
    else if (pipe.x > 0) {
      pipe.x = pipe.x - state.pipeSpeed;
    } else {
      pipe.x = canvas.width;
      pipe.height = Math.random() * maxPipeSize

    }
  }
}


// Bird code
function drawBird() {
  ctx.fillStyle = "brown"
  ctx.fillRect(state.bird.x, state.bird.y, state.bird.size, state.bird.size);
}


function moveBird() {
if(state.bird.y <= 0 || state.bird.y >= canvas.height - state.bird.size) {
  gameOver();
}
  else if (state.spacePressed) {
      state.bird.y = state.bird.y - 5;
  } else {
      state.bird.y = state.bird.y + 3;

  }
}


// General code
function clearScreen() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
  clearScreen()
  ctx.fillStyle = "black";
  ctx.font = "20px Georgia";
  ctx.fillText("Game Over!", canvas.width/2.5, canvas.height/2);
  setTimeout (draw, 0);
  canvas.addEventListener("click", function(){location.reload(false);});
}



// Draw loop
function draw() {
  clearScreen();
  drawBird();
  drawPipesBottom();
  drawPipesTop();

  moveBird();
  movePipesBottom();
  movePipesTop();
}

  // setInterval(draw, state.timeInterval);


// User input code
  var body = document.getElementById("body");

canvas.addEventListener("click", function(){ setInterval(draw, state.timeInterval);})

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
