let Bimg;
let hand;
let Himg;
let Fimg;
let frogs = [];
let counter;
let Fsmashed;
let card1;
let card2;
let card3;
let card4;
let cardArr = [];
let rule;
let condition;
let clock;
let explosion;
let velocity = 0;
var x1 = 0;
var x2;
let song;

var scrollSpeed = 5;

function preload() {
  song = loadSound("assets/Chiptronical.mp3");
  Bimg = loadImage("assets/bluesky_2.png");
  Himg = loadImage("assets/hand.png");
  Fimg = loadImage("assets/froggy.jpg");
  Fsmashed = loadImage("assets/froggySmashed.jpg");
  card1 = loadImage("assets/pixil-frame-0 (2).png");
  card2 = loadImage("assets/pixil-frame-0 (3).png");
  card3 = loadImage("assets/pixil-frame-0 (4).png");
  card4 = loadImage("assets/greencard-bluetext.png");
  cardArr.push(card1);
  cardArr.push(card2);
  cardArr.push(card3);
  cardArr.push(card4);
  explosion = createImg("assets/pixel-explotion.gif").hide();
}

function setup() {
  clock = new Clock(explosion);
  createCanvas(500, 500);
  x2 = width;
  hand = new Hand();
  counter = new Counter();
  rule = new Rule();
  condition = new Condition();
  song.setVolume(0.02);
  song.play();
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    hand.jump();
    console.log("jump");
  }
}

function draw() {
  clear();

  if (keyIsDown(RIGHT_ARROW)) {
    hand.moveRight();
    console.log("right");
  }

  if (keyIsDown(LEFT_ARROW)) {
    hand.moveLeft();
    console.log("left");
  }

  if (keyIsDown(32)) {
    hand.getSmall();
  } else {
    hand.getNormal();
  }

  image(Bimg, x2, 0, 510, 500);
  image(Bimg, x1, 0, 510, 500);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }

  if (frameCount % 60 === 0) {
    frogs.push(
      new Frog(
        0,
        80,
        cardArr[Math.floor(Math.random() * cardArr.length)],
        velocity
      )
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
      if (hand.hits(f) && hand.height == 35) {
        counter.score++;
        f.x = 500 ;
        f.hasBeenTouched = true;
      }
    }

    function scoreMinus() {
      if (hand.hits(f)) {
        counter.score--;
        f.hasBeenTouched = true;
      }
    }

    // ----------------------------------------

    /*console.log(f.img, card1);
    console.log(condition.cardCondition);
    console.log(rule.colorRule); */
    //Markus;

    if (
      f.img === card1 &&
      condition.cardCondition === "Card!" &&
      rule.colorRule === "Get the Blue"
    ) {
      score();
    } else if (
      f.img === card2 &&
      condition.cardCondition === "Card!" &&
      rule.colorRule === "Get the Yellow"
    ) {
      score();
    } else if (
      f.img === card3 &&
      condition.cardCondition === "Card!" &&
      rule.colorRule === "Get the Green"
    ) {
      score();
    } else if (
      f.img === card1 &&
      condition.cardCondition === "Text!" &&
      rule.colorRule === "Get the Green"
    ) {
      score();
    } else if (
      f.img === card2 &&
      condition.cardCondition === "Text!" &&
      rule.colorRule === "Get the Red"
    ) {
      score();
    } else if (
      f.img === card3 &&
      condition.cardCondition === "Text!" &&
      rule.colorRule === "Get the Yellow"
    ) {
      score();
    } else if (
      f.img === card4 &&
      condition.cardCondition === "Text!" &&
      rule.colorRule === "Get the Blue"
    ) {
      score();
    } else if (
      f.img === card4 &&
      condition.cardCondition === "Card!" &&
      rule.colorRule === "Get the Green"
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
  clock.draw();

  document.querySelector("body > div.score-board").innerText = counter.score;

  document.querySelector("#rule1").innerHTML = rule.colorRule;

  document.querySelector("#rule2").innerHTML = condition.cardCondition;
}

/* document.querySelector("#reset").addEventListener("click", () => {
  location.reload();
}); 

document.querySelector("#mode_hard").addEventListener("click", () => {
  velocity = 5;
  frogs.forEach((frog) => {
    frog.velocity = 5;
  });
});

document.querySelector("#mode_easy").addEventListener("click", () => {
  velocity = velocity / 1.5;
  frogs.forEach((frog) => {
    frog.velocity = velocity / 2;
  });
});

*/
