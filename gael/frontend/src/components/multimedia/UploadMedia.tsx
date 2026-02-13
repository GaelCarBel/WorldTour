"use client";

import { useState, useCallback } from "react";
import Media from "@/src/components/multimedia/Media";

interface UploadMediaProps {
  onUrlsChange: (urls: string[]) => void;
  maxFiles?: number;
}

const MAX_FILES = 5;

export default function UploadMedia({ onUrlsChange, maxFiles = MAX_FILES }: UploadMediaProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > maxFiles) {
        alert(`Máximo ${maxFiles} archivos`);
        return;
      }
      
      setFiles(prev => [...prev, ...newFiles]);
      
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, [files.length, maxFiles]);

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
    
    // ✅ Callback al formulario
    onUrlsChange(successfulUrls);
    
    setFiles([]);
    setPreviews([]);
    setUploading(false);
  };

  return (
    <div className="space-y-4 p-6 bg-slate-800/30 border border-slate-700 rounded-xl">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Imágenes/Videos (Máx {maxFiles})
      </label>
      
      <input 
        type="file" 
        multiple
        accept="image/*,video/*" 
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600"
      />
      
      <div className="text-xs text-slate-500">
        Archivos: {files.length}/{maxFiles}
      </div>
      
      <button 
        onClick={handleUpload}
        disabled={!files.length || uploading}
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Subiendo...
          </>
        ) : (
          `Subir ${files.length} archivo${files.length !== 1 ? "s" : ""}`
        )}
      </button>

      {/* Preview */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-2 bg-slate-900/50 rounded-lg">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-800">
                <Media url={preview} />
              </div>
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
