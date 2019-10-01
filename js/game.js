class Game {
	constructor(ctx){
		this.ctx = ctx;
		this.intervalId = null;
    this.tick = 0

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

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, 1000 / 60)
  }

	clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)   
  }

	draw() {
		return true
  }

	move(){
		return true
	}

}