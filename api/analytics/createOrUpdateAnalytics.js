const Analytics = require("../../models/analytics/AnalyticsModal");
const mongoose = require("mongoose");

module.exports = async function (req, res) {
  try {
    const { conversionId, userId } = req.body;

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    console.log(todayMidnight);

    await Analytics.updateOne(
      {
        userId: userId,
        conversionId: conversionId,
        date: todayMidnight,
      },
      {
        $inc: { count: 1 },
      },
      { upsert: true }
    );
    res.send("updated");
  } catch (error) {
    console.log(error);
  }
};
