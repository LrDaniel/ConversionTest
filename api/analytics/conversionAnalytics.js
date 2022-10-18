const Analytics = require("../../models/analytics/AnalyticsModal");
const mongoose = require("mongoose");

module.exports = async function (req, res) {
  const dateNow = new Date(Date.now());
  const today = dateNow.getDay();
  try {
    const { conversionId, userId, trackedData, startDate, endDate } = req.body;

    const oldestDay = await Analytics.find({
      conversionId: conversionId,
    })
      .sort({ createdAt: -1 })
      .limit(1);

    const createdDay = await oldestDay.createdAt?.getDay();

    if (
      today > createdDay ||
      (today == 0 && createdDay == 6) ||
      oldestDay.length == 0
    ) {
      const analytics = new Analytics({
        userId,
        trackedData,
        conversionId,
      });
      await analytics.save();
    }
    if (trackedData) {
      await Analytics.find({
        conversionId: conversionId,
      })
        .sort({ createdAt: -1 })
        .limit(1)
        .updateOne({ $inc: { trackedData: trackedData } });
    }

    if (startDate && endDate) {
      console.log(conversionId);
      const between = await Analytics.aggregate([
        {
          $match: {
            conversionId: mongoose.Types.ObjectId(conversionId),
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: "$conversionId",
            trackedData: { $sum: "$trackedData" },
            userId: { $last: "$userId" },
          },
        },
      ]);

      console.log(between, startDate, endDate);
    }

    return res.send({ message: "success" });
  } catch (error) {
    return res.send({ message: error });
  }
};
