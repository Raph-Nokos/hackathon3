const socket = io();

let players = [];
let bullets = [];

const ctx = canvas.getContext("2d");

const audioJet = new Audio(`sounds/jet.mp3`);
const audioColision = new Audio(`sounds/colision.mp3`);

let audioMusic = document.getElementById("music");
audioMusic.loop = true;
audioMusic.volume = 0.2;
audioMusic.mute = false;

const enableMute = () => {
  audioMusic.muted = !audioMusic.muted;
  audioJet.muted = !audioJet.muted;
  document.getElementById("mute").innerHTML}

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
    // ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    audioJet.play();
  });
}
socket.on("lists", function (listPlayers, listBullets) {
  // if (listPlayers.length != players.length)
  writePlayers(listPlayers);
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
  }
  if (keyboard[38]) {
    socket.emit("move up");
  }
  if (keyboard[39]) {
    socket.emit("move right");
  }
  if (keyboard[40]) {
    socket.emit("move down");
  }
}

// PLAYER ACTIONS

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener(
  "mousedown",
  function (evt) {
    const mousePos = getMousePos(canvas, evt);
    socket.emit("mousedown", mousePos.x, mousePos.y);
  },
  false
);
