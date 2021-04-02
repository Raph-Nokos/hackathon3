const socket = io()

let players = []
let bullets = []
let dead = false

const ctx = canvas.getContext("2d")

const audioJet = new Audio(`sounds/jet.mp3`)
audioJet.muted = false

const audioColision = new Audio(`sounds/colision.mp3`)
audioColision.muted = false
audioColision.volume = 0.1

const audioMusic = new Audio(`sounds/musicCountry.mp3`)
audioMusic.loop = true
audioMusic.volume = 0.2
audioMusic.muted = false

const enableMute = () => {
	audioMusic.muted = !audioMusic.muted
	audioColision.muted = !audioColision.muted
	audioJet.muted = !audioJet.muted
  document.getElementById("mute").innerHTML = !audioMusic.muted
  ? "<img src='./img/mute.svg' ></img>"
  : "<img src='./img/volume.svg'></img>";
}

const imgVolume = () => {
  if(audioMusic.muted = true){
    document.getElementById("mute").style.src='./img/mute.svg'; 
  } else{
    document.getElementById("volume").style.src='./img/volume.svg'
  }
}

function drawPlayers() {
	players.forEach(function ({ x, y, size, color, name, hpMax, hp, dead }) {
		// LIFE BAR MAX HP
		ctx.beginPath()
		ctx.rect(x, y + 60, hpMax, 10)
		ctx.fillStyle = "red"
		ctx.fill()
		// LIFE BAR ACTUAL HP
		ctx.beginPath()
		ctx.rect(x, y + 60, hp, 10)
		ctx.fillStyle = "green"
		ctx.fill()
		// HITBOX PLAYER
		ctx.beginPath()
		ctx.rect(x, y, size, size)
		ctx.fillStyle = color
		ctx.font = "14px sans-serif"
		ctx.fillText(name, x, y - 5)
		ctx.fill()
		if (dead) {
			let image = document.getElementById("chick-dead")
			ctx.drawImage(image, x, y, 50, 50)
		} else {
			let image = document.getElementById("poulet")
			ctx.drawImage(image, x, y, 50, 50)
		}
	})
}

function drawBullets() {
	bullets.forEach(function ({ x, y, size, color }) {
		ctx.beginPath()
		let image = document.getElementById("fried-chicken")
		ctx.drawImage(image, x, y, size, size)
		ctx.fill()
	})
}
const drawGameOver = () => {
	ctx.font = "64px  Alice"
	ctx.fillText("GAME OVER", 470 / 2, 340 / 2)
}

socket.on("lists", function (listPlayers, listBullets) {
	// if (listPlayers.length != players.length)
	writePlayers(listPlayers)
	players = listPlayers
	bullets = listBullets
})
function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height) // 1.
	movePlayer()
	drawPlayers() // 2.
	drawBullets()
	if (dead) drawGameOver()
	requestAnimationFrame(update) // 3.
}
// first call
requestAnimationFrame(update)
// PLAYER MOOVES
const keyboard = {}

window.onkeydown = function (e) {
	keyboard[e.keyCode] = true
}

window.onkeyup = function (e) {
	delete keyboard[e.keyCode]
}

function movePlayer() {
	socket.emit(keyboard[37] ? "move left" : "stop left")
	socket.emit(keyboard[38] ? "move up" : "stop up")
	socket.emit(keyboard[39] ? "move right" : "stop right")
	socket.emit(keyboard[40] ? "move down" : "stop down")
}

// PLAYER ACTIONS

function getMousePos(canvas, evt) {
	const rect = canvas.getBoundingClientRect()
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top,
	}
}

canvas.addEventListener(
	"mousedown",
	function (evt) {
		const mousePos = getMousePos(canvas, evt)
		socket.emit("mousedown", mousePos.x, mousePos.y)
		audioJet.currentTime = 0
		audioJet.play()
		audioMusic.play()
	},
	false
)

socket.on("colision", (x, y) => {
	audioColision.currentTime = 0
	audioColision.play()
})

socket.on("dead", () => {
	dead = true
})



