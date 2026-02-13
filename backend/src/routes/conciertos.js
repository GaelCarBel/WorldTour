

const express = require("express");
const router = express.Router();
const modelConcierto = require("@/models/conciertos");

// GET ALL conciertos
router.get("/", async (req, res) => {
  try {
    const conciertos = await modelConcierto.find();
    res.status(200).json(conciertos);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." })
  }
})

// GET concierto by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const concierto = await modelConcierto.findById(id);
    if (!concierto) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(concierto);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "El formato del id es inválido." });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
})

// POST concierto
router.post("/", async (req, res) => {
  try {
    const newConcierto = new modelConcierto(req.body);
    const savedConcierto = await newConcierto.save();
    res.status(201).json(savedConcierto);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "El elemento está duplicado" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Datos inválidos", details: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
})

// PATCH concierto by id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedConcierto = await modelConcierto.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedConcierto) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(updatedConcierto);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "El formato del id es inválido." });
    }
    if (error.code === 11000) {
      return res.status(409).json({ error: "El elemento está duplicado" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Datos inválidos", details: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
})

// DELETE concierto by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedConcierto = await modelConcierto.findByIdAndDelete(id);
    if (!deletedConcierto) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json({ message: "Elemento eliminado" })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "El formato del id es inválido." });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
})

module.exports = router;