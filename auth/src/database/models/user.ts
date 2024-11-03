import mongoose from "mongoose";

interface IUserAttrs {
  email: string;
  password: string;
}

interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserModel extends mongoose.Model<any> {
  build: (attrs: IUserAttrs) => IUserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

export default User;
