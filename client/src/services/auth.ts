const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { User } from "../types";

interface AuthResponse {
  token: string;
  user: User;
}
console.log("API_BASE_URL:", API_BASE_URL);

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(API_BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: ("buyer" | "seller" | "admin")[],
): Promise<AuthResponse> => {
  const response = await fetch(API_BASE_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};
