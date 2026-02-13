"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Autentícate</h1>

        <div className="bg-white/10 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Google Button - estilo Navbar */}
            <a
              href="http://localhost:8080/api/auth/google"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all hover:shadow-lg"
            >
              Inicia sesión con Google
            </a>

            {/* Divider */}
            <div className="relative flex items-center py-3">
              <div className="flex-grow border-t border-slate-700/50"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">o</span>
              <div className="flex-grow border-t border-slate-700/50"></div>
            </div>

            <Link
              href="/"
              className="group w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-slate-700/50 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 text-slate-200 hover:text-white font-medium rounded-xl transition-all hover:shadow-lg"
            >
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
