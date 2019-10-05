class Chancla {
  constructor(ctx, x, y, endX, endY){
    this.ctx = ctx;
    
    this.y = y;
    this.x = x;

    this.endX = endX;
    this.endY = endY;

    this.w = 30
    this.h = 65

    this.vx = (endX - (this.w / 2) - x) / 100;
    this.vy = (endY - (this.h / 2) - y) / 100;

    this.img = new Image();
    this.img.src = "./img/chancla.png";
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    if((this.x + this.w / 2) < this.endX) {
      this.x += this.vx
    }
    if((this.y + this.h / 2) > this.endY) {
      this.y += this.vy
    }
    // this.y -= this.vy
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }
}