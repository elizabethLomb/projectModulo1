class Game {
	constructor(ctx){
		this.ctx = ctx;
		this.intervalId = null;
    this.tick = 0

    //this.target = new Target(ctx)
    this.target = []
	}

	//inicializa el juego
	start() {
    this.runAnimationLoop()
  }

	//animation loop
	runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this.clear()
      this.draw()
      this.move()
      this.addTarget()
      this.clearTarget()
      this.checkClick()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, 1000 / 60)
  }

  clearTarget(){
    this.target = this.target.filter(t => {
      return t.y + t.h >= 0
    })
  }

  addTarget(){
    if (this.tick % 100) return 

    this.target.push(
      new Target(this.ctx)
    )
  }

	clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)   
  }

	draw() {
    this.target.forEach(t => t.draw()); 
  }

	move(){
    this.target.forEach(t => t.move());
  }
  
  checkClick(){
    // const col = this.target.some(t => {
    //   return t.collide(this.mouse)
    // })
  }

}