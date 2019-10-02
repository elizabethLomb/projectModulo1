let isClicking = false;

canvas.addEventListener('mousedown', e => {
  x = e.clientX;
  y = e.clientY;
  isClicking = true;
  console.log(`x: ${x}, y: ${y}`) 
});

/* ----- EVENTS FUNCTIONS  ----- */

Game.prototype.mouseDown = function () {
  if(this.gameOn === true)
  this.player.fire();
}

Game.prototype.mouseMove = function (evt) {
  var mousePos = this.getMousePos(evt);
  this.mouseX = mousePos.x;
  this.mouseY = mousePos.y;
};

Game.prototype.onKeyEvent = function (event) {
  this.player.onKeyEvent(event);
};

Game.prototype.getMousePos = function (evt) {
  var rect = this.canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
};

document.addEventListener('mousemove', this.mouseMove.bind(this));
document.addEventListener('mousedown', this.mouseDown.bind(this));