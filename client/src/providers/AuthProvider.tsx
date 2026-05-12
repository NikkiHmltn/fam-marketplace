import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types";
import { loginUser, registerUser } from "../services/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    const assignUser = (userData: User) => {
      setUser(userData);
    }
    const loadingState = (boolean: boolean) => {
      setIsLoading(boolean);
    }
    if (token && storedUser) {
        assignUser(JSON.parse(storedUser));
        loadingState(false);
    } else {
        loadingState(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const {token, user} = await loginUser(email, password);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }
  
  const register = async (name: string, email: string, password: string, role: ("buyer" | "seller" | "admin")[]) => {
    const {token, user} = await registerUser(name, email, password, role);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ login, logout, register, user, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};