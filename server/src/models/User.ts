import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: ("buyer" | "seller" | "admin")[];
  shopName?: string;
  bio?: string;
  avatarUrl?: string;
  isSuspended: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: [String],
      enum: ["buyer", "seller", "admin"],
      required: true,
    },
    shopName: { type: String },
    bio: { type: String },
    avatarUrl: { type: String },
    isSuspended: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
