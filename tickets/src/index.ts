import app from "./app";
import AuthDatabase from "./database/connect-db";
import natsInstance from "./events/nats-wrapper";

const PORT = 8001;
// Server Listener & Database Connection
const startServer = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("Environment variable not specified: JWT_KEY");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("Environment variable not specified: MONGO_URI");
    }
    const databaseInstance = AuthDatabase.getInstance();
    await databaseInstance.connectDatabase();

    await natsInstance.connect("trespass", "test", "http://nats-srv:4222");
    natsInstance.handleExit();

    app.listen(PORT, () => {
      console.log(`Tickets Service Listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
