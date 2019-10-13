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
    this.bomb = [] //bonus1

    this.zombieHorde = new Audio('./audios/zombieHorde.mp3');

	}

	//inicializa el juego
	start() {
    this.runAnimationLoop();
    this.eventListeners();
  }

	//animation loop 
	runAnimationLoop() {
    this.intervalId = setInterval(() => {
      this.zombieHorde.play();
      this.clear();
      this.draw(); 
      this.move();
      this.addElments();
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

  addElments(){
    if (this.tick % 100) return 

    //add zombie
    this.target.push(
      new Target(this.ctx)
    )

    if(this.score >= 15 && this.score <= 20){
      this.bomb.push(
        new Bomb(this.ctx)
      )
    }
  }

	clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height) 
  }

	draw() {
    this.bg.draw()
    this.player.draw();
    this.target.forEach(targets => targets.draw());
    this.bomb.forEach(b => b.draw());
  }

	move(){
    this.player.move();
    this.target.forEach(t => t.move());
    this.bomb.forEach(b => b.move());
  }


  checkCollisions(){

    let isChanclaColliding = this.player.chanclas.some(chancla => 
      this.target.some(zombie => zombie.collide(chancla)))
    
    let isZombieColliding = this.target.some(zombie => 
      this.player.chanclas.some(chancla => chancla.collide(zombie)))

    let isBombColliding = this.bomb.some(bomb => 
      this.target.some(zombie => zombie.collide(bomb)))

    
    //desaparece zombie con chancla
    this.target = this.target.filter(t => {
      return !this.player.chanclas.some(c => {
        return t.collide(c)
      })
    })

    //desaparece zombie con bomba
    this.target = this.target.filter(t => {
      return !this.bomb.some(b => {
        return t.collide(b)
      })
    })

    if(isChanclaColliding || isZombieColliding || isBombColliding){
      this.score++;
      this.player.chanclas = this.player.chanclas.filter(c => { c.hits <= 0 })
    }
  }

  //dibujamos el score en pantalla
  drawScore() {
    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillText("Score: "+ this.score, 20, 50);
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
      //console.log(this.mouseX , this.mouseY)
    });
  }
}