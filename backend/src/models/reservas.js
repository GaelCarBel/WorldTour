const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  concierto: { type: mongoose.Schema.Types.ObjectId, ref: "conciertos", default: [] },
  userEmail: { type: String, required: true, unique: true, trim: true, lowercase: true },
  token: { type: String, required: true },
  iat: { type: Date, required: true },
  exp: { type: Date, required: true },

  createdByEmail: { type: String, required: true, trim: true, lowercase: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

module.exports = mongoose.model("reservas", schema);
