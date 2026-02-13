"use client";

import OSMMap from "@/src/components/maps/OSMMap";

export default function Page() {

  // a <OSMMap/> se le puede pasar un param (una lista por ej)
  return (
    <div className="space-y-8 p-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">Mapa con 1 lugar</h1>
        <OSMMap /> 
      </section>
    </div>
  );
}
