class Target {
  constructor(ctx) {
    this.ctx = ctx;

    this.w = 80
    this.h = 80

    this.x = this.ctx.canvas.width + this.w
    this.y = Math.random() * this.ctx.canvas.height - this.h

    this.vx = -3
  }

  draw(){
    this.ctx.fillRect(
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  move(){
    this.x += this.vx
  }

  collide(el) {
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }

  setListeners(){
    document.onkeydown = (e) => {
      if(e.clientX){
        console.log('down');
      }
    }
  }
}