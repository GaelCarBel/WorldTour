"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/src/hooks/useAuth"

function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
            NextApp
          </Link>
          {/* Links condicionales */}
          <div className="flex items-center space-x-6 mx-auto">
            {/* Sin login */}
            {!user && (
              <Link
                href="/resources"
                className={`px-3 py-2 rounded-lg font-medium transition-all ${pathname === '/resources' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                Placeholder
              </Link>
            )}
            {/* Con login */}
            {user && (
              <div>
                
                <Link
                  href="/resources"
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${pathname === '/resources' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  Placeholder
                </Link>

                 <Link
                  href="/giras"
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    pathname === "/giras"
                      ? "bg-purple-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Giras
                </Link>

                <Link
                  href="/conciertos"
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    pathname === "/conciertos"
                      ? "bg-purple-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Conciertos
                </Link>
                <Link
                  href="/reservas"
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    pathname === "/reservas"
                      ? "bg-purple-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  Mis reservas
                </Link>

              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative">
                {/* Avatar */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <img
                    src={user.fotoPerfil || "/default-avatar.png"}
                    alt={user.nombre}
                    className="w-9 h-9 rounded-full ring-2 ring-purple-500/50 hover:scale-105 transition-transform"
                  />
                </button>

                {/* Desplegable */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 z-50 animate-in slide-in-from-top-2">
                    {/* Perfil */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-slate-100 transition-colors w-full"
                        onClick={closeDropdown}
                      >
                        Perfil
                      </Link>
                    </div>
                    {/* Cerrar sesion */}
                    <div className="border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout()
                          closeDropdown()
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 font-medium transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href={"/login"}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                Iniciar Sesión
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
