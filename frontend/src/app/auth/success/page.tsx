"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useAuth } from "@/src/hooks/useAuth";

export default function AuthSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { setToken } = useAuth();
  
  const handleAuth = useCallback(() => {
    //Si no hay token redirige al login
    if (!token) {
      router.replace("/login");
      return;
    }
    //Guarda el token el localStorage buena practica para persistencia (recargar pagina)
    const tokenInLocalStorage = localStorage.getItem("token");
    if (!tokenInLocalStorage) {
      setToken(token);
    }
    router.replace("/");
  }, [token, setToken, router]);

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Login exitoso</h2>
      </div>
    </div>
  );
}
