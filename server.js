const port = process.env.PORT || 8080;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Path = require("path");
//const game = require('./game');

const app = express();

app.use(express.static(Path.join(__dirname, "client")));
const server = http.createServer(app);
const io = socketio(server);

let players = {}
io.on("connection", sock => {
  // cest ici que ca se passe

// create a new player and add it to our players object
players[sock.id] = {
  rotation: 0,
  x: Math.floor(Math.random() * 100) + 50,
  y: Math.floor(Math.random() * 100) + 50,
  playerId: sock.id,
};
// send the players object to all players
//io.emit('currentPlayers', players);
// update all  players of the new player
io.emit('newPlayer', players[sock.id]);


// when a player disconnects, remove them from our players object
sock.on('disconnect', function () {
  console.log('user disconnected');
  // remove this player from our players object
  delete players[sock.id];
  // emit a message to all players to remove this player
 // io.emit('disconnect', sock.id);
});


  sock.emit('askName'); // on demande leurs noms aux joueurs

  sock.on("message", text => {
    io.emit("message", text,players[sock.id]); // io.emit envoie a tous les clients
  });
  sock.on("name", text => {
    players[sock.id].name=text;
    console.log(players[sock.id])
    io.emit("message", 'Bonjour '+text, players[sock.id]); // io.emit envoie a tous les clients
  });

  sock.on("positionY", posY => {
    io.emit("positionY", posY);
  });
  sock.on("positionX", posX => {
    io.emit("positionX", posX); 
  });


});


server.on("error", err => {
  console.error("server error : ", err);
});

server.listen(port, () => {
  console.log(`server is listening on : ${port}`);
});
