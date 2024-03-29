class Target {
  constructor(ctx) {
    this.ctx = ctx; 

    this.w = 170;
    this.h = 170;

    this.x = this.ctx.canvas.width + this.w
    this.y = Math.random() * (320 - 550 ) + 570;

    this.vx = -0.4;

    this.img = new Image();
    this.img.src = "./img/zombie_sprite2.png";

    this.img.frames = 6;
    this.img.width = 1162;
    this.img.height = 374;
    this.img.frameIndex = 0;
    this.img.rows = 2;
    this.cutY = 0;

    this.tick = 0;
    this.hits = 1;

    this.zombieDeath = new Audio('./audios/zombieSmash.mp3');
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

    this.animate();
  }

  move(){
    this.x += this.vx
  }

  animate(){
    if(++this.tick < 20) return
    this.tick = 0;
    if (++this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  collide(chancla) {
    if (
      this.x < chancla.x + chancla.w && this.x + this.w > chancla.x &&
      this.y < chancla.y + chancla.h && this.h + this.y > chancla.y) {

        this.vx = 0;
        this.zombieDeath.play();
        this.cutY = 1;
        chancla.hits--
        return true;
    }
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }

  outOfBoundires(){
    return (this.x >= this.ctx.canvas.width - this.w) * 0.9
  }

}