import app from "./app";
import AuthDatabase from "./database/connect-db";

const PORT = 8001;
// Server Listener & Database Connection
const startServer = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("Environment variable not specified: JWT_KEY");
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
