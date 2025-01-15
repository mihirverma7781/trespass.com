import { Message, Stan } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { ITicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  constructor(client: Stan) {
    super(client);
  }

  onMessage(data: ITicketCreatedEvent["data"], msg: Message) {
    console.log("Event Data: ", data);
    msg.ack();
  }
}
