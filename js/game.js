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

    if(this.scrore >= 1){
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

    let isCollided = (
      this.player.chanclas.some(chancla => this.target.some(
        target => target.collide(chancla)))

      ||

      this.target.some(target => this.player.chanclas.some(
        chancla => chancla.collide(target)))

      ||

      this.bomb.some(target => this.target.some(
        bomb => bomb.collide(target)))
    )

    if(isCollided){
      this.score++;
      
      // this.target = this.target.filter(t => {
      //   return !this.player.chanclas.some(c => {
      //     return t.collide(c);
      //   })
      // })

      this.player.chanclas = this.player.chanclas.filter(c => {
        return !this.target.some(t => {
          return c.collide(t)
        })
      })

      this.bomb = this.bomb.filter(b => {
        return !this.target.some(t => {
          return b.collide(t);
        })
      })

    }


    // let isChanclaColliding = this.player.chanclas.some(chancla =>
    //   this.target.some(target => target.collide(chancla)))

    // if(isChanclaColliding){
    //   this.player.chanclas = this.player.chanclas.filter(c => {
    //     c.hits <= 0;
    //   })
    // }

    // //Si algun zombie choca con chancla
    // let isZombieColliding = this.player.chanclas.some(chancla => 
    //   this.target.some(target => target.collide(chancla)))

    // //si alguna chancla choca
    // let isChanclaColliding = this.target.some(target => //eachZombie
    //   this.player.chanclas.some(chancla => chancla.collide(target))) //eachChancla

    // //si alguna bomba choca
    // let isBombColliding = this.bomb.some(bomb => 
    //   this.target.some(target => target.collide(bomb)))

    // if(isZombieColliding || isChanclaColliding || isBombColliding){
    //   


      //devuelve la chancla que colisiona y la borra
      // this.player.chanclas = this.player.chanclas.filter(c => {
      //   c.hits <= 0;
      // })

      // this.bomb = this.bomb.filter(b => {
      //   b.hits <= 0;
      // })

    
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