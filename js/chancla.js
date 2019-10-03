class Chancla {
  constructor(ctx, x, y, r){
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.r = 5;

    this.w = 2 * this.r
    this.h = this.w

    this.vx = 10;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath()
  }

  move() {
    this.x += this.vx
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }
}