import mongoose from "mongoose";
import { model } from "mongoose";
import { DB_CONN_STRING } from "./config";

mongoose
  .connect(DB_CONN_STRING)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model("users", UserSchema);

