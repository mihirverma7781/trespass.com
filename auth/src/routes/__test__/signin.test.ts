import request from "supertest";
import app from "../../app";

it("[API REQUEST] Returns status=200 on successfull signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(200);
});

it("[API REQUEST] Returns status=400 on invaild email input", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "invalid email string",
      password: "password",
    })
    .expect(400);
});

it("[API REQUEST] Returns status=400 on invaild password input", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "invalid email string",
      password: "",
    })
    .expect(400);
});

it("[API REQUEST] Returns status=400 on empty email & password input", async () => {
  return request(app).post("/api/users/signin").send({}).expect(400);
});

it("[API REQUEST] Returns status=200 & userdata on successfull signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(200);

  expect(response.body.data).toBeDefined();
  expect(response.body.message).toBe("User logged in successfully");
});
