let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 100;
let dx = 5;
let dy = -5;
let paddleHeight = 10;
let paddleWidth = 105;
let paddleX = (canvas.width-paddleWidth)/2;
let paddleY = canvas.height - paddleHeight -60;
let rightPressed = false;
let leftPressed = false;
let score =  0;
let count = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#494949";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#03009f";
    ctx.fill();
    ctx.closePath();
}

function drawScoreboard () {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#red";
    ctx.fillText("Score: "+ parseInt(score), 8, 20);
    score +=0.01;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScoreboard();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    if (y === paddleY) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
    } else if(y + dy -5 > canvas.height-ballRadius) {
        alert("NGU VẬY:)) \nĐiểm" +  parseInt(score));
        document.location.reload();
        clearInterval(interval);
    }

    if(rightPressed && paddleX < canvas.width -paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

const interval = setInterval(draw, 10);