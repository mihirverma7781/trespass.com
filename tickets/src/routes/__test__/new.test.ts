import request from "supertest";
import app from "../../app";

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
    });
  expect(response.status).toEqual(400);
});

it("[API REQUEST] Returns status=201 if ticket is created successfully", async () => {
  const response = await request(app)
    .post("/api/tickets/create")
    .set("Cookie", global.signin())
    .send({
      title: "Dummy concert tickets",
      price: 10,
    });
  expect(response.status).toEqual(201);
});
