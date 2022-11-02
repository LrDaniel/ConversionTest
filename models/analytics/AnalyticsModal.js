const mongoose = require("mongoose");

const todayMidnight = new Date();
todayMidnight.setHours(0, 0, 0);

const ConversionAnalytics = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    conversionId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    count: { type: Number, default: 1 },
    date: { type: Date, default: todayMidnight },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConverionAnalytics", ConversionAnalytics);
