class Chancla {
  constructor(ctx, x, y, endX, endY){
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.r = 5;

    this.endX = endX;
    this.endY = endY;

    this.w = 30
    this.h = 30

    this.vx = 5;
    this.vy = 5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.stroke();
  }

  move() {
    if((this.x + this.w / 2) < this.endX) {
      this.x += this.vx
    }
    if(this.y > this.endY) {
      this.y -= this.vy
    }
    // this.y -= this.vy
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }
}