class Target {
  constructor(ctx) {
    this.ctx = ctx;

    this.w = 184;
    this.h = 180;

    this.x = this.ctx.canvas.width + this.w
    this.y = Math.random() * (800 - 570 ) + 570;

    //esto está bien?????
    this.vx = Math.random() * ((-6) - (-1) +1)

    this.img = new Image();
    this.img.src = "./img/zombie_sprite.png";
    this.img.frames = 4;
    this.img.frameIndex = 1;
    this.img.rows = 5;
    this.currentIndex = 1;
    this.cutY = 0;

    this.tick = 0;
    
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      this.img.height * this.cutY / this.img.rows,
      this.img.width / this.img.frames,
      this.img.height / this.img.rows,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animate();
  }

  move(){
    this.x += this.vx
  }

  animate(){
    if(this.tick++ < 8) return

    if (++this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
      this.tick = 0;
    }
  }

  collide(el) {
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }

}