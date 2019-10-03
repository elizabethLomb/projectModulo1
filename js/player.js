const SPACE_KEY = 32

class Player {
  constructor (ctx, x, y) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0.75 * this.ctx.canvas.height;

    this.w = 48;
    this.h = 55;

    this.vx = 0;

    this.img = new Image();
    this.img.src = "./img/character.png";
    this.img.frames = 5
    this.img.frameIndex = 0

    this.tick = 0;

    this.setListeners()

    this.chanclas = []
  }

  draw(){
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / 5,
      0,
      this.img.width / 5,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animate();
    this.chanclas.forEach(c => c.draw())
  }

  move(){
    this.x += this.vx;
    this.chanclas.forEach(c => c.move())
  }

  animate(){
    if(this.tick++ < 8) return

    this.tick = 0
    if (++this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  shoot(){
    this.chanclas.push(
      new Chancla(
        this.ctx,
        this.x + this.w,
        this.y + this.h / 2
      )
    )
  }

  clearChanclas() {
    this.chanclas = this.chanclas.filter(c => c.isVisible())
  }

  setListeners(){

    //clickdown
    this.ctx.canvas.addEventListener('mousedown', (e)=> {
      this.shoot()
    });

    //clickup
    this.ctx.canvas.addEventListener('mouseup', (e)=> {
      //this.shoot()
    });


  }


}