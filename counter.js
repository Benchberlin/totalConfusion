class Counter {
  constructor() {
    this.y = 200;
    this.x = 20;
    this.score = 0;
  }

  draw() {
    let s = `Score: ${this.score}`;

    // text(s, this.y, this.x, 100, 100); // Text wraps within text box
    fill(96, 73, 23);
  }
}
