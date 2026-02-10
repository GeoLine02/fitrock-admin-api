import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/user";

declare global {
  namespace Express {
    interface Request {
      userId?: {
        id: number;
      };
    }
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const payload = jwt.verify(token, secret) as { id: number };
    req.userId = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authGuard;
