const modeBtn = document.getElementById("mode-btn");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

const onMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
};

const startPainting = () => {
  isPainting = true;
};

const cancelPainting = () => {
  isPainting = false;
};

const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};

const onColorChange = (event) => {
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value;
};

const onColorclick = (event) => {
  const colorValue = event.target.dataset.color;
  ctx.fillStyle = colorValue;
  ctx.strokeStyle = colorValue;
  color.value = colorValue;
};

const onModeClick = () => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
};

const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
};

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorclick));

modeBtn.addEventListener("click", onModeClick);
