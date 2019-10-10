class Target {
  constructor(ctx) {
    this.ctx = ctx;

    this.w = 170;
    this.h = 170;

    this.x = this.ctx.canvas.width + this.w
    this.y = Math.random() * (700 - 670 ) + 570;

    this.vx = -0.5;

    this.img = new Image();
    this.img.src = "./img/zombie_sprite2.png";

    this.img.frames = 6;
    this.img.width = 1162;
    this.img.height = 374;
    this.img.frameIndex = 0;
    this.img.rows = 2;
    this.cutY = 0;

    this.tick = 0;

    this.zombieDeath = new Audio('./audios/zombieSmash.mp3');
  }

  draw() {
    this.ctx.drawImage(
      this.img,//image
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames), //sx
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
    if(++this.tick < 20) return
    this.tick = 0;
    if (++this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  collide(el) {
    if (
      this.x < el.x + el.w && this.x + this.w > el.x &&
      this.y < el.y + el.h && this.h + this.y > el.y) {

        this.vx = 0;
        this.zombieDeath.play();
        this.cutY = 1;
        el.hits--
        return true;
    }
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }

}