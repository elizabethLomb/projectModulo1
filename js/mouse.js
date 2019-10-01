let isClicking = false;

canvas.addEventListener('mousedown', e => {
  x = e.clientX;
  y = e.clientY;
  isClicking = true;
  console.log(`x: ${x}, y: ${y}`)
});