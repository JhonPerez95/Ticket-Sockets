const fs = require("fs");

class Ticket {
  constructor(number, desk) {
    this.number = number;
    this.desk = desk;
  }
}

class TicketControl {
  //
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4 = [];
    let data = require("../data/data.json");

    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.last4 = data.last4;
    } else {
      this.restartSystem();
    }
  }

  nextTicket() {
    this.last += 1;

    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveData();
    return `Ticket ${this.last}`;
  }

  getLastTicket() {
    return `Ticket ${this.last}`;
  }

  getLast4() {
    return this.last4;
  }

  restartSystem() {
    this.last = 0;
    this.tickets = [];
    this.last4 = [];
    this.saveData();
  }

  attendTicket(desk) {
    if (this.tickets.length === 0) {
      return {
        ok: false,
        message: "There  aren't Tickets to Attend",
      };
    }

    let numberTicket = this.tickets[0].number;
    this.tickets.shift(); // Delete first element

    let numberAttend = new Ticket(numberTicket, desk);
    this.last4.unshift(numberAttend); // Agg First

    if (this.last4.length > 4) {
      this.last4.pop(); // Delete last Element
    }

    console.log("Last 4");
    console.log(this.last4);

    this.saveData();

    return numberAttend;
  }

  saveData() {
    let jsonData = {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4,
    };
    let jsonString = JSON.stringify(jsonData);
    fs.writeFileSync("./src/data/data.json", jsonString);
  }
}

module.exports = {
  TicketControl,
};
