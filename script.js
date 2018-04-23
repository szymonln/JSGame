//Created by Szymon Lichoń 
//23.04.2018

var ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.canvas.width = innerWidth - 100;
    ctx.canvas.height = innerHeight - 100;


var x = ctx.canvas.width/2;
var y = ctx.canvas.height - 30;
var dx = 2;
var dy = -2;
var xDirectioner = 1;
var yDirectioner = 1;
var ballRadius = 10;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var pressedSpeed = 7;

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
    
    if(x + dx > ctx.canvas.width-ballRadius || x + dx < ballRadius){
        xDirectioner = -xDirectioner;
    }
    if(y + dy > ctx.canvas.height-ballRadius || y + dy < ballRadius){
        yDirectioner = -yDirectioner;
    }
   
    if(leftPressed && x - pressedSpeed - ballRadius > 0){
        xDirectioner = -1;
        x -= pressedSpeed;
    }
    else if(rightPressed && x + pressedSpeed + ballRadius < ctx.canvas.width){
        xDirectioner = 1;
        x += pressedSpeed;
    }
    else if(upPressed && y + pressedSpeed - ballRadius >= 0){
        yDirectioner = +1;
        y -= pressedSpeed;
    }
    else if(downPressed && y - pressedSpeed + ballRadius <= ctx.canvas.height){
        yDirectioner = 1;
        y += pressedSpeed;
    }
    

    console.log(y);
    x = x + xDirectioner*dx;
    y = y + yDirectioner*dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40){
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40){
        downPressed = false;
    }
}



setInterval(draw,10);