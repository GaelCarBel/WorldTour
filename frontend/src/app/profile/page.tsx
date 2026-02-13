"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex items-center gap-6 bg-slate-800 border border-slate-600 rounded-xl p-6">
        <img 
          src={user.fotoPerfil || "/default-avatar.png"} 
          alt={user.nombre}
          className="w-20 h-20 rounded-full border-2 border-slate-400 flex-shrink-0"
        />
        <div>
          <h1 className="text-xl font-semibold text-slate-200 mb-1">{user.nombre}</h1>
          <p className="text-base text-slate-400">{user.email}</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
