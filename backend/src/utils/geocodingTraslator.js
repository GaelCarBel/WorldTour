const axios = require("axios");

async function addressToCoords(direccion) {
  try {
    if (!direccion?.trim()) {
      throw new Error("Falta dirección");
    }

    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: direccion.trim(),
        format: "json",
        limit: 1,
        addressdetails: 1
      },
      headers: {
        "User-Agent": "MiAppGeocoding/1.0"
      }
    });

    const results = response.data;

    if (!results.length) {
      throw new Error("Dirección no encontrada. Tiene que tener formato similar a: 'Calle Gran Vía, 21, Madrid'");
    }

    const location = results[0];
    return {
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
    };

  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("Demasiadas peticiones. Espera 1 segundo.");
    }
    throw error;
  }
}

module.exports = { addressToCoords };
