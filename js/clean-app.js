// INIT
const gameArea = document.querySelector(".game-area");

// MOVEMENT SPECIFICITY
let weight = 0;
let speed = 2;
let mainSpeed = 0;
let gravity = 3;
let acceleration = 0;
let bounceLimit = 0;
let isDown = true;
let multiplicateur = 1;

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

// COUNTER
let keyRightCounter = 0;
let keyLeftCounter = 0;
let rotationCount = 0;
let backFlipCounter = 1;
let frontFlipCounter = 1;

let distance = 0;

var tempsRestant = 60;


class BackGround {
  constructor() {
    this.element = this.createBg();
    this.bgBounding = this.element.getBoundingClientRect();
    this.y = -this.bgBounding.height + window.innerHeight + 150;
    this.direction = -1;
    this.gravity = 0.5;
    this.speed = speed;
    this.mainSpeed = 0;
    this.lakeBounding = this.element
      .querySelector("#lake")
      .getBoundingClientRect();
    this.bounceMax = -100;
    this.bounceMin = -this.bgBounding.height + window.innerHeight;
    this.setBgPosition();
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

  setBgPosition() {
    this.element.style.top = this.y + "px";
  }

  moveBg() {
    let addedMovement = 0;
    if (this.y >= this.bounceMax) {
      this.direction = -1;
      addedMovement = gravity * -this.direction;
    }

    if (this.y <= this.bounceMin) {
      this.direction = 1;
      addedMovement = gravity * this.direction;
    }

    if (this.direction === -1) {
      isDown = true;
      this.speed = speed;
      this.speed += this.gravity;
    } else {
      isDown = false;
    }

    this.y += this.speed * this.direction * gravity;
    this.setBgPosition();
    this.animateBg();
  }

  animateBg(frame) {
    const r = document.querySelector(":root");
    r.style.setProperty("--speed", frame * 2 + "%");
  }
}

class Rock {
  constructor() {
    this.element = this.createRock();
    this.rotation = 360;
  }
  createRock() {
    const div = document.createElement("div");
    div.id = "rock";
    gameArea.append(div);
    const img = document.createElement("img");
    img.src = "./img/gallet.svg";
    div.append(img);

    return div;
  }
  setRockRotation() {
    this.rotationValue = this.rotation;
    this.giveRotation = this.element.style.rotate = this.rotationValue + "deg";
  }

  checkAngle() {
    return this.rotationValue % 360;
  }
}

class Game {
  constructor() {
    this.backGround = new BackGround();
    this.rock = new Rock();
    this.intervalId = null;
    this.bounceCount = 0;
    this.animate();
    this.makeRotation();
  }

  animate() {
    this.intervalId = setInterval(() => {
      // if(timing % 6000 === 0){
      //   distance += 10
      // }
      this.backGround.mainSpeed += -0.3;
      this.backGround.animateBg(this.backGround.mainSpeed);

      this.rock.setRockRotation();

      if (gamePause) {
        this.backGround.moveBg();
        this.bounce();

        this.gameCounter();

        this.giveRotation();
        this.backGround.mainSpeed += -0.3 * multiplicateur;
        this.backGround.animateBg(this.backGround.mainSpeed);
      }
    }, 1000 / 60);
  }

  giveRotation() {}

  bounce() {
    if (this.backGround.y <= this.backGround.bounceMin) {

      document.body.classList.remove("the-rock");
      
      this.bounceCount += 1;
      this.speed += 0.4;

      if(this.bounceCount <= 1){
        this.timing()
      }

      multiplicateur += 0.5;
      // if(multiplicateur)

      let angle = this.rock.checkAngle();

      console.log(angle);

      backFlipCounter = 0;
      frontFlipCounter = 0;

      if (this.bounceCount === 0) {
      }

      if (angle >= 340 && angle <= 350) {
        this.backGround.bounceMax = -500;
        distance += 10;
        this.alert("Wow ! Perfect Landing <br>+10pts");
      }
      if (angle >= 330 && angle <= 340) {
        this.backGround.bounceMax = -1000 * (multiplicateur / 5);
        distance += 5;
        this.alert("Almost perfect landing<br> +5pts");
      }
      if (angle >= 320 && angle <= 330) {
        this.backGround.bounceMax = -1500 * (multiplicateur / 5);
        distance += 4;
        this.alert("Could have done better<br>+4pts");
      }
      if (angle >= 310 && angle <= 320) {
        this.backGround.bounceMax = -2000 * (multiplicateur / 5);
        distance += 3;
        this.alert("Landing ok<br>+3pts");
      }
      if (angle >= 300 && angle <= 310) {
        this.backGround.bounceMax = -2500 * (multiplicateur / 5);
        distance += 2;
        this.alert("Better ?<br>+2pts");
      }
      if (angle >= 290 && angle <= 300) {
        this.backGround.bounceMax = -3000 * (multiplicateur / 5);
        distance += 1;
        this.alert("Are you serious ?<br> +1pts");
      }

      if (angle >= 0 && angle <= 10) {
        this.backGround.bounceMax = -3100 * (multiplicateur / 5);
        distance += 0.5;
        this.alert("Are you sinking ?<br>+0.5pts");
      }

      if (angle <= 290 && angle >= 10) {
        gamePause = true;
        this.backGround.bounceMax = -3300 * (multiplicateur / 5);
        this.endGame()
        this.alert("You loose");
      }
    }
  }

  makeRotation() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        keyRightCounter = 0;
        this.rock.rotation -= 10;

        keyLeftCounter++;

        if (keyLeftCounter % 36 === 0) {
          keyLeftCounter = 0;
          rotationCount++;
          console.log("back flip");
          backFlipCounter++;
          distance += 20 * backFlipCounter;
          if (backFlipCounter > 1) {
            this.alert(
              "Back Flip × " +
                backFlipCounter +
                "<br> +" +
                20 * backFlipCounter +
                "pts"
            );
          } else {
            this.alert("Back Flip<br>+20pts");
          }
        }

        if (backFlipCounter >= 3) {
          document.body.classList.add("the-rock");
        } 

        this.rock.rotation = Math.abs(this.rock.rotation % 360);
        if (this.rock.rotation === 0) {
          this.rock.rotation = 360;
        }
      }
      if (event.key === "ArrowRight") {
        keyLeftCounter = 0;
        this.rock.rotation += 10;

        keyRightCounter++;

        if (keyRightCounter % 36 === 0) {
          keyRightCounter = 0;
          rotationCount++;
          console.log("front flip");
          frontFlipCounter++;
          distance += 20 * frontFlipCounter;
          if (frontFlipCounter > 1) {
            this.alert(
              "Front Flip × " +
                frontFlipCounter +
                "<br> +" +
                20 * frontFlipCounter +
                "pts"
            );
          } else {
            this.alert("Front Flip<br>+20pts");
          }
        }

        if (frontFlipCounter >= 3) {
          document.body.classList.add("the-rock");
        } 

        this.rock.rotation = Math.abs(this.rock.rotation % 360);
      }
    });
  }

  gameCounter() {
    distance;
    document.querySelector(".counter span").innerText = distance + "pts";
    console.log(rotationCount);
  }

  alert(entry) {
    document.querySelector(" .comment").innerHTML =
      "<span>" + entry + "</span>";
  }

  timing(){
    var compteur = document.querySelector(".timing");
    let game = this;

    var interval = setInterval(function() {
      tempsRestant--;
      compteur.innerHTML = tempsRestant;
    
      // Arrêter le décompte lorsque le temps est écoulé
      if (tempsRestant == 0) {
        // this.endGame()
        clearInterval(interval);
        compteur.innerHTML = "GAME OVER";
        game.endGame()
      }
    }, 1000);
  }

  endGame(){
    // this.animate();
    tempsRestant = 1
    clearInterval(this.intervalId);
    document.body.classList.add('restart')
  }
}

new Game();

let clicker = 0;
document.querySelector(".start-button").addEventListener("click", () => {
  if (gamePause === true) {
    gamePause = false;
  } else {
    gamePause = true;
    document.body.classList.add('remove-intro')
  }
});
