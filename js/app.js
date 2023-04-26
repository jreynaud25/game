let speed = 18;
let gravity = 2;
let bounceLimit = 0; 
let bounceSpeed = -2000;
let isDown;
let rotationValue = 356

let counter = 10;
const gameArea = document.querySelector(".game-area");
let isMax = false;
let bounce = 0;
let isCliked = true;

let acceleration = 1;

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


    if (this.direction === 1) {
      isDown = true
      console.log("isDown " + isDown)
      speed -= gravity;
    } else {
      isDown = false
      console.log("isDown " + isDown)
      speed += gravity;
    }
    if (bgBounding.top >= bounceSpeed) {
      // isCliked = false;
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
    this.setRotation();
    // this.rotation();
    // this.rotationValue = rotationValue

  }

  createRock() {
    const div = document.createElement("div");
    div.id = "rock";
    gameArea.append(div);
    return div;
  }

  setRotation(rotationValue) {
    this.rotationValue = rotationValue
    this.giveRotation = this.element.style.rotate = this.rotationValue + "deg"
  }


  rotation() {


    
    // if(this.rotationValue >= 360 ){
    //   bounceSpeed = -10000
    // }

    // if( 350 <= this.rotationValue < 360 ){
    //   bounceSpeed = -3000
    // }
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
      // console.log(speed)
      this.rock.setRotation(rotationValue)

      if (isCliked) {
        this.backGround.move();
      }
      this.bounce();
    }, 1000 / 60);
  }

  // window.addEventListener('keypress', (e) => {
  //   e.value;
  // });





  bounce() {
    if (this.backGround.y >= 0) {
      console.log(this.rock.element.style.rotate)
      console.log("touched");
      console.log(bounceSpeed)

      // if(rotationValue > 350 && rotationValue < 358){
      //   acceleration -= 0.05
      //   bounceSpeed = 0 *
      // }
      // if(rotationValue > 345 && rotationValue < 350){
      //   acceleration -= 0.06
      //   bounceSpeed = -1000
      // }
      // if(rotationValue > 340 && rotationValue < 345){
      //   acceleration -= 0.06
      //   bounceSpeed = -1250
      // }
      // if(rotationValue > 335 && rotationValue < 340){
      //   bounceSpeed = -1500
      // }
      // if(rotationValue > 330 && rotationValue < 335){
      //   bounceSpeed = -1750
      // }
      // if(rotationValue > 325 && rotationValue < 330){
      //   bounceSpeed = -2000
      // }
      // if(rotationValue > 320 && rotationValue < 325){
      //   bounceSpeed = -2250
      // }
      // if(rotationValue > 315 && rotationValue < 320){
      //   bounceSpeed = -2500
      // }
      // if(rotationValue > 310 && rotationValue < 315){
      //   bounceSpeed = -2750
      // }
      // if(rotationValue > 305 && rotationValue < 310){
      //   bounceSpeed = -3000
      // }
      // if(rotationValue > 300 && rotationValue < 305){
      //   bounceSpeed = -3028
      // }
      // if(rotationValue > 358 && rotationValue < 360){
      //   bounceSpeed = -3028
      // }
      // if(rotationValue > 1 && rotationValue < 300){
      //   bounceSpeed = -4000
      // }
      // if (bounceSpeed >= 0) {
      //   bounceSpeed = 0;
      // }
      speed *= 0.7;
      speed = speed * acceleration
    }
  }
}
new Game();


window.addEventListener('keydown', (event) => {
  console.log(event.key);
  if(event.key === "ArrowLeft"){
    rotationValue -= 20
    rotationValue = rotationValue % 360
    console.log(rotationValue)
  }
  if(event.key === "ArrowRight"){
    rotationValue += 15
    rotationValue = rotationValue % 360
    console.log(rotationValue)
  }
})


let clicker = 0;
document.querySelector(".game-area").addEventListener("click", () => {
  if (isCliked === true) {
    isCliked = false;
  } else {
    isCliked = true;
  }
});
