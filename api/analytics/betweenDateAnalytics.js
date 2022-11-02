const Analytics = require("../../models/analytics/AnalyticsModal");
const mongoose = require("mongoose");

module.exports = async function (req, res) {
  try {
    const { conversionId, startDate, endDate } = req.body;
    const between = await Analytics.aggregate([
      {
        $match: {
          conversionId: mongoose.Types.ObjectId(conversionId),
          date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$conversionId",
          count: { $sum: "$count" },
        },
      },
    ]);
    res.send(between);
    console.log(between);
  } catch (error) {
    console.log(error);
  }
};
