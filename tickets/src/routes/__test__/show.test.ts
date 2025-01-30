import request from "supertest";
import app from "../../app";
import Ticket from "../../database/models/ticket";

jest.mock("../../events/nats-wrapper");

it("[API REQUEST] Returns status=404 if the ticket is not found", async () => {
  const response = await request(app).post("/api/tickets/dummyticketid").send();
  expect(response.status).toBe(404);
});

it("[API REQUEST] Returns status=200 for GET single ticket request", async () => {
  const title = "Dummy Ticket";
  const ticketData = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signin())
    .send({
      title: title,
      price: 10,
      quantity: 1,
    });

  const ticketId = ticketData.body.data.id;

  const response = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signin())
    .send();

  expect(response.status).toBe(200);
  expect(response.body.data.title).toEqual(title);
});

it("[API REQUEST] Returns status=200 for GET all ticket request", async () => {
  const ticketQueue = [];
  const title = "Dummy Ticket";
  for (let count = 0; count < 10; count++) {
    const ticketData = await request(app)
      .post("/api/tickets/create")
      .set("Cookie", global.signin())
      .send({
        title: title,
        price: 10,
        quantity: 1,
      });

    ticketQueue.push(ticketData);
  }

  const queueResolver = await Promise.all(ticketQueue);

  const response = await request(app)
    .get(`/api/tickets`)
    .set("Cookie", global.signin())
    .send();
  expect(response.status).toBe(200);
  expect(response.body.data.length).toEqual(10);
});
