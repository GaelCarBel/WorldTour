"use client";

type MediaProps = {
  url: string;
  width?: number;
  height?: number;
};
// Detalles: width=384 === w-96 y height=256 === h-64

export default function Media({ url, width, height }: MediaProps) {
  //Comprobamos si es video por su formato y permitimos luego la previsualización.
  const isVideo = /\.(mp4|mov|webm|avi|mkv)$/i.test(url) || url.includes('video/upload') || url.startsWith('data:video/');
  const componentSize = width && height ? "" : "w-96 h-64";
  
  return (
    <div className={`${componentSize} bg-gray-100 rounded-lg overflow-hidden shadow-md`}>
      {isVideo ? (
        <video src={url} className="w-full h-full object-cover" controls preload="metadata" playsInline />
      ) : (
        <img src={url} alt="media" className="w-full h-full object-cover" />
      )}
    </div>
  );
}
