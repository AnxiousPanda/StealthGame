function Light(xpos, ypos, move1x, move1y, move2x, move2y) {
  this.radius = 100;
  this.returnX = xpos;
  this.returnY = ypos;
  this.x = xpos;
  this.y = ypos;
  this.move1x = move1x;
  this.move1y = move1y;
  this.move2x = move2x;
  this.move2y = move2y;
  this.path1Enable = true;
  this.path2Enable = false;
  this.path3Enable = false;
  this.path1Run1 = false;
  this.path2Run2 = false;
  this.path3Run3 = false;
  this.initialSpeed = 100;
  this.speed = 1;


  this.show = function() {
    noStroke();
    lightColour = color('rgba(255, 255, 0, 0.3)');
    fill(lightColour);
    ellipse(this.x, this.y, this.radius);
  }

  this.showPathPoint = function() {
    noStroke();
    fill(255, 255, 255);
    ellipse(this.move1x, this.move1y, 2, 2);
    ellipse(this.move2x, this.move2y, 2, 2);
  }

  this.path3 = function() {
    if (this.path3Run3 == false) {
      this.runBack = this.returnX - this.x;
      this.riseBack = this.returnY - this.y;
      this.lengthBack = sqrt((this.riseBack * this.riseBack) + (this.runBack * this.runBack));
      this.unitX = this.runBack / this.lengthBack;
      this.unitY = this.riseBack / this.lengthBack;
      this.path3Run3 = true;
    }

    if (this.path1Enable == false && this.path2Enable == false && Math.floor(this.x) != this.returnX && Math.floor(this.y) != this.returnY) {
      this.x += this.unitX * this.speed;
      this.y += this.unitY * this.speed;
    } else {
      if (this.path3Enable == true && (Math.floor(this.x) < this.returnX + 50 && Math.floor(this.x) >= this.returnX - 50) && (Math.floor(this.y) < this.returnY + 5 && Math.floor(this.y) >= this.returnY - 5)) {
        this.path1Enable = true;
        this.path2Enable = false;
        this.path3Enable = false;
      }
    }

  }

  this.path2 = function() {
    if (this.path2Run2 == false) {
      this.run2 = move2x - this.x;
      this.rise2 = move2y - this.y;
      this.length2 = sqrt((this.rise2 * this.rise2) + (this.run2 * this.run2));
      this.unitX2 = this.run2 / this.length2;
      this.unitY2 = this.rise2 / this.length2;
      this.path2Run2 = true;
    }


    if (this.path1Enable == false && this.path3Enable == false && Math.floor(this.x) != this.move2x && Math.floor(this.y) != this.move2y) {
      this.x += this.unitX2 * this.speed;
      this.y += this.unitY2 * this.speed;
    } else {
      if (this.path2Enable == true && (Math.floor(this.x) < this.move2x + 50 && Math.floor(this.x) >= this.move2x - 50) && (Math.floor(this.y) < this.move2y + 5 && Math.floor(this.y) >= this.move2y - 5)) {
        this.path2Enable = false;
        this.path1Enable = false;
        this.path3Enable = true;
      }
    }
  }

  this.path = function() {
    if (this.path1Run1 == false) {
      this.run1 = move1x - this.x;
      this.rise1 = move1y - this.y;
      this.length = sqrt((this.rise1 * this.rise1) + (this.run1 * this.run1));
      this.unitX1 = this.run1 / this.length;
      this.unitY1 = this.rise1 / this.length;
    }

    if (this.path3Enable == false && this.path2Enable == false && Math.floor(this.x) != this.move1x && Math.floor(this.y) != this.move1y) {
      if (this.path1Run1 == false) {
        this.speed = this.initialSpeed;
      } else {
        this.speed = 1;
      }
      this.x += this.unitX1 * this.speed;
      this.y += this.unitY1 * this.speed;
    }

    if (this.path1Enable == true && (Math.floor(this.x) < this.move1x + 50 && Math.floor(this.x) >= this.move1x - 50) && (Math.floor(this.y) < this.move1y + 5 && Math.floor(this.y) >= this.move1y - 5)) {
      this.path2Enable = true;
      this.path3Enable = false;
      this.path1Enable = false;
    }
    this.path1Run1 = true;
  }
}