var ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.canvas.width = innerWidth - 100;
    ctx.canvas.height = innerHeight - 100;

var x = ctx.canvas.width/2;
var y = ctx.canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var rightPressed = false;
var leftPressed = false;


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawBall();
    
    if(x + dx > ctx.canvas.width-ballRadius || x + dx < ballRadius)
        dx = -dx;
    
    if(y + dy > ctx.canvas.height-ballRadius || y + dy < ballRadius)
        dy = -dy;

    x += dx;
    y += dy;
}

setInterval(draw,10);