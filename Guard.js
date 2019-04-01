function Guard(direction, x, y) {
  this.x = x;
  this.y = y;
  this.lightLength = Math.floor(Math.random() * 200) + 100;
  this.speed = 0.5;
  //direction takes parameters between 0 and 3
  // 0 = Right movement
  // 1 = Upward movement
  // 2 = Left movement
  // 3 = Downward movement
  this.dir = direction;
  //switches to detect which way the guard is facing
  this.switched1 = false;
  this.switched2 = false;
  this.detectionSwitch;
  this.pi = PI;
  this.detectionRadius = 100;
  this.arcDetectionLength = 50;
  this.flashlightColour = 'rgba(255, 255, 0, 0.3)';
  this.firstDetection = false;
  this.detectionSwitch = true;
  this.upFirstDetection = false;




  //Set semi-circle draw direction depending on guards direction
  if (this.dir == 3) {
    this.threeDir1 = 0;
    this.threeDir2 = PI;
  }

  if (this.dir == 2) {
    this.circleDir1 = -HALF_PI;
    this.circleDir2 = HALF_PI;
  }

  if (this.dir == 0) {
    this.circleDir1 = -HALF_PI;
    this.circleDir2 = HALF_PI;
  }

  if (this.dir == 1) {
    this.threeDir1 = PI;
    this.threeDir2 = 0;
  }

  this.show = function() {
    //Display the guard at its given x and y position
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 30, 30);
    fill(255, 0, 0);
    ellipse(this.x - (this.dist / 2), this.y + this.detectionWidth, 20, 20);
  }

  this.move = function() {
    //Move according to selected direction
    if (this.dir == 0) {
      this.x += this.speed;
    }

    if (this.dir == 1) {
      this.y -= this.speed;
    }

    if (this.dir == 2) {
      this.x -= this.speed;
    }

    if (this.dir == 3) {
      this.y += this.speed;
    }

  }

  this.areaDetection = function() {

  }

  this.showTorch = function() {
    //draw the flashlight according to selected direction
    if (this.dir == 0) {
      //position the vertices of the flashlight
      this.lightPoint2x = this.x + this.lightLength;
      this.lightPoint2y = this.y - 50;
      this.lightPoint3x = this.x + this.lightLength;
      this.lightPoint3y = this.y + 50;
      //get the distance between the two outer vertices of the flashlight
      this.dist = sqrt(Math.pow((this.lightPoint3x - this.lightPoint2x), 2) + Math.pow((this.lightPoint3y - this.lightPoint2y), 2));
      fill(color(this.flashlightColour));
      noStroke();
      //draw the flashlight and its cone
      triangle(this.x, this.y, this.lightPoint2x, this.lightPoint2y, this.lightPoint3x, this.lightPoint3y);
      arc(this.x + this.lightLength, this.y, this.dist, this.dist, this.circleDir1, this.circleDir2);
    }

    if (this.dir == 1) {
      //position the vertices of the flashlight
      this.lightPoint2x = this.x - 50;
      this.lightPoint2y = this.y - this.lightLength;
      this.lightPoint3x = this.x + 50;
      this.lightPoint3y = this.y - this.lightLength;
      //get the distance between the two outer vertices of the flashlight
      this.dist = sqrt(Math.pow((this.lightPoint3x - this.lightPoint2x), 2) + Math.pow((this.lightPoint3y - this.lightPoint2y), 2));
      fill(color(this.flashlightColour));
      noStroke();
      //draw the flashlight and its cone
      triangle(this.x, this.y, this.lightPoint2x, this.lightPoint2y, this.lightPoint3x, this.lightPoint3y);
      arc(this.x, this.y - this.lightLength, this.dist, this.dist, this.threeDir1, this.threeDir2, CHORD);
    }

    if (this.dir == 2) {
      //position the vertices of the flashlight
      this.lightPoint2x = this.x - this.lightLength;
      this.lightPoint2y = this.y + 50;
      this.lightPoint3x = this.x - this.lightLength;
      this.lightPoint3y = this.y - 50;
      //get the distance between the two outer vertices of the flashlight
      this.dist = sqrt(Math.pow((this.lightPoint3x - this.lightPoint2x), 2) + Math.pow((this.lightPoint3y - this.lightPoint2y), 2));
      fill(color(this.flashlightColour));
      noStroke();
      //draw the flashlight and its cone
      triangle(this.x, this.y, this.lightPoint2x, this.lightPoint2y, this.lightPoint3x, this.lightPoint3y);
      arc(this.x - this.lightLength, this.y, this.dist, this.dist, -this.circleDir1, -this.circleDir2);
    }

    if (this.dir == 3) {
      //position the vertices of the flashlight
      this.lightPoint2x = this.x + 50;
      this.lightPoint2y = this.y + this.lightLength;
      this.lightPoint3x = this.x - 50;
      this.lightPoint3y = this.y + this.lightLength;
      //get the distance between the two outer vertices of the flashlight
      this.dist = sqrt(Math.pow((this.lightPoint3x - this.lightPoint2x), 2) + Math.pow((this.lightPoint3y - this.lightPoint2y), 2));
      fill(color(this.flashlightColour));
      noStroke();
      //draw the flashlight and its cone
      triangle(this.x, this.y, this.lightPoint2x, this.lightPoint2y, this.lightPoint3x, this.lightPoint3y);
      arc(this.x, this.y + this.lightLength, this.dist, this.dist, this.threeDir1, this.threeDir2, CHORD);
    }

  }

  this.detectEdge = function() {
    //detect whether a guard travelling along the x axis has hit the edge of the x-axis
    if (this.dir == 0 || this.dir == 2) {
      if (this.lightPoint2x > 1000 || this.lightPoint2x < 0) {
        this.arcDetectionLength = -this.arcDetectionLength;
        this.lightLength = -this.lightLength;
        this.speed = -this.speed;
        this.circleDir1 = -this.circleDir1;
        this.circleDir2 = -this.circleDir2;
      }
    }


    //detect whether a guard travelling along the y-axis has hit the edge of the y-axis
    if (this.lightPoint2y > 650 || this.lightPoint2y < 0) {
      //if the flashlight hits the edge, switch the direction that the cone is drawn
      if (this.dir == 1 || this.dir == 3) {
        this.switched1 = false;
        this.switched2 = false;
        this.arcDetectionLength = -this.arcDetectionLength;
        this.lightLength = -this.lightLength;
        this.speed = -this.speed;

        if (this.threeDir1 == 0 && this.switched2 == false) {
          this.threeDir1 = this.pi;
          this.switched2 = true;
        }

        if (this.threeDir1 == PI && this.switched2 == false) {
          this.threeDir1 = 0;
          this.switched2 = true;
        }
        if (this.threeDir2 == 0 && this.switched1 == false) {
          this.threeDir2 = this.pi;
          this.switched1 = true;
        }

        if (this.threeDir2 == PI && this.switched1 == false) {
          this.threeDir2 = 0;
          this.switched1 = true;
        }

      }


    }
  }

  this.playerDetection = function() {
    if (this.dir == 1) {
      fill('rgba(255,255,255,0.05)');
      this.hit = function() {
        //CHANGE AROUND DETECTION ORDER
        this.detectionWidth = this.lightLength + this.arcDetectionLength;
        this.detectionWidthCompensator = -this.lightLength + -this.arcDetectionLength;

        if (this.upFirstDetection == false) {
          this.detectionSwitch2 = false;
          this.upFirstDetection = true;
        }

        if (this.lightPoint2y < 1) {
          this.detectionSwitch2 = false;
        }

        if (this.lightPoint2y > 649) {
          this.detectionSwitch2 = true;
        }

        if (this.detectionSwitch2 == false) {
          //Down
          this.deltaX = player.x - Math.max(this.x - 50, Math.min(player.x, (this.x - 50) + this.dist));
          this.deltaY = player.y - Math.max(this.y, Math.min(player.y, this.y + (this.lightLength + this.arcDetectionLength)));
          if (((this.deltaX * this.deltaX) + (this.deltaY * this.deltaY)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }
        if (this.detectionSwitch2 == true) {
          //Up
          this.deltaX = player.x - Math.max((this.x - 50), Math.min(player.x, (this.x - 50) + this.dist));
          this.deltaY = player.y - Math.max(this.y + this.detectionWidth, Math.min(player.y, (this.y + this.detectionWidth) + (-this.lightLength + -this.arcDetectionLength)));
          if (((this.deltaX * this.deltaX) + (this.deltaY * this.deltaY)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }
      }
      rect(this.x - 50, this.y, this.dist, -this.lightLength + -this.arcDetectionLength);
    }
    if (this.dir == 3) {
      fill('rgba(255,255,255,0.05)');

      this.hit = function() {
        this.detectionWidth = this.lightLength + this.arcDetectionLength;
        this.detectionWidthCompensator = -this.lightLength + -this.arcDetectionLength;

        if (this.upFirstDetection == false) {
          this.detectionSwitch2 = false;
          this.upFirstDetection = true;
        }

        if (this.lightPoint2y < 1) {
          this.detectionSwitch2 = false;
        }

        if (this.lightPoint2y > 649) {
          this.detectionSwitch2 = true;
        }

        if (this.detectionSwitch2 == false) {
          //Down
          this.deltaX = player.x - Math.max(this.x - 50, Math.min(player.x, (this.x - 50) + this.dist));
          this.deltaY = player.y - Math.max(this.y, Math.min(player.y, this.y + (this.lightLength + this.arcDetectionLength)));
          if (((this.deltaX * this.deltaX) + (this.deltaY * this.deltaY)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }
        if (this.detectionSwitch2 == true) {
          //Up
          this.deltaX = player.x - Math.max((this.x - 50), Math.min(player.x, (this.x - 50) + this.dist));
          this.deltaY = player.y - Math.max(this.y + this.detectionWidth, Math.min(player.y, (this.y + this.detectionWidth) + (-this.lightLength + -this.arcDetectionLength)));
          if (((this.deltaX * this.deltaX) + (this.deltaY * this.deltaY)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }

      }
      rect(this.x - 50, this.y, this.dist, this.lightLength + this.arcDetectionLength);
    }
    if (this.dir == 0) {
      fill('rgba(255,255,255,0.05)');

      if (this.firstDetection == false) {
        this.detectionSwitch = false;
        this.firstDetection = true;
      }

      this.hit = function() {
        this.detectionWidth = this.lightLength + this.arcDetectionLength;
        this.detectionWidthCompensator = -this.lightLength + -this.arcDetectionLength;

        if (this.lightPoint2x < 1) {
          this.detectionSwitch = false;
        }

        if (this.lightPoint2x > 999) {
          this.detectionSwitch = true;
        }

        if (this.detectionSwitch == true) {
          this.deltaX = player.x - Math.max(this.x + this.detectionWidth, Math.min(player.x, (this.x + this.detectionWidth) + (this.detectionWidthCompensator)));
          this.deltaY = player.y - Math.max(this.y - 50, Math.min(player.y, (this.y - 50) + this.dist));
          if (((this.deltaX * this.deltaX) + (this.deltaY * this.deltaY)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }

        if (this.detectionSwitch == false) {
          this.deltaX1 = player.x - Math.max(this.x, Math.min(player.x, (this.x) + (this.lightLength + this.arcDetectionLength)));
          this.deltaY1 = player.y - Math.max(this.y - 50, Math.min(player.y, (this.y - 50) + (this.dist)));
          if (((this.deltaX1 * this.deltaX1) + (this.deltaY1 * this.deltaY1)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }
        //  this.deltaX = player.x - Math.max(this.x, Math.min(player.x, (this.x) + (this.lightLength + this.arcDetectionLength)));
        //  this.deltaY = player.y - Math.max(this.y - 50, Math.min(player.y, (this.y - 50) + (this.dist)));
        //  if (((this.deltaX * this.deltaX) + (this.deltaY * this.deltaY)) < (player.r)) {
        //    this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
        //  }
      }
      rect(this.x, this.y - 50, this.lightLength + this.arcDetectionLength, this.dist);
    }
    if (this.dir == 2) {
      fill('rgba(255,255,255,0.05)');
      this.hit = function() {
        this.detectionWidth = -this.lightLength + -this.arcDetectionLength;
        this.detectionWidthCompensator = this.lightLength + this.arcDetectionLength;
        //DeltaX = CircleX - Max(RectX, Min(CircleX, RectX + RectWidth));
        //DeltaY = CircleY - Max(RectY, Min(CircleY, RectY + RectHeight));
        //return (DeltaX * DeltaX + DeltaY * DeltaY) < (CircleRadius * CircleRadius);
        if (this.lightPoint2x < 1) {
          this.detectionSwitch = false;
        }

        if (this.lightPoint2x > 999) {
          this.detectionSwitch = true;
        }

        if (this.detectionSwitch == true) {
          this.deltaX = player.x - Math.max(this.x + this.detectionWidth, Math.min(player.x, (this.x + this.detectionWidth) + (this.detectionWidthCompensator)));
          this.deltaY = player.y - Math.max(this.y - 50, Math.min(player.y, (this.y - 50) + this.dist));
          if (((this.deltaX * this.deltaX) + (this.deltaY * this.deltaY)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }

        if (this.detectionSwitch == false) {
          this.deltaX1 = player.x - Math.max(this.x, Math.min(player.x, (this.x) + (-this.lightLength + -this.arcDetectionLength)));
          this.deltaY1 = player.y - Math.max(this.y - 50, Math.min(player.y, (this.y - 50) + (this.dist)));
          if (((this.deltaX1 * this.deltaX1) + (this.deltaY1 * this.deltaY1)) < (player.r)) {
            this.flashlightColour = 'rgba(255, 0, 0, 0.3)';
          }
        }


      }
      rect(this.x, this.y - 50, -this.lightLength + -this.arcDetectionLength, this.dist);
    }
  }
}