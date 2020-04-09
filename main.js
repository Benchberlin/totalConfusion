let hand;
let Himg;
let Fimg;
let frogs = [];
let counter;
let Fsmashed;
let card1;
let card2;
let card3;
let cardArr = [];
let rule;
let condition;
let clock;
let explosion;

function preload() {
  Himg = loadImage("assets/hand.png");
  Fimg = loadImage("assets/froggy.jpg");
  Fsmashed = loadImage("assets/froggySmashed.jpg");
  card1 = loadImage("assets/blueCardGreenTex.png");
  card2 = loadImage("assets/yellowCardRedTex.png");
  card3 = loadImage("assets/redCardYellowText.png");
  cardArr.push(card1);
  cardArr.push(card2);
  cardArr.push(card3);
  explosion = loadImage("assets/pixel-explotion.gif");
}

function setup() {
  createCanvas(400, 600);
  background(150, 100, 200);
  hand = new Hand();
  counter = new Counter();
  rule = new Rule();
  condition = new Condition();
  clock = new Clock(explosion);
}

function keyPressed() {
  if (key == "j") {
    hand.jump();
    console.log("pressing");
  }
}

function draw() {
  clear();

  clock.draw();

  if (frameCount % 60 === 0) {
    frogs.push(
      new Frog(width, 80, cardArr[Math.floor(Math.random() * cardArr.length)])
    );
  }

  for (let f of frogs) {
    f.draw();
    f.move();

    if (f.x < -100) {
      frogs.splice(0, 1);
    }

    // -- Score when Hand collides onces ------

    function score() {
      if (hand.hits(f)) {
        console.log("click");
        counter.score++;
        f.hasBeenTouched = true;
      }
    }

    function scoreMinus() {
      if (hand.hits(f)) {
        console.log("click");
        counter.score--;
        f.hasBeenTouched = true;
      }
    }

    // ----------------------------------------

    /*console.log(f.img, card1);
    console.log(condition.cardCondition);
    console.log(rule.colorRule); */
    //Markus;

    console.log(f.img === card1, f.img === card2);
    if (
      f.img === card1 &&
      condition.cardCondition === "By Card!" &&
      rule.colorRule === "Get the Blue Ones!"
    ) {
      console.log("HappyBirthday55");
      score();
    } else if (
      f.img === card2 &&
      condition.cardCondition === "By Card!" &&
      rule.colorRule === "Get the Yellow Ones!"
    ) {
      score();
    } else if (
      f.img === card3 &&
      condition.cardCondition === "By Card!" &&
      rule.colorRule === "Get the Green Ones!"
    ) {
      score();
    } else if (
      f.img === card1 &&
      condition.cardCondition === "By Text!" &&
      rule.colorRule === "Get the Green Ones!"
    ) {
      score();
    } else if (
      f.img === card2 &&
      condition.cardCondition === "By Text!" &&
      rule.colorRule === "Get the Red Ones!"
    ) {
      score();
    } else if (
      f.img === card3 &&
      condition.cardCondition === "By Text!" &&
      rule.colorRule === "Get the Yellow Ones!"
    ) {
      score();
    } else {
      scoreMinus();
    }
  }

  hand.draw();
  hand.move();
  rule.draw();
  condition.draw();

  counter.draw();
}
