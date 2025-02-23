import express from "express";
import cors from "cors";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running on Vercel!");
});

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};
