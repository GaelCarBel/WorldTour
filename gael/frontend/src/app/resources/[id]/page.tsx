"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Resource } from "@/src/types/Resource";
import axios from "axios";
import Link from "next/link";

export default function ResourceDetail() {
  const params = useParams();
  const id = params.id as string;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchResource();
    }
  }, [id]);

  async function fetchResource() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/resources/${id}`
      );
      setResource(response.data);
    } catch (error) {
      console.error("Error fetching resource:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Cargando recurso...</div>;
  if (!resource) return <div>Recurso no encontrado</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{resource.name}</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <p><strong>Status:</strong> {resource.status}</p>
        <p><strong>Número:</strong> {resource.number}</p>
        <p><strong>Booleano:</strong> {resource.boolean.toString()}</p>
        <p><strong>Array:</strong> {JSON.stringify(resource.array)}</p>
      </div>

      <Link 
        href="/resources"
        className="mt-8 inline-block text-blue-600 hover:underline"
      >
        ← Volver a la lista
      </Link>
    </div>
  );
}
