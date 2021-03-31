const socket = io();

let players = [];

const ctx = canvas.getContext("2d");

function drawPlayers() {
  players.forEach(function ({ x, y, size, c }) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = c;
    ctx.fill();
  });
}
socket.on("players list", function (list) {
  players = list;
});
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 1.
  movePlayer();
  drawPlayers(); // 2.
  requestAnimationFrame(update); // 3.
}
// first call
requestAnimationFrame(update);

const keyboard = {};

window.onkeydown = function (e) {
  keyboard[e.keyCode] = true;
};

window.onkeyup = function (e) {
  delete keyboard[e.keyCode];
};

function movePlayer() {
  if (keyboard[37]) socket.emit("move left");
  if (keyboard[38]) socket.emit("move up");
  if (keyboard[39]) socket.emit("move right");
  if (keyboard[40]) socket.emit("move down");
}
