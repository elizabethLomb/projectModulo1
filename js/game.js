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
      //this.zombieHorde.play();
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

    this.bomb.push(
      new Bomb(this.ctx)
    )
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
    //Si algun zombie choca con chancla
    let isZombieColliding = this.player.chanclas.some(chancla => 
      this.target.some(target => target.collide(chancla)))

    //si alguna chancla choca
    let isChanclaColliding = this.target.some(target => //eachZombie
      this.player.chanclas.some(chancla => chancla.collide(target))) //eachChancla

    //si alguna bomba choca
    

    if(isZombieColliding || isChanclaColliding){
      this.score++;

      //devuelve la chancla que colisiona y la borra
      this.player.chanclas = this.player.chanclas.filter(c => {
        c.hits <= 0;
      })

      //regresa los que no han colisionado
      // this.target = this.target.filter(target => {
      //   return !this.player.chanclas.some(chancla => chancla.collide(target))
      // })
    }
  }

  drawScore() {
    this.ctx.font = "32px Arial";
    this.ctx.fillStyle = "#00000";
    this.ctx.fillText("Score: "+ this.score, 20, 50);
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