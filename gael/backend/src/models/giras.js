const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  grupo: { type: String, required: true},
  posterUri: { type: String, required: true },
  conciertos: [
      { type: mongoose.Schema.Types.ObjectId, ref: "conciertos", default: [] }
    ],
  creador: { type: String, required: true},
  fechaCreacion: { type: Date, default: Date.now, immutable: true },
});

module.exports = mongoose.model("giras", schema);
