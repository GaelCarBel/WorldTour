import { createContext } from "react";
import { AuthUser } from "@/src/types/auth";

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  setUser: (user: AuthUser) => void;
  setToken: (token: string) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
