const writeEvent = text => {
  // <ul> elem
  const parent = document.querySelector("#events");

  // <li> elem
  const el = document.createElement("li");
  el.innerHTML = text;

  parent.appendChild(el);
  parent.scrollTop = parent.scrollHeight;
};

const onFormSubmitted = e => {
  e.preventDefault();
  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";
  sock.emit("message", text);
};

const onFormSubmittedName = e => {
  e.preventDefault();
  const input = document.querySelector("#userName");
  const text = input.value;
  input.value = "";
  sock.emit("name", text);
  document.getElementById("askname").style.display = 'none';

};

const askName =()=>{
  document.getElementById("askname").style.display = 'block';
}

const updateY = (pos) =>{
  myGamePiece.y=pos
}
const updateX = (pos) =>{
  myGamePiece.x=pos
}
const sock = io();
sock.on("message", writeEvent);
sock.on("askName",askName)
sock.on("positionX",updateX)
sock.on("positionY",updateY)

document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);

document
  .querySelector("#nameForm")
  .addEventListener("submit", onFormSubmittedName);

