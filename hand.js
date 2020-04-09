class Hand {
  constructor() {
    this.y = 350;
    this.x = 170;

    this.gravity = 0.8;
    this.vy = 0;
  }

  move() {
    if (this.y < 350) {
      this.y += this.vy;
      this.vy += this.gravity;
    }
  }

  jump() {
    this.y -= 30;
    this.vy = -20;
  }

  hits(frog) {

    if (frog.hasBeenTouched === true) {
      return false;
    }

    console.log("touch")


    return collideRectRect(this.y, this.x, 55, 55, frog.x, frog.y, 50, 30);
  }

  draw() {
    image(Himg, this.x, this.y, 50, 50);
  }
}
