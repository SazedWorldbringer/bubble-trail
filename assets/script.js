const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colors = ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c", "#d90429"];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60; // the number of pixels around the mouse where the particles will grow

// mouse position
let mouse = {
  x: null,
  y: null,
};
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

// create particle constructor function
function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

// add draw method to particle prototype
Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// add update method to particle prototype
Particle.prototype.update = function () {
  if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;

  // mouse interactivity
  // check if the difference between the mouse coordinate and particle coordinate is between 60 and -60
  // if that's true, and if the particle is smaller than maxSize,
  // then we increase it's size by 3 pixels until it reaches maxSize
  // if the particle is away from the mouse, and it's size is more than the minSize,
  // reduce it's size by 0.1
  // check if the particle size is less than 0(fix: we shouldn't need to specify this)
  if (
    mouse.x - this.x < mouseRadius &&
    mouse.x - this.x > -mouseRadius &&
    mouse.y - this.y < mouseRadius &&
    mouse.y - this.y > -mouseRadius
  ) {
    if (this.size < maxSize) {
      this.size += 3;
    }
  } else if (this.size > minSize) {
    this.size -= 0.1;
  }
  if (this.size < 0) {
    this.size = 0;
  }
  this.draw();
};
