const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  ciudad: { type: String, required: true},
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  fecha: { type: Date, required: true},
  creador: { type: String, required: true},
  fechaCreacion: { type: Date, default: Date.now, immutable: true },
});

module.exports = mongoose.model("conciertos", schema);
