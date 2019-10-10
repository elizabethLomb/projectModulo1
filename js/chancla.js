class Chancla {
  constructor(ctx, x, y, endX, endY){
    this.ctx = ctx;
    
    this.y = y;
    this.x = x;

    this.endX = endX;
    this.endY = endY;

    this.w = 80
    this.h = 90

    this.vx = (endX - (this.w / 2) - x) / 100;
    this.vy = (endY - (this.h / 2) - y) / 100;

    this.img = new Image();
    this.img.src = "./img/chancla_sprite.png";
    this.img.frames = 12;
    this.img.frameIndex = 0;

    this.tick = 0;
    this.score = 0;

    this.woosh = new Audio('./audios/woosh2.mp3');
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
    this.woosh.play();
    if((this.x + this.w / 2) < this.endX) {
      this.x += this.vx;
    }
    if((this.y + this.h / 2) > this.endY) {
      this.y += this.vy;
    }
  }

  animate(){
    if(this.tick++ < 2) return

    if (++this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
      this.tick = 0;
    }
  }

  collide(el) {
    this.woosh.stop();
    //console.info('Es un array? => ', el)
    if (
      this.x < el.x + el.w &&
      this.x + this.w > el.x &&
      this.y < el.y + el.h &&
      this.h + this.y > el.y
    ) {
      this.score++;
      console.log("collide chancla");
      //debugger
      return true;
    }
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }
}