import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const DB_CONN_STRING = process.env.DB_CONN_STRING || "";

export const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "defaultSecret";
