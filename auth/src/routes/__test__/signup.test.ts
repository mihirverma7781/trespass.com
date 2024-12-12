import request from "supertest";
import app from "../../app";

it("[API REQUEST] Returns status=201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);
});

it("[API REQUEST] Returns status=400 on invaild email input", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalid email string",
      password: "password",
    })
    .expect(400);
});

it("[API REQUEST] Returns status=400 on invaild password input", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalid email string",
      password: "",
    })
    .expect(400);
});

it("[API REQUEST] Returns status=400 on empty email & password input", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("[API REQUEST] Returns status=400 on duplicate email signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(400);
});

it("[API REQUEST] Returns status=201 & sets cookie on successfull signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
