class Bomb {
  constructor(ctx){
    this.ctx = ctx;

    this.w = 112;
    this.h = 137;

    this.x = Math.random() * this.ctx.canvas.width
      - this.w;
    this.y = -5;

    this.tick = 0;
    this.hits = 1;

    this.vy = 0.1;
    this.vx = 0;
    this.ay = 0;
    this.ay = 0;
    this.gravity = 0.05;

    this.img = new Image();
    this.img.src = "./img/bomb.png";

    this.img.frames = 1;
    this.img.width = 112;
    this.img.height = 273;
    this.img.frameIndex = 0;
    this.img.rows = 2;
    this.cutY = 0;

    this.tick = 0;
    this.hits = 1;

  }

  draw() {
    this.ctx.drawImage(
      this.img,//image
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      this.img.height * this.cutY / this.img.rows, 
      this.img.width / this.img.frames, 
      this.img.height / this.img.rows, 
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  move(){
    this.vy += this.ay;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  }

  isFloor(){
    return (this.y >= this.ctx.canvas.height - this.h) * 0.9
  }

  collide(enemy) {
    if (
      this.x < enemy.x + enemy.w &&
      this.x + this.w > enemy.x &&
      this.y < enemy.y + enemy.h &&
      this.h + this.y > enemy.y
    ) {

      this.cutY = 1;
      this.vy = 0;
      this.gravity = 0;

      enemy.hits--;
      return true;
    }
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }
}