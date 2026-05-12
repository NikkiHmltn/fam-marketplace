import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { AuthRequest } from "../types";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded as IUser;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const generateToken = (payload: object) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign(payload, secret, { expiresIn: "5h" });
};
