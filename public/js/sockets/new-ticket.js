var label = $("#lblNuevoTicket");

// Connect Scoket to Server
var scoket = io();

// Listening to Back-End
scoket.on("connect", () => {
  console.log("Conneted to Server");
});

scoket.on("disconnect", () => {
  console.log("Disconnected to Server");
});

scoket.on("lastTicket", (data) => {
  label.text(data.last);
});

// Events Front - End

$("button").on("click", () => {
  scoket.emit("nextTicket", null, (ticket) => {
    label.text(ticket);
  });
});

// Send info to Back-End
