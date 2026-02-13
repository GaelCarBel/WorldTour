"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";

type Reserva = {
  _id: string;
  concierto: string | { _id: string };
  userEmail: string;
  token: string;
  iat: string;
  exp: string;
};

type Concierto = {
  _id: string;
  ciudad: string;
  fecha: string;
};

type Gira = {
  _id: string;
  grupo: string;
  posterUri: string;
  conciertos: string[];
};

type ReservaView = {
  _id: string;
  grupo: string | null;
  posterUri: string | null;
  ciudad: string | null;
  fecha: string | null;
  token: string;
  iat: string;
  exp: string;
};

export default function MisReservasPage() {
  const { user } = useAuth();

  const [items, setItems] = useState<ReservaView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user?.email) {
          setItems([]);
          setLoading(false);
          return;
        }

        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

        const [rRes, cRes, gRes] = await Promise.all([
          fetch(`${base}/api/reservas`, { credentials: "include" }),
          fetch(`${base}/api/conciertos`, { credentials: "include" }),
          fetch(`${base}/api/giras`, { credentials: "include" }),
        ]);

        if (!rRes.ok) throw new Error(await rRes.text().catch(() => "Error cargando reservas"));
        if (!cRes.ok) throw new Error(await cRes.text().catch(() => "Error cargando conciertos"));
        if (!gRes.ok) throw new Error(await gRes.text().catch(() => "Error cargando giras"));

        const reservas = (await rRes.json()) as Reserva[];
        const conciertos = (await cRes.json()) as Concierto[];
        const giras = (await gRes.json()) as Gira[];

        const myEmail = user.email.toLowerCase();

        
        const conciertoMap = new Map<string, Concierto>();
        (Array.isArray(conciertos) ? conciertos : []).forEach((c) => conciertoMap.set(c._id, c));

        
        const conciertoToGira = new Map<string, { grupo: string; posterUri: string }>();
        (Array.isArray(giras) ? giras : []).forEach((g) => {
          (Array.isArray(g.conciertos) ? g.conciertos : []).forEach((cid) => {
            if (!conciertoToGira.has(cid)) {
              conciertoToGira.set(cid, { grupo: g.grupo, posterUri: g.posterUri });
            }
          });
        });

        const mine = (Array.isArray(reservas) ? reservas : [])
          .filter((r) => (r.userEmail || "").toLowerCase() === myEmail)
          .map((r): ReservaView => {
            const cid = typeof r.concierto === "string" ? r.concierto : r.concierto?._id;
            const concierto = cid ? conciertoMap.get(cid) : undefined;
            const giraInfo = cid ? conciertoToGira.get(cid) : undefined;

            return {
              _id: r._id,
              grupo: giraInfo?.grupo ?? null,
              posterUri: giraInfo?.posterUri ?? null,
              ciudad: concierto?.ciudad ?? null,
              fecha: concierto?.fecha ?? null,
              token: r.token,
              iat: r.iat,
              exp: r.exp,
            };
          });

       
        mine.sort((a, b) => {
          const ta = a.fecha ? new Date(a.fecha).getTime() : 0;
          const tb = b.fecha ? new Date(b.fecha).getTime() : 0;
          return ta - tb;
        });

        setItems(mine);
      } catch (e: any) {
        setError(e?.message || "Error cargando mis reservas");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.email]);

  const total = useMemo(() => items.length, [items]);

  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Mis reservas</h1>
          <p className="text-slate-300 text-sm">
            {loading ? "Cargando..." : `Total: ${total}`}
          </p>
        </div>

        {!user?.email && !loading && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
            Debes iniciar sesión para ver tus reservas.
          </div>
        )}

        {loading && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
            Cargando reservas...
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-950/40 border border-red-800 rounded-xl p-6 text-red-200">
            Error: {error}
          </div>
        )}

        {!loading && !error && user?.email && items.length === 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-slate-300">
            No tienes reservas todavía.
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <div
                key={r._id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow"
              >
                <div className="w-full h-56 bg-slate-800">
                  {r.posterUri ? (
                    <img
                      src={r.posterUri}
                      alt={r.grupo ?? "Poster"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white">
                    {r.grupo ?? "Sin gira"}
                  </h2>

                  <div className="mt-2 text-sm text-slate-300 space-y-1">
                    <div>
                      Ciudad:{" "}
                      <span className="text-slate-100 font-medium">{r.ciudad ?? "—"}</span>
                    </div>
                    <div>
                      Fecha:{" "}
                      <span className="text-slate-100 font-medium">
                        {r.fecha ? new Date(r.fecha).toLocaleString() : "—"}
                      </span>
                    </div>

                    <div className="pt-2 text-xs break-all">
                      Token: <span className="text-slate-100">{r.token}</span>
                    </div>
                    <div className="text-xs">
                      iat:{" "}
                      <span className="text-slate-100">
                        {r.iat ? new Date(r.iat).toLocaleString() : "—"}
                      </span>
                    </div>
                    <div className="text-xs">
                      exp:{" "}
                      <span className="text-slate-100">
                        {r.exp ? new Date(r.exp).toLocaleString() : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-200 border border-purple-600/30">
                      Reserva
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
