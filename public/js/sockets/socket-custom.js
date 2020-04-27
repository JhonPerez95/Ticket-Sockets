var socket = io();

// Listend
socket.on("connect", () => {
  console.log("Conneted to Server");
});

socket.on("disconnect", () => {
  console.log("Disconnected to Server");
});

socket.on("sendMessage", (message) => {
  console.log("Server: ", message);
});

// Send informations
socket.emit(
  "sendMessage",
  {
    user: "JhonDev",
    message: "Hola mundo",
  },
  (res) => {
    console.log("Server: ", res);
  }
);
