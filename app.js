const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save-btn");
const chooseBtn = document.getElementById("choose-btn");
const fileInput = document.getElementById("file");
const modeFillBtn = document.getElementById("mode-fill-btn");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const lineWidth = document.getElementById("line-width");
const pencilWidth = document.getElementById("pencil-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isErase = false;
let isPainting = false;
let isFilling = false;
let isChoosing = false;
let isColorFilling = false;
let isPencilResize = false;
let PencilSize = 50;

const onPencilWidthChange = (event) => {
  if (isPencilResize === false) {
    if (event.target.value <= 5) {
      PencilSize = 50 - (5 - event.target.value) * 10;
    } else if (event.target.value >= 6) {
      PencilSize = 50 + (event.target.value - 5) * 10;
    }
  }
};

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
  if (isColorFilling === true) {
    ctx.fill();
  }
  ctx.beginPath();
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

const onModeFillClick = () => {
  if (isColorFilling) {
    isColorFilling = false;
    modeFillBtn.innerText = "⚫️ Put Color";
  } else {
    isColorFilling = true;
    modeFillBtn.innerText = "⚪️ Go Back?";
  }
};

const onModeClick = () => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🩸 Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "💧 Draw";
  }
};

const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const onDestroyBtn = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const onEraserClickBtn = () => {
  ctx.strokeStyle = "white";
  isFilling = false;
  isColorFilling = false;
  modeBtn.innerText = "🩸 Fill";
  modeFillBtn.innerText = "⚫️ Put Color";
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
};

const onChooseModeClick = () => {
  if (isChoosing) {
    isChoosing = false;
    chooseBtn.innerText = "🆃 Stroke";
  } else {
    isChoosing = true;
    chooseBtn.innerText = "𝕋 Text";
  }
};

const onDoubleClick = (event) => {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 5;
    ctx.font = `${PencilSize}px serif`;
    if (isChoosing === true) {
      ctx.strokeText(text, event.offsetX, event.offsetY);
    } else if (isChoosing !== true) {
      ctx.fillText(text, event.offsetX, event.offsetY);
    }
    ctx.restore();
  }
};

const onSaveClick = () => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
};

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
pencilWidth.addEventListener("change", onPencilWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorclick));

modeBtn.addEventListener("click", onModeClick);
modeFillBtn.addEventListener("click", onModeFillClick);
destroyBtn.addEventListener("click", onDestroyBtn);
eraserBtn.addEventListener("click", onEraserClickBtn);
saveBtn.addEventListener("click", onSaveClick);
chooseBtn.addEventListener("click", onChooseModeClick);

fileInput.addEventListener("change", onFileChange);
