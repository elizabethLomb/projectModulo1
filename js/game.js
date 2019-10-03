class Game {
	constructor(ctx){
		this.ctx = ctx;
		this.intervalId = null;
    this.tick = 0;
    this.mouseX;
    this.mouseY;

    //this.hits = 0; //aciertos
    this.target = [] //targets on stage

    this.player = new Player(ctx);
	}

	//inicializa el juego
	start() {
    this.runAnimationLoop();
    this.eventListeners();
  }

	//animation loop 
	runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this.clear()
      this.draw()
      this.move()
      this.addTarget()
      this.checkCollisions()
      this.clearTarget()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, 1000 / 60) 
  }

  clearTarget(){
    this.target = this.target.filter( t => t.isVisible())
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
    this.player.draw();
    this.target.forEach(t => t.draw()); 
  }

	move(){
    this.player.move();
    this.target.forEach(t => t.move());
  }

  checkCollisions(){
    true
  }

  /////// listeners ---------------------------

  mousePosition(e){
    const rect = this.ctx.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  mouseUp(){
    console.log('moving');
  }

  mouseDown(){
    console.log('click');
  }
  
  eventListeners(){
    this.ctx.canvas.addEventListener('mousedown', this.mouseDown, false);
    this.ctx.canvas.addEventListener('mouseup', this.mouseUp, false);
  }

}