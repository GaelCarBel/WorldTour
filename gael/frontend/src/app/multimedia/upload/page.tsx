"use client";

import { useState, useCallback } from "react";
import Media from "../../../components/multimedia/Media";

const MAX_FILES = 5;

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]); //Gestionar
  const [previews, setPreviews] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //Recalculamos cuantos archivos tenemos y que no supere máximo
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > MAX_FILES) {
        alert(`Máximo ${MAX_FILES} archivos`);
        return;
      }

      //Seteamos nuevo files.
      setFiles(prev => [...prev, ...newFiles]);

      //Añadimos para previsualizar los files.
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, [files.length]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        return data.secure_url;
      } catch {
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUrls = results.filter(Boolean) as string[];
    setUrls(prev => [...prev, ...successfulUrls]);

    setFiles([]);
    setPreviews([]);
    setUploading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Subir a Cloudinary (Máx {MAX_FILES})</h1>

      {/* Input y botón */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <h1 className="text-sm text-gray-600">Archivos seleccionados: {files.length}/{MAX_FILES}</h1>
      </div>

      {/* Previsualización */}
      {previews.length > 0 && (
        <div>
          <p className="mb-4 font-medium">Previsualización:</p>

          <div className="flex flex-wrap gap-3">
            {previews.map((preview, index) => {
              const isVideo = preview.startsWith("data:video");

              return (
                <div
                  key={index}
                  className="relative w-40 h-40 rounded-md overflow-hidden group"
                >
                  {isVideo ? (
                    <video
                      src={preview}
                      className="w-full h-full object-contain"
                      preload="metadata"
                      autoPlay
                      controls={false}
                      onMouseEnter={(e) => (e.currentTarget.controls = true)}
                      onMouseLeave={(e) => (e.currentTarget.controls = false)}
                    />
                  ) : (
                    <img
                      src={preview}
                      alt={`preview-${index}`}
                      className="w-full h-full object-contain"
                    />
                  )}

                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs shadow-md opacity-0 group-hover:opacity-100 transition-all"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!files.length || uploading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Subiendo {files.length} archivos...
          </>
        ) : (
          `Subir ${files.length} archivo${files.length !== 1 ? "s" : ""}`
        )}
      </button>

      {/* Resultados */}
      {urls.length > 0 && (
        <div>
          <p className="mb-4 font-medium">Archivos subidos:</p>
          <div className="space-y-4">
            {urls.map((url, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Media url={url} />
                <p>Urls: </p>
                <div className="mt-2 p-2 bg-white rounded text-xs font-mono break-all max-w-full">
                  {url}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
