import { Publisher, Subjects, ITicketCreatedEvent } from "@mvtrespass/common";

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
