import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_USER_SECRET } from "./config";
import { authMiddleware, AuthRequest } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

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

  const username = req.body.username;
  const password = req.body.password;

  let errorThrown = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      username: username,
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
    username: username,
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

app.post(
  "/api/v1/content",
  authMiddleware,
  async (req: AuthRequest, res): Promise<void> => {
    try {
      const type = req.body.type;
      const link = req.body.link;
      const title = req.body.title;

      await ContentModel.create({
        type,
        link,
        title,
        userId: req.userId,
        tags: [],
      });

      res.json({
        message: "Content Added!",
      });
    } catch (error) {
      res.status(500).json({ message: "Error adding content", error });
    }
  }
);

app.get("/api/v1/content", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");

  res.json({
    content,
  });
});

app.delete("/api/v1/content", authMiddleware, async (req: AuthRequest, res) => {
  await ContentModel.deleteOne({
    contentId: req.params.id,
    userId: req.userId,
  });

  res.json({
    message: "Deleted!",
  });
});

app.post(
  "/api/v1/secondbrain/share",
  authMiddleware,
  async (req: AuthRequest, res) => {
    const { share } = req.body;
    if (share) {
      const existingLink = await LinkModel.findOne({
        userId: req.userId,
      });
      if (existingLink) {
        res.json({
          hash: existingLink.hash,
        });
        return;
      }

      const hash = random(10);
      await LinkModel.create({
        userId: req.userId,
        hash: hash,
      });

      res.json({
        hash: hash,
      });
    } else {
      await LinkModel.deleteOne({
        userId: req.userId,
      });

      res.json({
        message: "Removed Link!",
      });
    }
  }
);

app.get("/api/v1/secondbrain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry Incorrect input!",
    });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: "User not found, error should ideally not happen",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
