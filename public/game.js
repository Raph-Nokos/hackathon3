const socket = io();

let players = [];
let bullets = [];

const ctx = canvas.getContext("2d");

function drawPlayers() {
  players.forEach(function ({ x, y, size, color, name }) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = color;
    ctx.font = "14px sans-serif";
    ctx.fillText(name, x, y - 5);
    ctx.fill();
    let image = document.getElementById('poulet');
    ctx.drawImage(image, x, y, 50, 50)  
  });
}
function drawBullets() {
  bullets.forEach(function ({ x, y, size, color }) {
    ctx.beginPath();
    // ctx.rect(x, y, size, size);
    // // ctx.arc(x, y, size, 0, 2 * Math.PI);
    // ctx.fillStyle = color;
    
    let image = document.getElementById('fried-chicken');
    ctx.drawImage(image, x, y, size, size)
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
