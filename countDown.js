class Clock {
  constructor(img) {
    this.x = 20;
    this.y = 350;
    this.t = 60;
    this.img = loadImage("./assets/pixel-explotion.gif");
  }

  draw() {
    if (frameCount % 60 === 0) {
      this.t--;
    }
    text(this.t, this.y, this.x, 100, 100);
    if (this.t <= 0) {
      console.log("Game Over");
      image(this.img, 0, 0, width, height);
    }
  }
}
