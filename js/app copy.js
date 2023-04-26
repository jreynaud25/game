let speed = 35;
let gravity = 2;
let bounceSpeed = -1000;

let counter = 10;
const gameArea = document.querySelector(".game-area");
let isMax = false;
let bounce = 0;
let isCliked = true;

class BackGround {
  constructor() {
    this.element = this.createBg();
    this.max =
      -this.element.getBoundingClientRect().height + window.innerHeight;
    this.y =
      -this.element.querySelector("#lake").getBoundingClientRect().height / 2;
    this.direction = -1;
    this.setPosition();
    this.lakeBounding = this.element
      .querySelector("#lake")
      .getBoundingClientRect();
  }

  createBg() {
    const div = document.createElement("div");
    div.id = "background";
    gameArea.append(div);
    const lake = document.createElement("div");
    lake.id = "lake";
    div.append(lake);
    return div;
  }

  getSpeed(num) {
    this.y += num;
    this.setPosition();
  }

  setPosition() {
    this.element.style.bottom = this.y + "px";
    // console.log(this.element.querySelector('#lake').innerHTML / 2)
  }

  move() {
    const bgBounding = this.element.getBoundingClientRect();

    console.log(bgBounding.top, bounceSpeed, speed);
    // - 3000         -740
    if (this.direction === 1) {
      speed -= gravity;
    } else {
      speed += gravity;
    }
    if (bgBounding.top >= bounceSpeed) {
      console.log("touching the top", bgBounding.top, bounceSpeed);
      this.direction = 1;
    }

    if (this.y >= 0) {
      this.y = 0;
      this.direction = -1;
      speed -= gravity;
      console.log("Removed speed", speed);
    }

    this.y += speed * this.direction;
    this.setPosition();
  }
}

class Rock {
  constructor() {
    this.element = this.createRock();
  }

  createRock() {
    const div = document.createElement("div");
    div.id = "rock";
    gameArea.append(div);
    return div;
  }
}

class Game {
  constructor() {
    this.backGround = new BackGround();
    this.rock = new Rock();
    this.intervalId = null;
    this.animate();
  }
  animate() {
    this.intervalId = setInterval(() => {
      if (isCliked) {
        this.backGround.move();
      }
      this.bounce();
    }, 1000 / 60);
  }

  bounce() {
    if (this.backGround.y >= 0) {
      console.log("touched");
      console.log(speed, bounceSpeed);
      bounceSpeed -= speed * 15;
      if (bounceSpeed >= 0) {
        bounceSpeed = 0;
      }
      speed *= 0.7;
    }
  }
}
new Game();

let clicker = 0;
document.querySelector(".game-area").addEventListener("click", () => {
  if (isCliked === true) {
    isCliked = false;
  } else {
    isCliked = true;
  }
});
