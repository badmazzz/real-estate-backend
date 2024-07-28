import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller" | "company" | "client" | "admin";
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["buyer", "seller", "company", "client", "admin"],
    required: true,
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
