import { Router, Request, Response } from "express";
import { generateToken, hashPassword } from "../middleware";
import { User } from "../models";
import { comparePassword } from "../middleware/bcrypt";

const router = Router();

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role: ("buyer" | "seller" | "admin")[];
}

interface LoginBody {
  email: string;
  password: string;
}

router.post(
  "/register",
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "User created successfully",
      data: { name, email, role },
    });
  },
);

router.post(
  "/login",
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const hashedPassword = user.password;
    const isMatch = await comparePassword(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return res.status(200).json({
      message: "Login successful",
      data: { name: user.name, email: user.email, role: user.role, shopName: user.shopName, token },
    });
  },
);

export default router;
