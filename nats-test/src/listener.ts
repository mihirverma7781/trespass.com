import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "node:crypto";
console.clear();

const client = nats.connect("trespass", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("Listener connected to NATS ");

  client.on("close", () => {
    console.log("NATS closing connection!");
    process.exit();
  });

  const options = client.subscriptionOptions().setManualAckMode(true);

  const subscription = client.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    console.log("Message received!");
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(` Recieved event #${msg.getSequence()} with data: ${data}`);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => client.close());
process.on("SIGTERM", () => client.close());
