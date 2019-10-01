window.onload = function() {

  const ctx = document.getElementById('canvas').getContext('2d')

  function startGame() {
    const game = new Game(ctx)
    game.start()
    // canvas.addEventListener('click', mouseClick, false);
  }
  startGame();

  // function mouseClick(e) {
  //   var targ;
  //   if (!e) {
  //     var e = window.event;
  //   }
  //   if (e.target) {
  //     targ = e.target;
  //   } else if (e.srcElement) {
  //     targ = e.srcElement;
  //   }
  //   var tname;
  //   tname = targ.tagName;
  //   alert("You clicked on a " + tname + " element.");  
  // }
}