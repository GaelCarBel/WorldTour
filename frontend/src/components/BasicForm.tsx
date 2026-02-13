"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import UploadMedia from "@/src/components/multimedia/UploadMedia";
import MapSearcher from "@/src/components/maps/MapSearcher";
import { Geocode } from "@/src/types/Geocode";

interface FormData {
  titulo: string;
  descripcion: string;
  categoria: string;
  mediaUrls: string[];
  ubicacion: Geocode | null;
}

export default function CreateResourceForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    descripcion: "",
    categoria: "general",
    mediaUrls: [],
    ubicacion: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        userId: user._id,
      };

      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("¡Resource creado!");
        setFormData({ titulo: "", descripcion: "", categoria: "general", mediaUrls: [], ubicacion: null });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-white mb-8">Crear Resource</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Título del resource"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Descripción</label>
            <textarea
              rows={4}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe tu resource..."
              required
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Categoría</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="general">General</option>
              <option value="tecnologia">Tecnología</option>
              <option value="educacion">Educación</option>
              <option value="viajes">Viajes</option>
              <option value="comida">Comida</option>
            </select>
          </div>

          {/*Buscador de Mapa */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-4">Ubicación</label>
            <MapSearcher 
              onLocationSelect={(location) => setFormData({ ...formData, ubicacion: location })}
            />
          </div>

          {/* ✅ Upload Media */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-4">Multimedia</label>
            <UploadMedia 
              onUrlsChange={(urls) => setFormData({ ...formData, mediaUrls: urls })}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !user}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {loading ? "Creando..." : "Crear Resource"}
          </button>
        </form>

        {/* Debug */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg text-xs text-slate-400">
            <p>User ID: {user?._id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
