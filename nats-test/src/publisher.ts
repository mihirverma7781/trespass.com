import nats from "node-nats-streaming";

console.clear();

const client = nats.connect("trespass", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "Concert",
    price: "3000",
  });

  client.publish("ticket:created", data, () => {
    console.log("Event published!");
  });
});
