var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*=====================================VARIABLES==============================W*/

// Ball
var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

// Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

// Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

/*=====================================Drawing Functions======================*/

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// main function
function draw() {

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Initialize the elements
  drawBall();
  drawPaddle();

  // Makes the wall colision in the X axis
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Makes the wall colision in the X axis
  if(y + dy < ballRadius) {
      dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {

      //Limits the bottom wall to the paddle area
      if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
      }
      else {
          document.location.reload();
      }
  }

  // Make the horizontal moviment of the paddle
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // increse the ball location
  x += dx;
  y += dy;
}

/*=====================================Util functions=========================*/

// Add listener to the keyboard keys up and down
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Functions to verify the corret key
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

// Define the frame rate
setInterval(draw, 10);
