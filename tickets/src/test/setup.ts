import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Mongoose } from "mongoose";

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = "testkey";

  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();
  console.log("Mongo URI:", mongoURI);
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
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

const signin = () => {
  // build a JWT payload. {id, email, iat}
  const payload = {
    id: "1389ryondfoe",
    email: "test@test.com",
  };
  // create JWT token
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object, {jwt: MY_JWT}
  const session = { jwt: token };

  // turn that session into json
  const sessionJSON = JSON.stringify(session);

  // take json and encode it into  base64 string
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return string with the encoded data
  return [`session=${base64}`];
};

// You can now use the function anywhere
global.signin = signin;
