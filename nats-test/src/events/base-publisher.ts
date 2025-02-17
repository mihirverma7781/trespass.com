import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface IEvent {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends IEvent> {
  abstract subject: T["subject"];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err, data) => {
        if (err) {
          reject(new Error("Error publishing event: " + JSON.stringify(err)));
        } else {
          console.log(
            "Event published => GID: " + data + " || " + this.subject
          );
          resolve();
        }
      });
    });
  }
}
