const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = { x: canvas.width / 2, y: canvas.height - 30, dx: 8, dy: -2, radius: 10 };
let paddle = { width: 100, height: 10, x: (canvas.width - 100) / 2, y: canvas.height - 20, speed: 10, dx: 0 };
let bricks = [];
let rows = 5;
let cols = 8;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

for(let c = 0; c < cols; c++) {
    bricks[c] = [];
    for(let r = 0; r < rows; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = c*(brickWidth+brickPadding) + brickOffsetLeft;
                let brickY = r*(brickHeight+brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function collisionDetection() {
    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.dy *= -1;
                    b.status = 0;
                }
            }
        }
    }
}
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }

    if(ball.y - ball.radius < 0) {
        ball.dy *= -1;
    } else if(ball.y + ball.radius > canvas.height) {
                ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
    }

        if(ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy *= -1;
    }

        paddle.x += paddle.dx;

    if(paddle.x < 0) paddle.x = 0;
    if(paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(update);
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        paddle.dx = paddle.speed;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        paddle.dx = -paddle.speed;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "Left" || e.key == "ArrowLeft") {
        paddle.dx = 0;
    }
}

update();
