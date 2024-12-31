import app from "./app";
import AuthDatabase from "./database/connect-db";

const PORT = 8002;
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

    app.listen(PORT, () => {
      console.log(`Auth Service Listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
