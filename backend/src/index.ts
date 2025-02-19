import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserModel } from "./db";
import { JWT_USER_SECRET } from "./config";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const UserSchema = z.object({
    username: z
      .string()
      .min(3, "Username must be a minimum of 3 characters.")
      .max(10, "Username cannot exceed 10 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password must be at most 20 characters long.")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  });

  const parsedData = UserSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "invalid Format",
      error: parsedData.error.errors,
    });
    return;
  }

  const userName = req.body.username;
  const password = req.body.password;

  let errorThrown = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      userName: userName,
      password: hashedPassword,
    });
  } catch (e) {
    res.status(403).json({
      message: "User Already Exist",
    });
    errorThrown = true;
  }

  if (!errorThrown) {
    res.status(200).json({
      message: "You are signed up!",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    userName: username,
  });

  if (!user) {
    res.status(403).json({
      message: "Incorrect username",
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(403).json({
      message: "Invalid Password",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
    },
    JWT_USER_SECRET
  );
  res.json({
    token,
  });
});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/secondbrain/share", (req, res) => {});

app.get("/api/v1/secondbrain/:shareLink", (req, res) => {});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
