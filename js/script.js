window.onload = function() {

  const ctx = document.getElementById('canvas').getContext('2d')

  function startGame() {
    const game = new Game(ctx)
    game.start()
  }
  startGame();
}