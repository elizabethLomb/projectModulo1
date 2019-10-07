class Chancla {
  constructor(ctx, x, y, endX, endY){
    this.ctx = ctx;
    
    this.y = y;
    this.x = x;

    this.endX = endX;
    this.endY = endY;

    this.w = 80
    this.h = 100

    this.vx = (endX - (this.w / 2) - x) / 100;
    this.vy = (endY - (this.h / 2) - y) / 100;

    this.img = new Image();
    this.img.src = "./img/chancla_sprite.png";
    this.img.frames = 11;
    this.img.frameIndex = 0;

    this.tick = 0;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animate();
  }

  move() {
    if((this.x + this.w / 2) < this.endX) {
      this.x += this.vx;
    }
    if((this.y + this.h / 2) > this.endY) {
      this.y += this.vy;
    }
  }

  animate(){
    if(this.tick++ < 8) return

    if (++this.img.frameIndex >= this.img.frames) {
      //debugger
      this.img.frameIndex = 0;
      this.tick = 0;
    }
  }

  collide(el) {
    const collideX = el.x + el.w > this.x && el.x < this.x + this.w
    const collideY = el.y + el.h > this.y && el.y < this.y + this.h
 
    return collideX && collideY
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }
}