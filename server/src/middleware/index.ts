import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";

export { hashPassword, comparePassword } from "./bcrypt";
export { authenticateToken, generateToken } from "./jwt";

export const requireRole = (...roles: ("buyer" | "seller" | "admin")[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const hasRole = req.user.role.some(role => roles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: "Forbidden" });
        }
        return next();
    }
}
