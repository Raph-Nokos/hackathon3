// const writeEvent = (text, player) => {
//   // <ul> elem
//   const parent = document.querySelector("#events");
//   // <li> elem
//   const el = document.createElement("li");
//   el.innerHTML = `${player.name ? player.name : "incognito"}: ${text}`;
//   parent.appendChild(el);
//   parent.scrollTop = parent.scrollHeight;
// };

const writePlayers = players => {
  const parent = document.querySelector("#listPlayers");

  players.forEach(pl => {
    const color = pl.color;

    if (!Array.from(parent.children).some(e => e.id === pl.color)) {
      const el = document.createElement("li");
      el.id = color;
      el.innerText = `${pl.name}: ${pl.score} points`;
      el.style.color = color;
      parent.appendChild(el);
    } else {
      const el = document.getElementById(color);
      el.innerText = `${pl.name} : ${pl.score} points`;
    }
  });
};

const askName = () => {
  let name = prompt("whats your name ?");
  socket.emit("name", name);
};

socket.on("askName", askName);

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

//
// socket.on("message", writeEvent);
// socket.on("newPlayer", writePlayers);

// document
//   .querySelector("#chat-form")
//   .addEventListener("submit", onFormSubmitted);

// document
//   .querySelector("#nameForm")
//   .addEventListener("submit", onFormSubmittedName);
