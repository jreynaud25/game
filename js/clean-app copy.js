// INIT
const gameArea = document.querySelector(".game-area");

// MOVEMENT SPECIFICITY
let weight = 0;
let speed = 0;
let gravity = 3; 
let acceleration = 0;
let bounceLimit = 0;
let isDown = true;

// GET MOVEMENT
let numberOfBounce = 0;
let isGoingDown = true;

// POSITION REQUEST
let touchedTop = true;
let touchedBottom = true;

// GAME PLAY
let gamePause = false;

// ROCK ROTATION
let rockRotation = 360;



class BackGround {
  constructor() {
    this.element = this.createBg()
    this.bgBounding = this.element.getBoundingClientRect()
    this.y = -this.bgBounding.height + window.innerHeight
    this.direction = -1;
    this.gravity = 0;
    this.speed = 18;
    this.lakeBounding = this.element.querySelector('#lake').getBoundingClientRect()
    this.bounceMax = -100
    this.bounceMin = -this.bgBounding.height + window.innerHeight
    console.log(this.bounceMin)
    this.setBgPosition();
  }

  createBg() {
    const div = document.createElement('div');
    div.id = "background"
    gameArea.append(div)
    const lake = document.createElement('div');
    lake.id = "lake"
    div.append(lake)
    return div
  }

  setBgPosition(){
    this.element.style.top = this.y + "px"
  }

  moveBg(){
    let addedMovement = 0
    if(this.y >= this.bounceMax){
      this.direction = -1
      addedMovement = gravity * -this.direction
    }

    if(this.y <= this.bounceMin){
      this.direction = 1
      addedMovement = gravity * this.direction

    }

    if(this.direction === -1){
      isDown = true;
      this.speed += this.gravity;
      console.log("Is Down: " + isDown)
      console.log(this.y)
    }
    else {
      isDown = false;
      console.log("Is Down: " + isDown)
      console.log(this.y)

    }

    this.y += this.speed * this.direction * gravity;
    this.setBgPosition();
    this.animateBg();


    // if(){}

  }

  animateBg(frame){

    const r = document.querySelector(':root');
    r.style.setProperty('--speed', frame * 2 + "%")
  }
}

class Rock {
  constructor(){
    this.element = this.createRock();
    this.rotation = 360
  }
  createRock(){
    const div = document.createElement("div");
    div.id = "rock";
    gameArea.append(div);
    return div;
  }
  setRockRotation(){

  }
  getAcceleration(speed) {
    if(this.rotation > 350 && this.rotation < 358){
      acceleration -= 0.05
      
    }
    if(this.rotation > 345 && this.rotation < 350){
      acceleration -= 0.06
    }
    if(this.rotation > 340 && this.rotation < 345){
      acceleration -= 0.06
    acceleration -= .01  
    }
    if(this.rotation > 335 && this.rotation < 340){
    acceleration -= .01  
    }
    if(this.rotation > 330 && this.rotation < 335){
    acceleration -= .01  
    }
    if(this.rotation > 325 && this.rotation < 330){
    acceleration -= .01  
    }
    if(this.rotation > 320 && this.rotation < 325){
    acceleration -= .01  
    }
    if(this.rotation > 315 && this.rotation < 320){
    acceleration -= .01  
    }
    if(this.rotation > 310 && this.rotation < 315){
    acceleration -= .01  
    }
    if(this.rotation > 305 && this.rotation < 310){
    acceleration -= .01  
    }
    if(this.rotation > 300 && this.rotation < 305){
    acceleration -= .01  
    }
    if(this.rotation > 358 && this.rotation < 360){
    acceleration -= .01  
    }
    if(this.rotation > 1 && this.rotation < 300){
    acceleration -= .01  
    }
    return acceleration
  }
}

class Game {
  constructor(){
    this.backGround = new BackGround();
    this.rock = new Rock();
    this.intervalId = null;
    this.bounceCount = 0;
    this.animate();
  }

  animate(){
    this.intervalId = setInterval(() => {
      if (gamePause) {
      this.backGround.moveBg();
      this.backGround.animateBg()
      this.bounce()
      }
    }, 1000 / 60);
  }

  bounce(){
    if(this.backGround.y <= this.backGround.bounceMin){
      this.bounceCount += 1;
      const rockAcceleration = this.rock.getAcceleration()
      this.backGround.bounceMax -= this.backGround.speed * 30;
      // const effect = this.getEffect()
      this.backGround.gravity += 0.01
      this.backGround.speed *= 0.7
      // this.backGround.bounceMax -=  * 1
      console.log("bounceCount: " + this.bounceCount)
      console.log(this.backGround.y, this.backGround.bounceMin)
      console.log("Speed", this.backGround.speed)
      // if(this.backGround.bounceMax <= this.backGround.bounceMin){
      //   gamePause = true;
      // }

    }
    // else if(this.backGround.y >= this.backGround.bouceMin){
    //   gamePause = true;
    // }
  }


}

new Game();

let clicker = 0;
document.querySelector(".game-area").addEventListener("click", () => {
  if (gamePause === true) {
    gamePause = false;
  } else {
    gamePause = true;
  }
});
