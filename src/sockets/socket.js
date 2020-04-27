const { io } = require("../server");

const { TicketControl } = require("../classes/ticket-control");

const ticketCtrl = new TicketControl();

io.on("connection", (client) => {
  // Listening Front-End
  client.on("nextTicket", (data, callback) => {
    let ticket = ticketCtrl.nextTicket();

    console.log(ticket);
    callback(ticket);
  });

  // Send info Front-End
  client.emit("last4", {
    last: ticketCtrl.getLastTicket(),
    last4: ticketCtrl.getLast4(),
  });

  client.on("attendTicket", (data, callback) => {
    if (!data.desk) {
      return callback({
        err: true,
        message: "The desk is necessary",
      });
    }
    let numberAttend = ticketCtrl.attendTicket(data.desk);
    callback(numberAttend);

    //
    client.broadcast.emit("last4", {
      last4: ticketCtrl.getLast4(),
    });
  });
});
