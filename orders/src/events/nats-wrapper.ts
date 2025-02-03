import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;
  private static instance: NatsWrapper;

  constructor() {}

  get client() {
    if (!this._client) {
      throw new Error("Can't access the NATS client before connecting...");
    }
    return this._client;
  }

  // public static getInstance(): NatsWrapper {
  //   if (!NatsWrapper.instance) {
  //     NatsWrapper.instance = new NatsWrapper();
  //   }
  //   return NatsWrapper.instance;
  // }

  async connect(
    clustureId: string,
    clientId: string,
    url: string
  ): Promise<void> {
    try {
      this._client = nats.connect(clustureId, clientId, { url });

      return new Promise<void>((resolve, reject) => {
        this._client!.on("connect", () => {
          console.log("Connected to NATS");
          resolve();
        });

        this._client!.on("error", (err) => {
          console.error("NATS connection error:", err);
          this._client = undefined;
          reject(err);
        });
      });
    } catch (error) {
      console.error("Error during NATS connection:", error);
      throw error;
    }
  }

  async handleExit() {
    this.client.on("close", () => {
      console.log("NATS closing connection!");
      process.exit();
    });

    process.on("SIGINT", () => this.client.close());
    process.on("SIGTERM", () => this.client.close());
  }
}

export default new NatsWrapper();
