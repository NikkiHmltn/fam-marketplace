export interface User {
  _id: string;
  name: string;
  email: string;
  role: ("buyer" | "seller" | "admin")[];
  shopName?: string;
  bio?: string;
  avatarUrl?: string;
  isSuspended: boolean;
}