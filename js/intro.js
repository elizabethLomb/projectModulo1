const SPACE_KEY = 32

class Intro {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0;

    this.vy = 1.1;
    this.y = 600;

    this.startGame = new Game(ctx);

    //img fondo
    this.imgBg = new Image();
    this.imgBg.src = "./img/introBg.jpg"

    //img txt
    this.imgTxt = new Image();
    this.imgTxt.src = "./img/txtIntro.png"

    //audio bg
    this.audioIntro = new Audio('./audios/musicaSuspenso.mp3');
  }

  start(){
    this.audioIntro.play();
    this.runAnimationLoop();
    this.eventListeners();
  }

  runAnimationLoop(){
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw(); 
      this.move();
      this.drawPlay();

      if (this.tick++ > 10000) {
        this.tick = 0
      } 
    }, 1000 / 60) 
  }

  clear(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height) 
  }

  draw() { 
    this.ctx.drawImage(
      this.imgBg,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
 
    this.ctx.drawImage(
      this.imgTxt,
      this.ctx.canvas.width / 2 - 1100,
      this.y,
      2000,
      1570
    )
  }

  move(){
    this.y -= this.vy
  }

  drawPlay() {
    if(this.y < -1300){
      this.ctx.font = "40px Consolas";
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillText("PRESS SPACE TO PLAY", this.ctx.canvas.width / 2 - 200, this.ctx.canvas.height / 2);
    }
  }

  eventListeners(event){
    document.onkeydown = (event) => {
      if (event.keyCode === SPACE_KEY){
        this.startGame.start()
        clearInterval(this.intervalId)
        this.audioIntro.pause();
      }
    }
  }
}