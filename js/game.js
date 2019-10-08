class Game {
	constructor(ctx){
		this.ctx = ctx;
		this.intervalId = null;
    this.tick = 0;
    this.mouseX;
    this.mouseY;

    this.bg = new Background(ctx)
    this.player = new Player(ctx);

    this.hits = 0; //aciertos
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
    this.bg.draw()
    this.player.draw();
    this.target.forEach(t => t.draw()); 
  }

	move(){
    this.player.move();
    this.target.forEach(t => t.move());
  }

  checkCollisions(){
    const col = (
      this.target = this.target.filter(targets => {
        return !this.player.chanclas.some(chancla => {
          return targets.collide(chancla) 
        })
      })
    )

    if(col){
      //console.log('hit');
    }

  }

  gameOver() {
    clearInterval(this.intervalId)

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  /////// listeners ---------------------------

  eventListeners(event){
    //mousemove
    this.ctx.canvas.addEventListener('mousemove', (event)=> {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      console.log(this.mouseX, this.mouseY);

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