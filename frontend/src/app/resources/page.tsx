"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Resource } from "@/src/types/Resource";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);

  async function getResources() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resources`);
    setResources(response.data);
  }

  useEffect(() => {
    getResources();
  }, []);

  return (
    <div>
      {resources.length === 0 ? (
        <h1>No hay recursos que mostrar</h1>
      ) : (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
          <h1>Lista de resources</h1>
          <ul className="space-y-4">
            {resources.map((resource) => (
              <Link 
                key={resource._id}
                href={`/resources/${resource._id}`}
                className="block p-6 bg-white border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg">{resource.name}</h3>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
