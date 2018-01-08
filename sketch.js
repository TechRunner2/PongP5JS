//Setting Variables
var LeftAI = false;
var RightAI = true;
var CanvasX = 1000;
var CanvasY = 600;
var AiSpeed = 6;
var ballSpeed = 10;
var negBallSpeed = -10;
var PlayerSpeed = 10;
var Paused = false;
var Begining = true;

//Global Variables
var cir;
var leftP;
var rightP;
var DifficultyS;
var leftPlayer = 0;
var rightPlayer = 0;
var timer = 0;

function Ball(x,y){
    this.x = x;
    this.y = y;
    this.r = width/40;
    this.speedX = ballSpeed;
    this.speedY = 10;
    ellipseMode(CENTER);
//Reset Balls location and set a new random direction to head in
    this.resetBall = function(){
        if(round(random(0,1)))
            this.speedX = ballSpeed;
        else
            this.speedX = negBallSpeed;
        if(round(random(0,1)))
            this.speedY = ballSpeed;
        else
            this.speedY = negBallSpeed;
        this.x = width/2;
        this.y = height/2;
    }
    this.changeD = function(){
        if(this.x < width/2)
            this.speedX = ballSpeed;
        else
            this.speedX = negBallSpeed;
    }
    this.display = function(){
        ellipse(this.x, this.y, this.r);
    //MovingRight
        this.x += this.speedX;
        if((this.x >= width) || (this.x <= 0)){
            if(this.x >= width){
                leftPlayer++;
            }
            if(this.x <= 0){
                rightPlayer++;
            }
            this.resetBall();
        }
    //MovingUp
        this.y += this.speedY;
        if((this.y >= height) || (this.y <= 0)){
            if(this.y >= height/2)
                this.speedY = -10;
            else
                this.speedY = 10;
        }

    //Collison
        this.intersects= function(other){
            this.d1 = dist(this.x, this.y, other.x, other.y+other.height/2);
            this.d2 = dist(this.x, this.y, other.x, other.y-other.height/2);
            this.d3 = dist(this.x, this.y, other.x, other.y+other.height/4);
            this.d4 = dist(this.x, this.y, other.x, other.y-other.height/4);
            this.d5 = dist(this.x, this.y, other.x, other.y);
            if(this.d1 < this.r+5){
                this.changeD();
            }
            if(this.d2 < this.r+5){
                this.changeD();
            }
            if(this.d3 < this.r+5){
                this.changeD();
            }
            if(this.d4 < this.r+5){
                this.changeD();
            }
            if(this.d5 < this.r+5){
                this.changeD();
            }
        }
}

}
function Player(x, up, down){
    this.x = x;
    this.y = height/2;
    this.width = width/60;
    this.height = height/8;
    this.speed = PlayerSpeed;
    this.score = 0;
    this.up = up;
    this.down = down;
    rectMode(CENTER);
    this.display = function(){
        rect(this.x, this.y, this.width, this.height);
    }
    this.Move = function(){
        if(keyIsDown(this.up)){
            this.y -= this.speed;
        }
        if(keyIsDown(this.down)){
            this.y += this.speed;
        }
        if(this.y < 0){
            this.y = height;
        }
        if(this.y > height){
            this.y = 0;
        }
    }
}
function AI(ball, other){
    if(ball.y > other.y)
        other.y += DifficultyS.value();
    if(ball.y < other.y)
        other.y -= DifficultyS.value();
}

function Display(){
    push();
    fill(255);
    textSize(50);
    textAlign(RIGHT);
    text(leftPlayer, width/2-5, 50);
    textAlign(LEFT);
    text(rightPlayer, width/2+5, 50);
    //Line Down the Center
    stroke(1000);
    line(width/2,0,width/2,height);
    stroke(0);
    pop();
}

//Run at the Begining then Never again
function setup() {
	createCanvas(CanvasX, CanvasY);
    cir = new Ball(width/2, height/2);
    leftP = new Player(50, UP_ARROW, DOWN_ARROW);
    rightP = new Player(width-50, null, null);
    DifficultyS = createSlider(1, 10, 600);
}

//Continuously Ran
function draw() {
    background(23, 22, 44);
if(Paused == true){
    push();
    textSize(60);
    textAlign(CENTER);
    fill(255);
    text("Paused", width/2, height/2);
    pop();
    if(timer > 0){
        timer -= 1;
    }
    else{
        timer = 0;
    }
    if((key == "p") && (timer == 0)){
        if(timer == 0){
            Paused = false;
            timer = frameRate();
        }
    }
    return true;
}
//Reset if R is pressed
if(key == "r"){
    leftPlayer = 0;
    rightPlayer = 0;
    cir.resetBall();
}
//Display Score, Background, Line
    Display();
if(timer > 0){
    timer--;
}
if(timer < 0){
    timer = 0;
}
if((key == "p") && (timer == 0)){
    Paused = true;
    timer = frameRate();
    return true;
}
//Left Player or AI
    leftP.display();
    leftP.Move();
    if(LeftAI == true)
        AI(cir,leftP);
//Right Player or AI
    rightP.display();
    rightP.Move();
    if(RightAI == true)
        AI(cir,rightP);
//Ball
    cir.display();
    cir.intersects(leftP);
    cir.intersects(rightP);
}
