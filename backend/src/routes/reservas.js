// resouces, reserva, modelReserva, newReserva, savedReserva, updatedReserva, deletedReserva
// Con que haga Reserva, reservas y reserva

const express = require("express");
const router = express.Router();
const modelReserva = require("@/models/reservas");

// GET ALL reservas
router.get("/", async (req, res) => {
  try {
    const reservas = await modelReserva.find();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor." })
  }
})

// GET reserva by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await modelReserva.findById(id);
    if (!reserva) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(reserva);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "El formato del id es inválido." });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
})

// POST reserva
router.post("/", async (req, res) => {
  try {
    const newReserva = new modelReserva(req.body);
    const savedReserva = await newReserva.save();
    res.status(201).json(savedReserva);

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

// PATCH reserva by id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReserva = await modelReserva.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedReserva) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(updatedReserva);
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

// DELETE reserva by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReserva = await modelReserva.findByIdAndDelete(id);
    if (!deletedReserva) {
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