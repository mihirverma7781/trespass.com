import { Stan } from "node-nats-streaming";
import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { ITicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPubisher extends Publisher<ITicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  constructor(client: Stan) {
    super(client);
  }
}
