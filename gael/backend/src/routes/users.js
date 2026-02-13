const express = require("express");
const router = express.Router();
const { authMiddleware } = require("@/middlewares/auth.js");
const modelUser = require("@/models/users.js");

// GET user by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await modelUser.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Elemento no encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "El formato del id es inválido." });
    }
    res.status(500).json({ error: "Error interno del servidor." });
  }
})

// PATCH user by id
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userUpdated = await modelUser.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!userUpdated) {
      return res.status(404).json({ error: "usuario no encontrado." });
    }
    res.json(userUpdated);
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


module.exports = router;