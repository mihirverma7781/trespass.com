import mongoose from "mongoose";

interface ITicketAttrs {
  title: string;
  price: string;
  quantity: number;
  userId: string;
}

interface ITicketDoc extends mongoose.Document {
  title: string;
  price: string;
  quantity: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ITicketModel extends mongoose.Model<any> {
  build: (attrs: ITicketAttrs) => ITicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: ITicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<ITicketDoc, ITicketModel>("Ticket", ticketSchema);

export default Ticket;
