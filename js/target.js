class Target {
  constructor(ctx) {
    this.ctx = ctx;

    this.w = 170;
    this.h = 170;

    this.x = this.ctx.canvas.width + this.w
    this.y = Math.random() * (800 - 570 ) + 570;

    //esto está bien?????
    this.vx = Math.random() * ((-6) - (-1) +1)
    //this.vx = -2;

    this.img = new Image();
    this.img.src = "./img/zombie_sprite2.png";
    this.img.frames = 6;
    this.img.width = 1162;
    this.img.height = 420;
    this.img.frameIndex = 0;
    this.img.rows = 2;
    this.cutY = 0;

    this.tick = 0;
    
  }

  draw() {
    this.ctx.drawImage(
      this.img,//image
      this.img.frameIndex * this.img.width / this.img.frames, //sx
      this.img.height * this.cutY / this.img.rows, //sy
      this.img.width / this.img.frames, //sWidth
      this.img.height / this.img.rows, //sHeight
      this.x, // dx
      this.y, //dy
      this.w, //dWidth
      this.h //dHeight
    );

    this.animate();
  }

  move(){
    this.x += this.vx
  }

  animate(){
    if(++this.tick < 6) return

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