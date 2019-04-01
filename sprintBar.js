function sprintBar() {
  this.sprintBarValue = 1000;
  this.width = 10;

  this.show = function() {
    fill('rgba(0,255,0,0.5)')
    rect(0, 580, this.sprintBarValue, 10);
  }
}