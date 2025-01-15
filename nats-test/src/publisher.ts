import nats from "node-nats-streaming";
import { TicketCreatedPubisher } from "./events/ticket-created-publisher";

console.clear();

const client = nats.connect("trespass", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", async () => {
  console.log("Publisher connected to NATS");
  const publisher = new TicketCreatedPubisher(client);
  await publisher.publish({
    id: "123",
    title: "Ticket created",
    price: 12312,
  });

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "Concert",
  //   price: "3000",
  // });

  // client.publish("ticket:created", data, () => {
  //   console.log("Event published!");
  // });
});
