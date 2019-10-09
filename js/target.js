class Target {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = this.ctx.canvas.width + this.w
    this.y = Math.random() * (800 - 570 ) + 570;

    //esto está bien?????
    this.vx = Math.random() * ((-6) - (-1) +1)
    //this.vx = -2;

    this.img = new Image();
    this.img.src = "./img/zombie_sprite2.png";

    // this.w = 170;
    // this.h = 170;


    this.img.frames = 8;
    this.img.width = 1550;
    this.img.height = 374;
    this.img.frameIndex = 0;
    this.img.rows = 2;
    this.cutY = 0;
    this.w = this.img.width / this.img.frames;
    this.h = this.img.height / this.img.rows;

    this.tick = 0;

    this.hits = 0;
    this.currentHits = this.hits;

    this.score = 0;
    
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

    if(this.hits > 0){
      this.cutY = 1;
      this.vx = 0;
      console.log('tengo que cambiar img');
    }
  }

  collide(el) {
    if (this.x < el.x + el.w && this.x + this.w > el.x &&
      this.y < el.y + el.h && this.h + this.y > el.y) {

      this.currentHits++; //para cambiar img
      console.log(`collide zombie`);
      return true;
    }
  }

  isVisible() {
    return (
      this.x + this.w > 0
    )
  }

}