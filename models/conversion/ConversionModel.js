const mongoose = require("mongoose");

const Conversion = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversion", Conversion);
