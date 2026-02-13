
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Gira = {
  _id: string;
  grupo: string;
  posterUri: string;
  conciertos?: string[];
  creador: string;
  fechaCreacion?: string;
};

export default function GirasPage() {
  const [giras, setGiras] = useState<Gira[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${base}/api/giras`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${text}`);
        }

        const data = (await res.json()) as Gira[];
        setGiras(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message || "Error cargando giras");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Giras</h1>
            <p className="text-slate-300 text-sm">
              {loading ? "Cargando..." : `Total: ${giras.length}`}
            </p>
          </div>

          <Link
            href="/giras/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
          >
            + Crear gira
          </Link>
        </div>

        {loading && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
            Cargando giras...
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-950/40 border border-red-800 rounded-xl p-6 text-red-200">
            Error: {error}
          </div>
        )}

        {!loading && !error && giras.length === 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
            No hay giras todavía.
          </div>
        )}

        {!loading && !error && giras.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {giras.map((g) => (
              <div
                key={g._id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow"
              >
                <div className="w-full h-56 bg-slate-800">
                  <img
                    src={g.posterUri}
                    alt={g.grupo}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white">{g.grupo}</h2>

                  <div className="mt-2 text-sm text-slate-300 space-y-1">
                    <div>
                      Conciertos:{" "}
                      <span className="font-medium text-slate-100">
                        {Array.isArray(g.conciertos) ? g.conciertos.length : 0}
                      </span>
                    </div>
                    <div>
                      Creador:{" "}
                      <span className="font-medium text-slate-100">{g.creador}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-200 border border-purple-600/30">
                      Gira
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
