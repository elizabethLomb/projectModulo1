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

    this.zombieHorde = new Audio('./audios/zombieHorde.mp3');

	}

	//inicializa el juego
	start() {
    this.runAnimationLoop();
    this.eventListeners();
    this.zombieHorde.play();
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
      //this.drawScore();

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
    this.target.forEach(targets => targets.draw()); 
  }

	move(){
    this.player.move();
    this.target.forEach(t => t.move());
  }

  checkCollisions(){

    let isZombieColliding = this.player.chanclas.some(chancla => 
      this.target.some(target => target.collide(chancla)))

    let isChanclaColliding = this.target.some(targets => 
      this.player.chanclas.some(chanclas => chanclas.collide(targets)))

    //console.log(isChanclaColliding);

    if(isZombieColliding || isChanclaColliding){
      //elimina chanclas
      this.player.chanclas = this.player.chanclas.filter(c => {
        c.hits <= 0;
      })
      
      //elimina zombies
      // this.target = this.target.filter(t => {
      //   t.hits <= 0
      // })

    }
    
  }

  drawScore() {
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

      //console.log(this.mouseX , this.mouseY)
    });
  }
}