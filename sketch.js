function setup() {
  createCanvas(1000, 650);
  //Set object parameters
  player = new Player();
  light = new Light(90, 500, 300, 200, 200, 600);
  sprintBar = new sprintBar();
  guardLeft = new Guard(2, 500, 325);
  guardRight = new Guard(0, 500, 325);
  guardUp = new Guard(1, 500, 325);
  guardDown = new Guard(3, 500, 325);
}

function playerFunctions() {
  //run all functions related to the player object
  player.show();
  player.keyPressed();
  player.boundaryCheck();
}

function lightFunctions() {
  //run all functions related to the light object
  light.show();
  light.showPathPoint();
  //if light is on path 1, move toward path 1's final point
  if (light.path2Enable == false && light.path3Enable == false && light.path1Enable == true) {
    light.path();
  }
  //if light is on path 2, move toward path 2's final point
  if (light.path2Enable == true && light.path3Enable == false && light.path1Enable == false) {
    light.path2();
  }
  //if light is on path 3, move toward path 3's final point
  if (light.path2Enable == false && light.path3Enable == true && light.path1Enable == false) {
    light.path3();
  }
}

function guardUpFunctions() {
  //run all functions related to the guard object
  guardUp.move();
  guardUp.showTorch();
  guardUp.show();
  guardUp.detectEdge();
  guardUp.playerDetection();
  guardUp.hit();
}

function guardDownFunctions() {
  //run all functions related to the guard object
  guardDown.move();
  guardDown.showTorch();
  guardDown.show();
  guardDown.detectEdge();
  guardDown.playerDetection();
  guardDown.hit();
}

function guardLeftFunctions() {
  //run all functions related to the guard object
  guardLeft.move();
  guardLeft.showTorch();
  guardLeft.show();
  guardLeft.detectEdge();
  guardLeft.playerDetection();
  guardLeft.hit();
}

function guardRightFunctions() {
  //run all functions related to the guard object
  guardRight.move();
  guardRight.showTorch();
  guardRight.show();
  guardRight.detectEdge();
  guardRight.playerDetection();
  guardRight.hit();
}

function guardInitiate() {
  guardLeftFunctions();
  guardRightFunctions();
  guardUpFunctions();
  guardDownFunctions();
}

function checkSideScroll() {
  if (keyIsDown(68)) {
    //if D is pressed go right
    guardUp.x -= player.speed;
    guardDown.x -= player.speed;
    guardLeft.x -= player.speed;
    guardRight.x -= player.speed;
    light.x -= player.speed;
    light.returnX -= player.speed;
    light.move1x -= player.speed;
    light.move2x -= player.speed;
  }
  if (!keyIsDown(68) && keyIsDown(39)) {
    //if D is not pressed and RIGHTARROW is pressed go right
    guardUp.x -= player.speed;
    guardDown.x -= player.speed;
    guardLeft.x -= player.speed;
    guardRight.x -= player.speed;
    light.x -= player.speed;
    light.returnX -= player.speed;
    light.move1x -= player.speed;
    light.move2x -= player.speed;
  }
  if (keyIsDown(65)) {
    //if A is pressed go left
    guardUp.x += player.speed;
    guardDown.x += player.speed;
    guardLeft.x += player.speed;
    guardRight.x += player.speed;
    light.x += player.speed;
    light.returnX += player.speed;
    light.move1x += player.speed;
    light.move2x += player.speed;
  }
  if (!keyIsDown(65) && keyIsDown(37)) {
    //if A is not pressed and LEFTARROW is pressed go left
    guardUp.x += player.speed;
    guardDown.x += player.speed;
    guardLeft.x += player.speed;
    guardRight.x += player.speed;
    light.x += player.speed;
    light.returnX += player.speed;
    light.move1x += player.speed;
    light.move2x += player.speed;
  }
}


function draw() {
  background(5);
  //call all object functions
  playerFunctions();
  lightFunctions();
  guardInitiate();
  checkSideScroll();
  sprintBar.show();
}