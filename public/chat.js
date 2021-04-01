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
    const text = pl.color;

    if (!parent.innerText.includes(pl.color)) {
      const el = document.createElement("li");
      el.id = text;
      el.innerText = `${text}: ${pl.score} points`;
      el.style.color = text;
      parent.appendChild(el);
    } else {
      const el = document.getElementById(text);
      el.innerText = `${text} : ${pl.score} points`;
    }
  });
};
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

//
// socket.on("message", writeEvent);
// socket.on("newPlayer", writePlayers);
// socket.on("askName", askName);

// document
//   .querySelector("#chat-form")
//   .addEventListener("submit", onFormSubmitted);

// document
//   .querySelector("#nameForm")
//   .addEventListener("submit", onFormSubmittedName);
