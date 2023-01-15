let paddle_height = 30,
  paddle_width = 105,
  paddle_x,
  paddle_y,
  paddle_dx = 25;
let ball_x,
  ball_y,
  ball_diameter = 15,
  ball_dx = 1,
  ball_dy = 3;
let clr = 10;
let ball_radius = ball_diameter / 2;
let brick_width = 50,
  brick_height = 25,
  brick_x,
  brick_y;
let flag = true;
let score = 0;
function setup() {
  createCanvas(400, 400);
  rect(width / 2 - brick_width / 2, 40, brick_width, brick_height);
  brick_x = width / 2 - brick_width / 2;
  brick_y = 40;
  rect(
    width / 2 - paddle_width / 2,
    height - paddle_height - clr,
    paddle_width,
    paddle_height
  );
  circle(width / 2, height / 2, ball_diameter);
  ball_x = width / 2;
  ball_y = height / 2;
  paddle_x = width / 2 - paddle_width / 2;
  paddle_y = height - paddle_height - clr;
  text(score, 15, 15);
}

function draw() {
  background("grey");
  //bouncing off walls
  if (ball_x + ball_radius > width || ball_x - ball_radius < 0) {
    ball_dx = -ball_dx;
  }
  //bouncing of ceil and floor
  if (ball_y - ball_radius < 0 || ball_y + ball_radius > height) {
    ball_dy = -ball_dy;
  }
  //bouncing of paddle
  if (
    ball_x > paddle_x &&
    ball_x < paddle_x + paddle_width &&
    ball_y + ball_radius > paddle_y &&
    ball_dy > 0
  ) {
    ball_dy = -ball_dy;
  }
  //hitting a brick
  if (
    ball_x + ball_radius > brick_x &&
    ball_x - ball_radius < brick_x + brick_width &&
    ball_y - ball_radius < brick_y + brick_height &&
    ball_y + ball_radius > brick_y
  ) {
    ball_dy = -ball_dy;
    flag = false;
  }
  ball_x += ball_dx;
  ball_y += ball_dy;
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  circle(ball_x, ball_y, ball_diameter);
  if (flag) {
    rect(width / 2 - brick_width / 2, 40, brick_width, brick_height);
  } else {
    score = 1;
  }
  text("Score : " + score, 15, 15);
}
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (paddle_x + paddle_width < width) {
      if (width - paddle_x - paddle_width <= paddle_dx) {
        paddle_x = width - paddle_width;
      } else {
        paddle_x += paddle_dx;
      }
    }
  } else if (keyCode === LEFT_ARROW) {
    if (paddle_x > 0) {
      if (paddle_x < paddle_dx) {
        paddle_x = 0;
      } else {
        paddle_x -= paddle_dx;
      }
    }
  }
}
