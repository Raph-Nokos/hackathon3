const socket = io();

let players = [];
let bullets = [];

const ctx = canvas.getContext("2d");

const audioJet = new Audio(`sounds/jet.mp3`);
audioJet.muted = false;

const audioColision = new Audio(`sounds/colision.mp3`);
audioColision.muted = false;

const audioMusic = new Audio(`sounds/musicCountry.mp3`);
audioMusic.loop = true;
audioMusic.volume = 0.2;
audioMusic.muted = false;

const enableMute = () => {
  audioMusic.muted = !audioMusic.muted;
  audioColision.muted = !audioColision.muted;
  audioJet.muted = !audioJet.muted;
};

function drawPlayers() {
  players.forEach(function ({ x, y, size, color, name }) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.font = "14px sans-serif";
    ctx.fillText(name, x, y - 5);
    ctx.fill();
    let image = document.getElementById("poulet");
    ctx.drawImage(image, x, y, 50, 50);
  });
}
function drawBullets() {
  bullets.forEach(function ({ x, y, size, color }) {
    ctx.beginPath();
    // ctx.rect(x, y, size, size);
    // // ctx.arc(x, y, size, 0, 2 * Math.PI);
    // ctx.fillStyle = color;

    let image = document.getElementById("fried-chicken");
    ctx.drawImage(image, x, y, size, size);
    ctx.fill();
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
  socket.emit(keyboard[37] ? "move left" : "stop left");
  socket.emit(keyboard[38] ? "move up" : "stop up");
  socket.emit(keyboard[39] ? "move right" : "stop right");
  socket.emit(keyboard[40] ? "move down" : "stop down");

  // if (keyboard[37]) {
  //   socket.emit("move left");
  // }
  // if (keyboard[38]) {
  //   socket.emit("move up");
  // }
  // if (keyboard[39]) {
  //   socket.emit("move right");
  // }
  // if (keyboard[40]) {
  //   socket.emit("move down");
  // }
}

// PLAYER ACTIONS

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

canvas.addEventListener(
  "mousedown",
  function (evt) {
    const mousePos = getMousePos(canvas, evt);
    socket.emit("mousedown", mousePos.x, mousePos.y);
    audioJet.play();
    audioMusic.play();
  },
  false,
);

socket.on("colision", () => {
  audioColision.play();
});
