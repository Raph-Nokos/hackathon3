// const writeEvent = (text, player) => {
//   // <ul> elem
//   const parent = document.querySelector("#events");
//   // <li> elem
//   const el = document.createElement("li");
//   el.innerHTML = `${player.name ? player.name : "incognito"}: ${text}`;
//   parent.appendChild(el);
//   parent.scrollTop = parent.scrollHeight;
// };

// const writePlayers = player => {
//   // <ul> elem
//   const parent = document.querySelector("#listPlayers");

//   // <li> elem
//   const el = document.createElement("li");

//   el.innerText = `${player.name ? player.name : "incognito"}`;
//   parent.appendChild(el);
//   parent.scrollTop = parent.scrollHeight;
// };

// const onFormSubmitted = e => {
//   e.preventDefault();
//   const input = document.querySelector("#chat");
//   const text = input.value;
//   input.value = "";
//   socket.emit("message", text);
// };

// const onFormSubmittedName = e => {
//   e.preventDefault();
//   const input = document.querySelector("#userName");
//   const text = input.value;
//   input.value = "";
//   socket.emit("name", text);
//   document.getElementById("askname").style.display = "none";
// };

// const askName = () => {
//   document.getElementById("askname").style.display = "block";
// };

// const socket = io();
// socket.on("message", writeEvent);
// socket.on("newPlayer", writePlayers);
// socket.on("askName", askName);

// document
//   .querySelector("#chat-form")
//   .addEventListener("submit", onFormSubmitted);

// document
//   .querySelector("#nameForm")
//   .addEventListener("submit", onFormSubmittedName);