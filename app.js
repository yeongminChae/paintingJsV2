const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
];

ctx.lineWidth = 2;
let x_coordinate = 0;
let y_coordinate = 0;

const onMouseClick = (event) => {
  ctx.beginPath();
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.moveTo(x_coordinate, y_coordinate);
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

const onMoveClick = (event) => {
  ctx.beginPath();
  const color = colors[Math.floor(Math.random() * colors.length)];
  x_coordinate = event.offsetX;
  y_coordinate = event.offsetY;
  ctx.moveTo(x_coordinate, y_coordinate);
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

canvas.addEventListener("mousemove", onMouseClick);
canvas.addEventListener("click", onMoveClick);
