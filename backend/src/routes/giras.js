
const express = require("express");
const router = express.Router();
const modelGira = require("@/models/giras");

// GET ALL giras
router.get("/", async (req, res) => {
  try {
    const giras = await modelGira.find();
    res.status(200).json(giras);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." })
  }
})

// GET gira by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gira = await modelGira.findById(id);
    if (!gira) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(gira);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "El formato del id es inválido." });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
})

// POST gira
router.post("/", async (req, res) => {
  try {
    const newGira = new modelGira(req.body);
    const savedGira = await newGira.save();
    res.status(201).json(savedGira);

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

// PATCH gira by id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGira = await modelGira.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedGira) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(updatedGira);
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

// DELETE gira by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGira = await modelGira.findByIdAndDelete(id);
    if (!deletedGira) {
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