import request from "supertest";
import app from "../../app";
import Ticket from "../../database/models/ticket";

it("[API REQUEST] Returns status=404 if the ticket is not found", async () => {
  const response = await request(app).post("/api/tickets/dummyticketid").send();
  expect(response.status).toBe(404);
});

it("[API REQUEST] Returns status=200 for GET request", async () => {
  const ticketData = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signin())
    .send({
      title: "Dummy concert tickets",
      price: 10,
      quantity: 1,
    });

  const ticketId = ticketData.body.id;
  const response = await request(app).post(`/api/tickets/${ticketId}`).send();
  expect(response.status).toBe(200);
});
