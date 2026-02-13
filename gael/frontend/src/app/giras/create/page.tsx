
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
};

export default function CreateGiraPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [grupo, setGrupo] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const uploadToCloudinary = async (imageFile: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
    if (!uploadPreset) throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");

    const form = new FormData();
    form.append("file", imageFile);
    form.append("upload_preset", uploadPreset);
    form.append("folder", "worldtour/giras");

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Cloudinary upload failed (${res.status}) ${text}`);
      }

      const data = (await res.json()) as CloudinaryUploadResponse;
      if (!data.secure_url) throw new Error("Cloudinary did not return secure_url");
      return data.secure_url;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!grupo.trim()) return setError("El nombre del grupo es obligatorio.");
    if (!file) return setError("Selecciona una imagen para el póster.");
    if (!user?.email) return setError("Debes iniciar sesión para crear una gira.");

    try {
      setLoading(true);

      
      const posterUri = await uploadToCloudinary(file);

     
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${base}/api/giras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          grupo: grupo.trim(),
          posterUri,
          creador: user.email,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Backend error (${res.status}) ${text}`);
      }

      router.push("/giras");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Error creando la gira");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Crear gira</h1>
          <p className="text-slate-400 mt-1">Nombre del grupo + imagen del póster</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Grupo
            </label>
            <input
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              placeholder="Ej: Megadeth"
              className="w-full rounded-lg bg-slate-950/40 border border-slate-700 text-slate-100 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Póster (imagen)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-800 file:text-slate-100 hover:file:bg-slate-700"
            />

            {previewUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-56 object-cover"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-800 rounded-xl p-4 text-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              {uploading ? "Subiendo imagen..." : loading ? "Creando..." : "Crear gira"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/giras")}
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
