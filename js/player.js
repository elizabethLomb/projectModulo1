class Player {
  constructor (ctx, x, y) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0.75 * this.ctx.canvas.height;

    this.w = 160;
    this.h = 190;

    this.dx;
    this.dy;

    this.vx = 0;

    this.img = new Image();
    this.img.src = "./img/character.png";
    this.img.frames = 5
    this.img.frameIndex = 0

    this.tick = 0;

    this.setListeners()

    this.chanclas = []
    this.chanclaShoot = false;
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
    this.chanclas.forEach(chancla => chancla.draw())
  }

  move(){
    this.x += this.vx;
    this.chanclas.forEach(c => c.move())
  }

  animate(){
    if(this.tick++ < 8) return

    this.tick = 0;
    if (this.chanclaShoot) {
      this.img.frameIndex++
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
      this.chanclaShoot = false;
    }
  }

  shoot(event){
    this.chanclaShoot = true;
    setTimeout(() => {
      this.chanclas.push(
        new Chancla(
          this.ctx,
          this.x + this.w,
          this.y + this.h / 2,
          event.clientX, event.clientY
        )
      )
    }, 500);
  }

  clearChanclas() {
    this.chanclas = this.chanclas.filter(chancla => chancla.isVisible())
  }

  collide(el) {
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }

  setListeners(){
    //mousemove
    this.ctx.canvas.addEventListener('mousemove', (e)=> {
      // let mousecoords = this.mousePos(e);
    });

    //clickdown
    this.ctx.canvas.addEventListener('mousedown', (e)=> {
      this.shoot(e);
      //this.mouseUpdate();
    });

    //clickup
    this.ctx.canvas.addEventListener('mouseup', (e)=> {
      //this.shoot()
    });
  }


}