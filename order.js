class Rule {
  constructor() {
    this.colorRule = "";

    this.rules = [
      "Get the Blue Ones!",
      "Get the Green Ones!",
      "Get the Yellow Ones!",
    ];
  }

  draw() {
    if (frameCount % 180 === 0) {
      this.colorRule = this.rules[Math.floor(random(3))];
    }
    // text(this.colorRule, 20, 55);
  }
}
