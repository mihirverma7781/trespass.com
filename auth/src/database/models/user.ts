import mongoose from "mongoose";
import { Password } from "../../utils/password";

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

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export default User;
