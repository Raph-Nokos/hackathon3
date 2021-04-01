const e = require("express");

const socket = io();

let players = [];
let bullets = [];

const ctx = canvas.getContext("2d");

function drawPlayers() {
  players.forEach(function ({ x, y, size, color }) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.fill();
  });
}
function drawBullets() {
  bullets.forEach(function ({ x, y, size, color }) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.fill();
  });
}
socket.on("lists", function (listPlayers, listBullets) {
  players = listPlayers;
  bullets = listBullets;
});
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 1.
  movePlayer();
  drawPlayers(); // 2.
  drawBullets();
  requestAnimationFrame(update); // 3.
}
// first call
requestAnimationFrame(update);
// PLAYER MOOVES
const keyboard = {};

window.onkeydown = function (e) {
  keyboard[e.keyCode] = true;
};

window.onkeyup = function (e) {
  delete keyboard[e.keyCode];
};

function movePlayer() {
  if (keyboard[37]) {
    socket.emit("move left");
    socket.emit("position");
  }
  if (keyboard[38]) {
    socket.emit("move up");
    socket.emit("position");
  }
  if (keyboard[39]) {
    socket.emit("move right");
    socket.emit("position");
  }
  if (keyboard[40]) {
    socket.emit("move down");
    socket.emit("position");
  }
}

// PLAYER ACTIONS

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

canvas.addEventListener(
  "mousedown",
  function (evt) {
    var mousePos = getMousePos(canvas, evt);
    socket.emit("mousedown", mousePos.x, mousePos.y);
  },
  false,
);
