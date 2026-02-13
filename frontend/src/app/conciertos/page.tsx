
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Concierto = {
  _id: string;
  ciudad: string;
  lat: number;
  lon: number;
  fecha: string;
  creador: string;
  fechaCreacion?: string;
};

export default function ConciertosPage() {
  const [conciertos, setConciertos] = useState<Concierto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${base}/api/conciertos`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${text}`);
        }

        const data = (await res.json()) as Concierto[];
        setConciertos(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message || "Error cargando conciertos");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = q
      ? conciertos.filter((c) => (c.ciudad || "").toLowerCase().includes(q))
      : conciertos;


    return [...filtered].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
  }, [conciertos, search]);

  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Conciertos</h1>
            <p className="text-slate-300 text-sm">
              {loading ? "Cargando..." : `Mostrando: ${results.length} / ${conciertos.length}`}
            </p>
          </div>

          <Link
            href="/conciertos/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
          >
            + Crear concierto
          </Link>
        </div>

        {/* Searchbar */}
        <div className="mb-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Buscar por ciudad
            </label>
            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ej: Malaga"
                className="w-full rounded-lg bg-slate-950/40 border border-slate-700 text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500/60"
              />
              <button
                type="button"
                onClick={() => setSearch("")}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
            Cargando conciertos...
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-950/40 border border-red-800 rounded-xl p-6 text-red-200">
            Error: {error}
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
            {search.trim()
              ? `No hay conciertos para "${search.trim()}".`
              : "No hay conciertos todavía."}
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => (
              <div
                key={c._id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow p-5"
              >
                <h2 className="text-lg font-semibold text-white">{c.ciudad}</h2>

                <div className="mt-2 text-sm text-slate-300 space-y-1">
                  <div>
                    Fecha:{" "}
                    <span className="font-medium text-slate-100">
                      {new Date(c.fecha).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    Coordenadas:{" "}
                    <span className="font-medium text-slate-100">
                      {c.lat}, {c.lon}
                    </span>
                  </div>
                  <div>
                    Creador:{" "}
                    <span className="font-medium text-slate-100">{c.creador}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-200 border border-purple-600/30">
                    Concierto
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
