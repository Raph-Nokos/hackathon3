const socketio = require("socket.io")

module.exports = function (server) {
	// io server
	const io = socketio(server)

	// game state (players list)
	const players = {}

	io.on("connection", function (socket) {
		// register new player
		players[socket.id] = {
			x: 0,
			y: 0,
			size: 30,
			speed: 2,
			color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
		}

		// PLAYERS MOOVES
		socket.on("move left", function () {
			players[socket.id].x -= players[socket.id].speed
		})
		socket.on("move up", function () {
			players[socket.id].y -= players[socket.id].speed
		})
		socket.on("move right", function () {
			players[socket.id].x += players[socket.id].speed
		})
		socket.on("move down", function () {
			players[socket.id].y += players[socket.id].speed
		})
		socket.on("position", function () {
			console.log(`players[socket.id].x, players[socket.id].y`)
		})
		// PLAYER ACTIONS

		// delete disconnected player
		socket.on("disconnect", function () {
			delete players[socket.id]
		})
		function update() {
			io.emit("players list", Object.values(players))
		}

		setInterval(update, 1000 / 60)
	})
}
