class Frog {
  constructor(y, x, img, velocity) {
    this.y = y;
    this.x = x;
    this.img = img;
    this.hasBeenTouched = false;
    this.test = "test";
    this.velocity = velocity;
  }

  preLoad() {}

  setup() {}

  draw() {
    image(this.img, this.y, this.x, 100, 28);
  }

  move() {
    this.y = this.y - 5 - this.velocity;
  }
}
