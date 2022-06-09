'use strict';

const canvas = document.getElementById('myCanvas'),
      total = document.querySelector('.count'),
      speedBall = document.querySelector('.speed-ball'),
      toRight = document.querySelector('.toRight'),
      toLeft = document.querySelector('.toLeft'),
      btn = document.querySelectorAll('.btn');

let ctx = canvas.getContext('2d'),
    x = canvas.width / 2,
    y = canvas.height - 30,
    dx = 0.9,
    dy = -0.9,
    time = 10,
    ballRadius = 10,
    color = '',
    paddleHeight = 11,
    paddleWidth = 65,
    paddleX = (canvas.width - paddleWidth) / 2,
    rightPressed = false,
    leftPressed = false,
    count = -1,
    speed = 0,
    interval;

function getCount() {
    count++;
    if (count > 0 && (count % 10) === 0) {
        getSpeed();
    }
    return total.textContent = `${count}`;
}
getCount();

function getSpeed() {
    speedBall.textContent = '';
    speed++;
    time -= speed;
    dx += 0.1;
    dy += -0.1;
    return speedBall.textContent = `${speed}`;
}
getSpeed();

function getColor() {
    let r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256);
    return (color = '#' + r.toString(16) + g.toString(16) + b.toString(16));
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    x += dx;
    y += dy;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        getColor();
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-(ballRadius + paddleHeight)) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            getCount();
        }
        else {
            alert(`GAME OVER \n SCORE: ${count}`);
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 3;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 3;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function startByEnter(e) {
    if(e.keyCode == 32) {
        return interval = setInterval(draw, time);
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("keydown", startByEnter, true);

toRight.addEventListener("touchstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
    rightPressed = true;
});
toRight.addEventListener("touchend", (e) => {
    e.preventDefault();
    e.stopPropagation();
    rightPressed = false;
});
toLeft.addEventListener("touchstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
    leftPressed = true;
});
toLeft.addEventListener("touchend", (e) => {
    e.preventDefault();
    e.stopPropagation();
    leftPressed = false;
});

document.body.addEventListener("touchstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
    onnApp();
}, { once: true });

function onnApp() {
    return interval = setInterval(draw, time);
}
// const interval = setInterval(draw, time);

























