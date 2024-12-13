import request from "supertest";
import app from "../../app";

it("[API REQUEST] Returns status=200 on successfull current user fetch", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.message).toBe("Authorization successfull");
  expect(response.body.data.currentUser.email).toBe("user@example.com");
});

it("[API REQUEST] Returns status=401 if not authenticated ", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);

  expect(response.body.message).toBe("Authorization failed");
  expect(response.body.data.currentUser).toBe(null);
});
