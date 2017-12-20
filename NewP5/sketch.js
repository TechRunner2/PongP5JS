//Global Variables
var cir;
var leftP;
var rightP;
var leftPlayer = 0;
var rightPlayer = 0;
var scored = false;

function Ball(x,y){
    this.x = x;
    this.y = y;
    this.r = windowWidth/40;
    this.speed = 10;
    this.movingUp = true;
    this.movingRight = true;
    ellipseMode(CENTER);
//Reset Balls location and set a new random direction to head in
    this.resetBall = function(){
        this.movingRight = this.randomize();
        this.movingUp = this.randomize();
        this.x = windowWidth/2;
        this.y = windowHeight/2;
    }
//Creates a boolean variable based on a random number
    this.randomize = function(){
        if(int(random(2)) == 1){
            return true;
        }
        else
            return false;
    }
    this.changeD = function(){
        if(this.x > windowWidth/2){
            this.movingRight = false;
        }
        else {
            this.movingRight = true;
        }
    }
    this.display = function(){
        ellipse(this.x, this.y, this.r);
    //MovingRight
        if((this.x < windowWidth) && (this.movingRight == true)){
            this.x += this.speed;
        }
        if(this.x >= windowWidth){
            this.resetBall();
            leftPlayer += 1;
        }
        if((this.x > 0) && (this.movingRight == false)){
            this.x -= this.speed;
        }
        if(this.x <= 0){
            this.resetBall();
            rightPlayer += 1;
        }
    //MovingUp
        if((this.y < windowHeight) && (this.movingUp == false)){
            this.y += this.speed;
        }
        if(this.y >= windowHeight){
            this.movingUp = true;
        }
        if((this.y > 0) && (this.movingUp == true)){
            this.y -= this.speed;
        }
        if(this.y <= 0){
            this.movingUp = false;
        }

    //Collison
        this.distances = function(other){
            this.d1 = dist(this.x, this.y, other.x+other.width/2, other.y+other.height/2);
            this.d2 = dist(this.x, this.y, other.x+other.width/2, other.y-other.height/2);
            this.d3 = dist(this.x, this.y, other.x-other.width/2, other.y+other.height/2);
            this.d4 = dist(this.x, this.y, other.x-other.width/2, other.y-other.height/2);
            this.d5 = dist(this.x, this.y, other.x+other.width/2, other.y);
            this.d6 = dist(this.x, this.y, other.x-other.width/2, other.y);
        }
        this.intersects = function(){
            if(this.d1 < this.r){
                this.changeD();
            }
            if(this.d2 < this.r){
                this.changeD();
            }
            if(this.d3 < this.r){
                this.changeD();
            }
            if(this.d4 < this.r){
                this.changeD();
            }
            if(this.d5 < this.r){
                this.changeD();
            }
            if(this.d6 < this.r){
                this.changeD();
            }
        }
}

}
function Player(x, up, down){
    this.x = x;
    this.y = windowHeight/2;
    this.width = windowWidth/40;
    this.height = windowHeight/4;
    this.speed = 10;
    this.score = 0;
    this.up = up;
    this.down = down;
    this.top;
    this.bottom;
    rectMode(CENTER);
    this.display = function(){
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
    this.Move = function(){
        if(key == this.up){
            this.y -= this.speed;
        }
        if(key == this.down){
            this.y += this.speed;
        }
        if(this.y < 0){
            this.y = windowHeight;
        }
        if(this.y > windowHeight){
            this.y = 0;
        }
    }
}
function Center(){
    this.x = windowWidth/2;
    this.x = windowHeight/2;
}

function Display(){
    background(23, 22, 44);
    textSize(50);
    textAlign(RIGHT);
    text(leftPlayer, windowWidth/2-5, 50);
    textAlign(LEFT);
    text(rightPlayer, windowWidth/2+5, 50);
    //Line Down the Center
    stroke(1000);
    line(windowWidth/2,0,windowWidth/2,windowHeight);
    stroke(0);
}

//Run at the Begining then Never again
function setup() {
	createCanvas(windowWidth, windowHeight);
    cir = new Ball(windowWidth/2, windowHeight/2);
    leftP = new Player(50, "w", "s");
    rightP = new Player(windowWidth-50, "i", "k");
}

//Continuously Ran
function draw() {
//Display Score, Background, Line
    Display();
//Left Player
    leftP.display();
    leftP.Move();
//Right Player
    rightP.display();
    rightP.Move();
//Ball
    cir.display();
    cir.distances(leftP);
    cir.intersects(leftP);
    cir.distances(rightP);
    cir.intersects(rightP);
}
