class Game {
	constructor(ctx){
		this.ctx = ctx;
		this.intervalId = null;
    this.tick = 0;
    this.mouseX;
    this.mouseY;

    this.bg = new Background(ctx)
    this.player = new Player(ctx);

    this.score = 0; //score
    this.target = [] //targets on stage

	}

	//inicializa el juego
	start() {
    this.runAnimationLoop();
    this.eventListeners();
  }

	//animation loop 
	runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw(); 
      this.move();
      this.addTarget();
      this.checkCollisions();
      this.clearTarget();
      this.drawScore();

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
    this.bg.draw()
    this.player.draw();
    this.target.forEach(t => t.draw()); 
  }

	move(){
    this.player.move();
    this.target.forEach(t => t.move());
  }

  checkCollisions(){
    this.target = this.target.filter(t => {
      return !this.player.chanclas.some(c => t.collide(c))
    })
    this.player.chanclas = this.player.chanclas.filter(chancla => {
      return this.target.some(t => chancla.collide(t))
    })
  }

  drawScore() {
    //this.score = this.target.score
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: "+ this.score, 8, 20);
  }

  /////// listeners ---------------------------
  eventListeners(event){
    //mousemove
    this.ctx.canvas.addEventListener('mousemove', (event)=> {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

    //clickdown
    this.ctx.canvas.addEventListener('mousedown', (event)=> {

      //this.mouseUpdate();
    });

    //clickup
    this.ctx.canvas.addEventListener('mouseup', (event)=> {
      //this.shoot()
    });
  }

}