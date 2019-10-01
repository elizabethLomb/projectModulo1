let isMoving = false;

canvas.addEventListener('mousedown', e => {
  x = e.clientX;
  y = e.clientY;
  isMoving = true;
  console.log(`x: ${x}, y: ${y}`)
});