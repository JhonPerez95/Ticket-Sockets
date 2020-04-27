// Connect Scoket to Server
var scoket = io();

// Listening to Back-End
scoket.on("connect", () => {
  console.log("Conneted to Server");
});

scoket.on("disconnect", () => {
  console.log("Disconnected to Server");
});

// Events Front - End
var label = $("small");

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location("index.html");
  throw new Error("EThe desk is necessary");
}

var desk = searchParams.get("escritorio");
$("h1").text("Escritorio " + desk);

$("button").on("click", () => {
  scoket.emit("attendTicket", { desk: desk }, (res) => {
    if (res.ok === false) {
      alert("There  aren't Tickets to Attend");
      $("h4").text(res.message);
    } else {
      $("h4").text("Atendiendo al Ticket: " + res.number);
    }
  });
});

// Send info to Back-End
