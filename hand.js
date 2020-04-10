class Hand {
  constructor() {
    this.x = 220;
    this.y = 350;
    this.vy = 0;
    this.gravity = 0.5;
  }

  jump() {
    if (this.y == 350) {
      this.vy = -18;
    }
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

    return collideRectRect(this.y, this.x, 55, 55, frog.x, frog.y, 50, 30);
  }

  draw() {
    image(Himg, this.x, this.y, 50, 50);


   



  }
}
