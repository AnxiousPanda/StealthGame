function Player() {
  this.x = 500;
  this.y = 100;
  this.r = 30;
  this.initialSpeed = 1.62;
  this.speed = 1.62;
  this.sprintSpeed = 3.14;
  this.sprintDecrease = -5;


  this.show = function() {
    stroke(0);
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.r, this.r);
  }

  this.boundaryCheck = function() {
    if (this.y > 650 - this.r / 2) {
      this.y += -this.speed;
    }

    if (this.y < 0 + this.r / 2) {
      this.y += this.speed;
    }
  }


  this.keyPressed = function() {

    if (keyIsDown(83)) {
      //if S is pressed go down
      this.y += this.speed;
    }
    if (keyIsDown(87)) {
      //if W is pressed go up
      this.y -= this.speed;
    }
    if (!keyIsDown(87) && keyIsDown(38)) {
      //if W is not pressed and UPARROW is pressed go up
      this.y -= this.speed;
    }
    if (!keyIsDown(83) && keyIsDown(40)) {
      //if S is not pressed and DOWNARROW is pressed go down
      this.y += this.speed;
    }
    if (keyIsDown(16) && (keyIsDown(68) || keyIsDown(83) || keyIsDown(87) || keyIsDown(38) || keyIsDown(40) || keyIsDown(37) || keyIsDown(39) || keyIsDown(65))) {
      this.speed = this.sprintSpeed;
      if (sprintBar.sprintBarValue > 0) {
        sprintBar.sprintBarValue += this.sprintDecrease;
      }

      if (sprintBar.sprintBarValue <= 0) {
        this.speed = this.initialSpeed;
      }
    }
    if (!keyIsDown(16)) {
      this.speed = this.initialSpeed;
    }
  }
}