//Created by Szymon Lichoń 
//23.04.2018

var ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.canvas.width = innerWidth - 100;
    ctx.canvas.height = innerHeight - 200;

//speed
var x = ctx.canvas.width/2;
var y = ctx.canvas.height - 30;
var dx = 1;
var dy = 1;
var xDirectioner = 1;
var yDirectioner = 1;
var ballRadius = 10;
var pressedSpeed = 4;
var delay = 300;
var stage = 1;

//keys
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

//rects
var rectNumber = 10;
var height = 40;
var width = 60;

//players
var players = new Map();
var person;
var points = 0;
var time;
var last=1000;
var curr;
var max1, max2, max3 = -Infinity;
max1 = -Infinity;
max2 = -Infinity;
max3 = -Infinity;
var p1, p2, p3;

function startGame(){
    person = prompt("Podaj swoją nazwę gracza:");
    players.set(person, points);

    rectNumber = prompt("Podaj ilosc prostokatow:");
    time = 5;
    stage = 1;
    pressedSpeed=dx+2;

    delay = prompt("Podaj predkosc zmian licznika: ");
    
}

startGame();

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}


function decrease(rect){
    var dec = function() {
        rect.counter = rect.counter -1;
        rect.life = rect.life -1;
    }
    setInterval(dec,300);
}

function decTime(){
    time = time -1;
}

class Rect{
    constructor(x,y,life){
        this.x = x;
        this.y = y;
        this.life = life;
        this.counter = 20;  
    }
 
}


function drawRect(rect){
    var x = rect.x;
    var y = rect.y;
    ctx.beginPath();
    ctx.rect(x-width/2, y-height/2, width, height);
    if(rect.counter >= 0){
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.textAlign = "center";
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = "blue";
        ctx.fillText(rect.counter,x,y);
    }
    if(rect.counter < 0){
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.fillStyle = "blue";
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = "center";
        ctx.fillText(rect.counter,x,y);
    }
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function generateRectGrid(){
    var  x, y;
    var rects = new Array(rectNumber);
    for(var i=0; i<rectNumber; i++){
        x = Math.random()*(ctx.canvas.width - width - 10)+ width + 10;
        y = Math.random()*(ctx.canvas.height - height - 10) + height + 10;
        for(var j=0; j<i; j++){ //not the fastest way to do that probably, avoiding rectangles overlapping
            while(Math.abs(rects[j].x - x) <= width + 200 && Math.abs(rects[j].y - y) <= height + 200){         
                console.log("Checking");
                x = Math.random()*(ctx.canvas.width - width - 10) + width + 10;
                y = Math.random()*(ctx.canvas.height - height - 10) + height + 10;
            }
        }
        rects[i]=new Rect(x, y, Math.random()*60);
    }
    return rects;

}

function rectsCheck(rects){
    for(var i = 0; i<rectNumber; i++){
        if(rects[i].life < 0){
            var x, y; 
            x = Math.random()*(ctx.canvas.width - width - 10) + width + 10;
            y = Math.random()*(ctx.canvas.height - height- 10) + height + 10;
            for(var j=0; j<i; j++){ //not the fastest way to do that probably, avoiding rectangles overlapping
                while(Math.abs(rects[j].x - x) <= width + 200 && Math.abs(rects[j].y - y) <= height + 200){         
                    x = Math.random()*(ctx.canvas.width - width - 10) + width + 10;
                    y = Math.random()*(ctx.canvas.height - height - 10) + height + 10;
                }
            }
            rects[i]=new Rect(x, y, Math.random()*60);
      
            decrease(rects[i]);
        }
    }
}

function pointsCount(rects,x,y){
    for(var i = 0; i <rectNumber; i++){
        if(Math.abs(x-rects[i].x) <= width && Math.abs(y-rects[i].y)<=height){
            return i;
        }
    }
    return -1;
        
}

function stageHandler(){
    if((time==120 || time == 60) && stage <= 3){
        dx +=3;
        dy +=3;
        delay -= 10;
        stage++;
    }
    if(time==0){
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        window.alert("Koniec gry!");
        if(points>max1){
            max1 = points;
            p1 = person;
        }
        else if(points>max2){
            max2 = points;
            p2 = person;
        }
        else if(points > max3){
            max3 = points;
            p3 = person;
        }
        startGame();

    }
}


var rects = generateRectGrid();
rects.forEach(decrease);
setInterval(decTime,1000);
setInterval(stageHandler,490);

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawBall();
    
    if(x + dx >= ctx.canvas.width-ballRadius || x + dx <= ballRadius){
        xDirectioner = -xDirectioner;
    }
    if(y + dy >= ctx.canvas.height-ballRadius || y + dy <= ballRadius){
        yDirectioner = -yDirectioner;
    }
    
    if(leftPressed && x - pressedSpeed - ballRadius > 0){
        xDirectioner = -1;
        x -= pressedSpeed;
    }
    else if(rightPressed && x + pressedSpeed + ballRadius < ctx.canvas.width-4){
        xDirectioner = 1;
        x += pressedSpeed;
    }
    else if(upPressed && y - pressedSpeed - ballRadius > 0){
        yDirectioner = -1;
        y -= pressedSpeed;
    }
    else if(downPressed && y + pressedSpeed + ballRadius < ctx.canvas.height-4){
        yDirectioner = 1;
        y += pressedSpeed;
    }

    curr = pointsCount(rects,x,y);
    if(last != curr && curr != -1){
        points = points + rects[curr].counter;
        console.log("DODAJEMY");
        players.set(person, points);
    }
    rectsCheck(rects);
    rects.forEach(drawRect);
    
    last = pointsCount(rects,x,y);
    
    x = x + xDirectioner*dx;
    y = y + yDirectioner*dy;


    var tab = document.getElementById("tab");
    tab.innerHTML = "<tr>\
                        <th>Czas</th>\
                        <th>Punkty</th>\
                        <th>Rekordy</th>\
                    </tr>\
                    <tr>\
                        <td>" +time+"    \
                        <td>" +players.get(person)+ "\
                        <td>"+p1 +"  " + max1 +"\
                    </tr>\
                    <tr>\
                        <td>\
                        <td>\
                        <td>"+p2+"  "+max2+"\
                    </tr>\
                    <tr>\
                        <td>\
                        <td>\
                        <td>"+p3+"  "+max3+"\
                    </tr>"
    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("MovementX",mouseHandlerX, false);
document.addEventListener("MovementY",mouseHandlerY,false);

function mouseRelease(){
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
}

function mouseHandlerX(e){
    if(e.clientX > 0)
        rightPressed = true;
    if (e.clientX < 0)
        leftPressed = true;
    setInterval(mouseRelease,300);
}

function mouseHandlerY(e){
    if(e.clientY > 0)
        upPressed = true;
    if(e.clientY < 0)
        downPressed = true;
    setInterval(mouseRelease,300);
}

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

