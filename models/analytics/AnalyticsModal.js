const mongoose = require("mongoose");

const ConversionAnalytics = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    conversionId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    trackedData: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConverionAnalytics", ConversionAnalytics);
