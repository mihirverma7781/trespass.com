import request from "supertest";
import app from "../../app";

it("[API REQUEST] Returns status=200 on successfull current user fetch", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);

  const cookie: any = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.message).toBe("Authorization successfull");
  expect(response.body.data.currentUser.email).toBe("user@example.com");
});
