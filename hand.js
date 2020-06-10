class Hand {
  constructor() {
    this.x = 220;
    this.y = 350;
    this.vy = 0;
    this.gravity = 0.5;
    this.height = 50;
    this.width = 50;
  }

  jump() {
    if (this.y == 350) {
      this.vy = -18;
    }
  }

  getSmall() {
    this.height = 35;
    this.width = 35;
  }


  getNormal() {
    this.height = 50;
    this.width = 50;
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, 350);
  }

  moveLeft() {
    this.x -= 10;
  }

  moveRight() {
    this.x += 10;
  }

  hits(frog) {
    if (frog.hasBeenTouched === true) {
      return false;
    }

    return collideRectRect(
      this.y,
      this.x,
      55,
      55,
      frog.x,
      frog.y,
      this.height,
      this.width
    );
  }

  draw() {
    image(Himg, this.x, this.y, this.height, this.width);
  }
}
