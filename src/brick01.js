import { detectCollision } from "/src/collisionDetection";

export default class Brick01 {
  constructor(game, position) {
    this.image = document.getElementById("img_brick01");

    this.game = game;

    this.position = position;
    this.width = 80;
    this.height = 24;

    this.marketForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
