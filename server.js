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

io.on("connection", sock => {
  // cest ici que ca se passe

  sock.on("message", text => {
    io.emit("message", text); // io.emit envoie a tous les clients
  });
});
server.on("error", err => {
  console.error("server error : ", err);
});

server.listen(port, () => {
  console.log(`server is listening on : ${port}`);
});
