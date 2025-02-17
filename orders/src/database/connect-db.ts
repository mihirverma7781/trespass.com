import mongoose from "mongoose";

class AuthDatabase {
  private static instance: AuthDatabase;

  private constructor() {}

  public static getInstance(): AuthDatabase {
    if (!AuthDatabase.instance) {
      AuthDatabase.instance = new AuthDatabase();
    }
    return AuthDatabase.instance;
  }

  async connectDatabase() {
    try {
      console.log("Connecting to the database...");
      const db = await mongoose.connect(process.env.MONGO_URI ?? "");
      console.log("Connected to the database");
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthDatabase;
