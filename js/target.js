class Target {
  constructor(ctx) {
    this.ctx = ctx;

    this.w = 80
    this.h = 80

    this.x = this.ctx.canvas.width + this.w
    this.y = Math.random() * this.ctx.canvas.height - this.h

    this.vx = -5
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