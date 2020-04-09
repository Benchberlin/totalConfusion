class Condition {
  constructor() {

    this.cardCondition = '';

    this.conditions = ["By Card!", "By Text!"];
  }

  draw() {
    if (frameCount % 180 === 0) {

      this.cardCondition = this.conditions[Math.floor(random(2))];
    }
    text(this.cardCondition, 22, 10);
  }
}
