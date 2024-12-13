import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Mongoose } from "mongoose";
import request from "supertest";
import app from "../app";

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = "testkey";

  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();

  await mongoose.connect(mongoURI);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();

  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

const signin = async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "user@example.com",
      password: "password",
    })
    .expect(201);

  const cookie: any = response.get("Set-Cookie");
  return cookie;
};

// You can now use the function anywhere
global.signin = signin;
