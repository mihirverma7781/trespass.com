import request from "supertest";
import app from "../../app";

it("[API REQUEST] Returns status=200 on successfull signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(200);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.body.message).toBe("Logged out");
});
