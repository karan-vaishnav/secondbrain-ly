import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "./config";
import { Request, Response, NextFunction } from "express";

interface JwtUserPayLoad {
  id: string;
}

interface AuthRequest extends Request {
  userId?: string;
}

function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers["authorization"];

  if (!header) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  try {
    const decoded = jwt.verify(header, JWT_USER_SECRET) as JwtUserPayLoad;
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid User!",
    });
  }
}

export { authMiddleware, AuthRequest };
