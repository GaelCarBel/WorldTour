// src/components/auth/AuthProvider.tsx
"use client";

import { ReactNode, useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { AuthUser } from "@/src/types/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setUser(null);
        return;
      }

      const response = await fetch("http://localhost:8080/api/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid token");
      }

      const data = await response.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
        console.log("✅ Usuario cargado:", data.user.nombre);
      } else {
        throw new Error("No user data");
      }
    } catch (error) {
      console.error("❌ Error refreshUser:", error);
      setUser(null);
      localStorage.removeItem("token");
      setToken(null);
    }
  }, []); // ✅ SIN dependencias = se ejecuta UNA SOLA VEZ

  const saveToken = (newToken: string) => {
    console.log("💾 Guardando token");
    setToken(newToken);
    localStorage.setItem("token", newToken);
    
    // Verificar inmediatamente
    refreshUser();
  };

  const logout = () => {
    console.log("🚪 Logout");
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // ✅ useEffect UNA SOLA VEZ al montar componente
  useEffect(() => {
    console.log("🔄 Inicializando auth...");
    const savedToken = localStorage.getItem("token");
    
    if (savedToken) {
      console.log("📱 Token encontrado, verificando...");
      refreshUser();
    } else {
      console.log("❌ Sin token");
      setUser(null);
    }
    
    setLoading(false);
  }, [refreshUser]); // ✅ Solo refreshUser (estable)

  // Pantalla de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciando...</h2>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      setUser, 
      setToken: saveToken, 
      refreshUser, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
