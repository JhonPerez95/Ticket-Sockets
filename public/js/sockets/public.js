// Connect Scoket to Server
var scoket = io();

// Listening to Back-End
scoket.on("connect", () => {
  console.log("Conneted to Server");
});

scoket.on("disconnect", () => {
  console.log("Disconnected to Server");
});

scoket.on("last4", (res) => {
  var audio = new Audio("audio/new-ticket.mp3");
  audio.play();
  updateHtml(res.last4);
});

// Front - End
var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var tickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var desk = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

function updateHtml(last4) {
  for (let i = 0; i < last4.length; i++) {
    tickets[i].text("Ticket " + last4[i].number);
    desk[i].text("Escritorio" + last4[i].desk);
  }
}
