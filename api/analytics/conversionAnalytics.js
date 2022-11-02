const Analytics = require("../../models/analytics/AnalyticsModal");
const mongoose = require("mongoose");

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

