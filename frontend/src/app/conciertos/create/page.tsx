"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

const OSMMap = dynamic(() => import("@/src/components/maps/OSMMap"), { ssr: false });

type Geocode = {
  _id: string;
  address: string;
  lat: number;
  lon: number;
};

type Gira = {
  _id: string;
  grupo: string;
  posterUri?: string;
};

export default function CreateConciertoPage() {
  const router = useRouter();
  const { user } = useAuth();


  const [giras, setGiras] = useState<Gira[]>([]);
  const [giraId, setGiraId] = useState<string>("");

  const [ciudad, setCiudad] = useState("");
  const [addressQuery, setAddressQuery] = useState("");
  const [geocode, setGeocode] = useState<Geocode | null>(null);

  const [fecha, setFecha] = useState<string>("");

  const [geoLoading, setGeoLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  
  useEffect(() => {
    const loadGiras = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const res = await fetch(`${base}/api/giras`, { credentials: "include" });
        if (!res.ok) return;
        const data = (await res.json()) as Gira[];
        setGiras(Array.isArray(data) ? data : []);
      } catch {
        
      }
    };
    loadGiras();
  }, []);

  const fetchGeocode = async () => {
    setGeoError(null);
    setError(null);
    setGeocode(null);

    const q = addressQuery.trim();
    if (!q) {
      setGeoError("Escribe una ciudad/dirección para buscar.");
      return;
    }

    try {
      setGeoLoading(true);
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const url = `${base}/api/geocodes/address/${encodeURIComponent(q)}`;

      const res = await fetch(url, { method: "GET", credentials: "include" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${text}`);
      }

      const data = (await res.json()) as Geocode;
      setGeocode(data);

      
      setCiudad(data.address);
    } catch (e: any) {
      setGeoError(e?.message || "Error buscando coordenadas");
    } finally {
      setGeoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user?.email) return setError("Debes iniciar sesión para crear un concierto.");
    if (!giraId) return setError("Debes seleccionar una gira.");
    if (!fecha) return setError("La fecha es obligatoria.");
    if (!geocode) return setError("Debes buscar un lugar (geocoding) antes de crear.");
    if (!ciudad.trim()) return setError("La ciudad/lugar es obligatorio.");

    try {
      setLoading(true);

      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      
      const res = await fetch(`${base}/api/conciertos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ciudad: ciudad.trim(),
          lat: geocode.lat,
          lon: geocode.lon,
          fecha: new Date(fecha).toISOString(),
          creador: user.email,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Backend error (${res.status}) ${text}`);
      }

      const created = await res.json();
      const conciertoId = created?._id;
      if (!conciertoId) throw new Error("El backend no devolvió _id del concierto.");

      
      const giraRes = await fetch(`${base}/api/giras/${giraId}`, { credentials: "include" });
      if (!giraRes.ok) {
        const text = await giraRes.text().catch(() => "");
        throw new Error(`Error cargando gira (${giraRes.status}) ${text}`);
      }

      const gira = await giraRes.json();
      const current = Array.isArray(gira?.conciertos) ? gira.conciertos : [];
      const updated = Array.from(new Set([...current, conciertoId]));

      const patchRes = await fetch(`${base}/api/giras/${giraId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ conciertos: updated }),
      });

      if (!patchRes.ok) {
        const text = await patchRes.text().catch(() => "");
        throw new Error(
          `Concierto creado, pero no se pudo enlazar a la gira. (${patchRes.status}) ${text}`
        );
      }

      router.push("/conciertos");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Error creando el concierto");
    } finally {
      setLoading(false);
    }
  };

  const selectedGira = giras.find((g) => g._id === giraId);

  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Crear concierto</h1>
          <p className="text-slate-400 mt-1">
            Selecciona una gira + busca un lugar (geocoding) y verás el mapa.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow space-y-5"
        >
          {/* Select Gira */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Gira
            </label>

            <select
              value={giraId}
              onChange={(e) => setGiraId(e.target.value)}
              className="w-full rounded-lg bg-slate-950/40 border border-slate-700 text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500/60"
            >
              <option value="">-- Selecciona una gira --</option>
              {giras.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.grupo}
                </option>
              ))}
            </select>

            {selectedGira?.posterUri && (
              <div className="mt-3 rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={selectedGira.posterUri}
                  alt={selectedGira.grupo}
                  className="w-full h-40 object-cover"
                />
              </div>
            )}
          </div>

          {/* Geocoding */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Buscar lugar (ciudad/dirección)
            </label>
            <div className="flex gap-2">
              <input
                value={addressQuery}
                onChange={(e) => setAddressQuery(e.target.value)}
                placeholder="Ej: Malaga / Plaza Mayor Madrid / etc..."
                className="w-full rounded-lg bg-slate-950/40 border border-slate-700 text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500/60"
              />
              <button
                type="button"
                onClick={fetchGeocode}
                disabled={geoLoading}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-slate-100 font-medium transition-colors"
              >
                {geoLoading ? "Buscando..." : "Buscar"}
              </button>
            </div>

            {geoError && (
              <div className="mt-3 bg-red-950/40 border border-red-800 rounded-xl p-4 text-red-200">
                {geoError}
              </div>
            )}

            {geocode && (
              <div className="mt-3 space-y-3">
                <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 text-slate-200 space-y-2">
                  <div className="text-sm text-slate-300">
                    Resultado:{" "}
                    <span className="text-slate-100 font-medium">{geocode.address}</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Lat/Lon:{" "}
                    <span className="text-slate-100 font-medium">
                      {geocode.lat}, {geocode.lon}
                    </span>
                  </div>

                  <div className="pt-2">
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Ciudad/Lugar (se guardará en el concierto)
                    </label>
                    <input
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500/60"
                    />
                  </div>
                </div>

                {/* MAP using YOUR OSMMap */}
                <div className="border border-slate-800 rounded-xl overflow-hidden">
                  <OSMMap
                    selected={{ lat: geocode.lat, lon: geocode.lon }}
                    selectedLabel={geocode.address}
                    zoom={12}
                    height={360}
                    width="100%"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Fecha y hora
            </label>
            <input
              type="datetime-local"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full rounded-lg bg-slate-950/40 border border-slate-700 text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500/60"
            />
            <p className="text-xs text-slate-400 mt-2">Se guardará en UTC (ISO string).</p>
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-800 rounded-xl p-4 text-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              {loading ? "Creando..." : "Crear concierto"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/conciertos")}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
