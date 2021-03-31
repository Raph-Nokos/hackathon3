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

const players = []

io.on("connection", sock => {
  // cest ici que ca se passe

  io.emit('askName'); // on demande leurs noms aux joueurs

  sock.on("message", text => {
    io.emit("message", text); // io.emit envoie a tous les clients
  });
  sock.on("name", text => {
    io.emit("message", 'Bonjour '+text); // io.emit envoie a tous les clients
    players.push(text);
    io.emit("message", 'Joueurs en cours de partie '+players.join(', '))
  });


  sock.on("positionY", posY => {
    io.emit("positionY", posY);
  });
  sock.on("positionX", posX => {
    io.emit("positionX", posX); 
  });
  sock.on('disconnect', function() {
    io.emit("message", 'Bye bye');  });
});


server.on("error", err => {
  console.error("server error : ", err);
});

server.listen(port, () => {
  console.log(`server is listening on : ${port}`);
});
