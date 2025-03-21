import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import { DB_CONN_STRING } from "./config";
import { string } from "zod";

mongoose
  .connect(DB_CONN_STRING)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model("users", UserSchema);

const ContentSchema = new Schema({
  type: {
    type: String,
    enum: ["youtube", "twitter", "link", "document"],
    required: true,
  },
  link: String,
  title: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
});

export const LinkModel = model("Link", LinkSchema);
