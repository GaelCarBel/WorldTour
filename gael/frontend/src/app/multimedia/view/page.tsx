'use client';

import Media from "../../../components/multimedia/Media";

export default function ViewPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Visualizar archivos multimedia</h1>
      
      <p>Imagen alojada en Cloudinary</p>
      <Media url="https://res.cloudinary.com/dvhqb5vju/image/upload/v1770925678/obpeccwjhgtzoyeiyq8r.png" />
      
      <p>Video alojado en Cloudinary</p>
      <Media url="https://res.cloudinary.com/daexgzjve/video/upload/v1769365726/rranlnnipwwdlrvkys45.mp4" />
    </div>
  );
}
