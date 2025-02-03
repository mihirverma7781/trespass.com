import { Publisher, Subjects, ITicketUpdatedEvent } from "@mvtrespass/common";

export class TicketUpdatedPublisher extends Publisher<ITicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
