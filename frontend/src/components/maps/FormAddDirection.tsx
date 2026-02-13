"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Coordinate } from "@/src/types/Coordinate";


export default function FormAddDirection() {
  const [direccion, setDireccion] = useState("");
  const [location, setLocation]= useState<Coordinate| null>(null);
  const [displayMap, setDisplayMap] = useState(false);


  async function addLocation(location: string) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/geocodes/direccion/${location}`);
    } catch (error) {
      console.error("Error agregando location:", error);
    } finally {
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDireccion(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const direccionTrimmed = direccion.trim();
    if (!direccionTrimmed) return;

    await addLocation(direccionTrimmed);
    setDireccion(""); 
  };

  return (
    <div className="space-y-8 p-8">
      <section className="bg-white p-6 rounded-lg shadow-md border max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Añadir nueva dirección</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="direccion">
              Dirección:
            </label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              value={direccion}
              onChange={handleChange}
              placeholder="Ej: Plaza de la Constitución, Málaga"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-60"
            >
              Guardar direccion
            </button>
          </div>
        </form>
      </section>

    </div>
  );
}
