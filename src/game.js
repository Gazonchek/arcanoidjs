import Paddle from "/src/paddle";
import inputHandler from "/src/input";
import Ball from "/src/ball";
import Brick01 from "/src/brick01";
import Brick02 from "/src/brick02";
import { buildLevel, level1 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.lives = 1;
    new inputHandler(this.paddle, this);
  }
  start() {
    if(this.gamestate !== GAMESTATE.MENU) return;
    this.gamestate = GAMESTATE.RUNNING;
    let bricks01 = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle, ...bricks01];
    }

  update(deltaTime) {
    if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
    
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;
    this.gameObjects.forEach(object => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      object => !object.markedForDeletion
    );
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial Bold";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACE to start the game",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial Bold";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial Bold";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "You're LOOOOOOOSER!",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
