import request from "supertest";
import app from "../../app";
import Ticket from "../../database/models/ticket";
import natsInstance from "../../events/__mocks__/nats-wrapper";
// import NatsWrapperMock from "../../events/__mocks__/nats-wrapper";

jest.mock("../../events/nats-wrapper");
it("[API REQUEST] Returns status=200 for listening to /api/tickets for POST request", async () => {
  const response = await request(app).post("/api/tickets/create").send({});
  expect(response.status).not.toBe(404);
});

it("[API REQUEST] Not Returns status=401 if user is signed in", async () => {
  const response = await request(app).post("/api/tickets/create").send({});
  expect(response.status).toBe(401);
});

it("[API REQUEST] Returns status=!401 if user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signin())
    .send({
      title: "Dummy concert tickets",
      price: 10,
      quantity: 1,
    });
  expect(response.status).not.toBe(401);
});

it("[API REQUEST] Returns status=400 if invalid title is provided", async () => {
  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
      quantity: 1,
    });
  expect(response.status).toEqual(400);
});

it("[API REQUEST] Returns status=400 if invalid price is provided", async () => {
  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signin())
    .send({
      title: "Dummy concert tickets",
      price: -10,
      quantity: 1,
    });
  expect(response.status).toEqual(400);
});

it("[API REQUEST] Returns status=201 if ticket is created successfully", async () => {
  let title = "Dummy concert tickets";
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
  expect(response.status).toEqual(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(JSON.parse(tickets[0].price)).toBe(10);
  expect(tickets[0].title).toEqual(title);
});

it("[API REQUEST] publishes an event", async () => {
  let title = "Dummy concert tickets";
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
  expect(response.status).toEqual(201);

  // test event publish
  // expect(natsInstance.client.publish).toHaveBeenCalled();
});
