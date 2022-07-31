const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colors = ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c", "#d90429"];
const maxSize = 40;
const minSize = 0;

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
