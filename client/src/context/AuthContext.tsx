import { createContext } from "react";
import type { User } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: ("buyer" | "seller" | "admin")[]) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
