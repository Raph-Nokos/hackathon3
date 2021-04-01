const socketio = require("socket.io");

module.exports = function (server) {
  // io server
  const io = socketio(server);

  // game state (players list)
  const players = {};
  let bullets = [];

  io.on("connection", function (socket) {
    players[socket.id] = {
      x: 0,
      y: 0,
      size: 30,
      speed: 2,
      color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      score: 0,
      name: "",
      id: socket.id
    };

    // CHAT PART

    socket.emit("askName"); // on demande leurs noms aux joueurs

    socket.on("name", name => {
      players[socket.id].name = name;
      console.log(players[socket.id]);
    });

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

    // PLAYER ACTIONS
    socket.on("mousedown", (x, y) => {
      const angle = Math.atan2(
        x - players[socket.id].x,
        y - players[socket.id].y
      );
      bullets.push({
        shooterId: socket.id,
        x: players[socket.id].x + players[socket.id].size / 2 - 5,
        y: players[socket.id].y + players[socket.id].size / 2 - 5,
        velocityX: Math.sin(angle) * 2,
        velocityY: Math.cos(angle) * 2,
        size: 10,
        color: players[socket.id].color,
        collisioned: false
      });
    });

    // delete disconnected player
    socket.on("disconnect", function () {
      console.log("user disconnected");
      delete players[socket.id];
    });
    function update() {
      // bullets move : calculate new position
      bullets.forEach(bullet => {
        bullet.x += bullet.velocityX;
        bullet.y += bullet.velocityY;
      });
      //detect collisions
      for (let i = 0; i < bullets.length; i++) {
        for (const id in players) {
          if (Object.hasOwnProperty.call(players, id)) {
            if (
              id !== bullets[i].shooterId &&
              bullets[i].x > players[id].x &&
              bullets[i].x < players[id].x + players[id].size &&
              bullets[i].y > players[id].y &&
              bullets[i].y < players[id].y + players[id].size
            ) {
              players[bullets[i].shooterId].score += 20;
              players[id].score -= 10;
              bullets[i].collisioned = true;
            }
          }
        }
      }
      //remove collisionned bullets
      // update player scores

      // delete bullets out of map
      bullets = bullets.filter(
        bullet =>
          !bullet.collisioned &&
          bullet.x >= 0 &&
          bullet.y >= 0 &&
          bullet.x < 2000 &&
          bullet.y < 2000
      );

      io.emit("lists", Object.values(players), Object.values(bullets));
    }

    setInterval(update, 1000 / 60);
  });
};
