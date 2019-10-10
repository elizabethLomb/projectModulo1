window.onload = function() {

  const ctx = document.getElementById('canvas').getContext('2d')

  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  function startGame() {
    const game = new Game(ctx)
    game.start();
  }
  startGame();
} 