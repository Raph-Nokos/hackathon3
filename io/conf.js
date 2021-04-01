const socketio = require("socket.io");

module.exports = function (server) {
  // io server
  const io = socketio(server);

  // game state (players list)
  const players = {};
  let bullets = [];

  io.on("connection", function (socket) {
    // register new player
    players[socket.id] = {
      x: 0,
      y: 0,
      size: 30,
      speed: 2,
      color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
    };

    // CHAT PART

    // socket.emit("askName"); // on demande leurs noms aux joueurs

    // socket.on("message", text => {
    //   io.emit("message", text, players[socket.id]); // io.emit envoie a tous les clients
    // });
    // socket.on("name", text => {
    //   players[socket.id].name = text;
    //   console.log(players[sock.id]);
    //   io.emit("message", "Bonjour " + text, players[socket.id]); // io.emit envoie a tous les clients
    // });

    // PLAYERS MOOVES
    socket.on("move left", function () {
      if (players[socket.id].x >= 2)
        players[socket.id].x -= players[socket.id].speed;
    });
    socket.on("move up", function () {
      if (players[socket.id].y >= 2)
        players[socket.id].y -= players[socket.id].speed;
    });
    socket.on("move right", function () {
      if (players[socket.id].x <= 910) {
        players[socket.id].x += players[socket.id].speed;
      }
    });
    socket.on("move down", function () {
      if (players[socket.id].y <= 648)
        players[socket.id].y += players[socket.id].speed;
    });
    socket.on("position", function () {
      // console.log(`${players[socket.id].x}, ${players[socket.id].y}`);
    });
    // PLAYER ACTIONS
    socket.on("mousedown", (x, y) => {
      const angle = Math.atan2(
        x - players[socket.id].x,
        y - players[socket.id].y,
      );
      bullets.push({
        shooterId: players[socket.id],
        x: players[socket.id].x,
        y: players[socket.id].y,
        velocityX: Math.sin(angle) * 2,
        velocityY: Math.cos(angle) * 2,
        size: 10,
        color: players[socket.id].color,
      });
    });

    // delete disconnected player
    socket.on("disconnect", function () {
      console.log("user disconnected");
      delete players[socket.id];
    });
    function update() {
      // bullets move : calculate new position
      bullets.forEach((bullet) => {
        bullet.x += bullet.velocityX;
        bullet.y += bullet.velocityY;
      });
      // delete bullets out of map
      bullets = bullets.filter(
        (bullet) =>
          bullet.x >= 0 && bullet.y >= 0 && bullet.x < 2000 && bullet.y < 2000,
      );
      io.emit("lists", Object.values(players), Object.values(bullets));
    }

    setInterval(update, 1000 / 60);
  });
};
