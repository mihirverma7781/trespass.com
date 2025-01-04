import request from "supertest";
import app from "../../app";
import Ticket from "../../database/models/ticket";

it("[API REQUEST] Returns status=200 if ticket is updated successfully", async () => {

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signin())
    .send({
      title: "Dummy concert tickets",
      price: 10,
      quantity: 1,
    });

  const updatedTicket = await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "Patched Ticket",
      price: 200,
      quantity: 10,
    });

  expect(updatedTicket.body.data.quantity).toBe(10);
  expect(updatedTicket.body.data.price).toBe("200");
  expect(updatedTicket.body.data.title).toBe("Patched Ticket");
});
