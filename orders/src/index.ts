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
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("Environment variable not specified: NATS_CLIENT_ID");
    }
    if (!process.env.NATS_URI) {
      throw new Error("Environment variable not specified: NATS_URI");
    }
    if (!process.env.NATS_CLUSTURE_ID) {
      throw new Error("Environment variable not specified: NATS_CLUSTURE_ID");
    }
    const databaseInstance = AuthDatabase.getInstance();
    await databaseInstance.connectDatabase();

    await natsInstance.connect(
      process.env.NATS_CLUSTURE_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URI
    );
    natsInstance.handleExit();

    app.listen(PORT, () => {
      console.log(`Orders Service Listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
