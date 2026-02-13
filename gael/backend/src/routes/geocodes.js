const express = require("express");
const router = express.Router();
const modelGeocode = require("@/models/geocodes");
const { addressToCoords } = require("@/utils/geocodingTraslator");

// GET ALL geocodes
router.get("/", async (req, res) => {
  try {
    const geocodes = await modelGeocode.find();
    res.status(200).json(geocodes);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." })
  }
})

// GET geocode by address (EXACT TEXT)
router.get("/address/:address", async (req, res) => {
  try {
    const { address } = req.params;

    // Buscar primero en BBDD
    let geocode = await modelGeocode.findOne({
      address: address
    });

    // Si NO existe → llamar al POST internamente
    if (!geocode) {
      const response = await fetch(`${process.env.BACKEND_URL}/geocodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
      });

      if (response.ok) {
        geocode = await response.json();
      } else {
        const errorText = await response.text();
        return res.status(response.status).json({
          error: `Error creando dirección: ${errorText}`
        });
      }
    }
    res.status(200).json(geocode);
  } catch (error) {
    console.error('Error búsqueda:', error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// GET geocode by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const geocode = await modelGeocode.findById(id);

    if (!geocode) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(geocode);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Formato del id es inválido." });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// GET geocode by latitude and longitude
/* 
router.get("/coordenadas/:lat/:lon", async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    const geocode = await modelGeocode.findOne({
      lat: latNum,
      lon: lonNum
    });

    if (!geocode) {
      return res.status(404).json({ error: "Coordenadas no encontradas." });
    }
    res.status(200).json(geocode);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
});
*/


// POST geocode by address 
router.post("/", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: "Falta dirección" });
    }
    const { lat, lon } = await addressToCoords(address);
    const newGeocode = new modelGeocode({
      address: address,
      lat: lat,
      lon: lon
    });
    const savedGeocode = await newGeocode.save();
    res.status(201).json(savedGeocode);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "La dirección ya existe" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Datos inválidos", details: error.message });
    }
    if (error.message.includes("no encontrada")) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes("peticiones")) {
      return res.status(429).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// DELETE geocode by Id (by address o coors could make a wrong deletion)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGeocode = await modelGeocode.findByIdAndDelete(id);

    if (!deletedGeocode) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json({ message: "Elemento eliminado" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "El formato del id no es válido." });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

module.exports = router;