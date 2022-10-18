const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/codeTest",
  {
    autoReconnect: true,
    reconnectTries: 60,
    reconnectInterval: 10000,
  },
  () => {
    console.log("connected to database");
  }
);

const port = process.env.PORT || 3000;
const app = express();
app.listen(port);

app.use(require("body-parser").json());

app.use("/account/create", require("./api/account/create"));
app.use("/conversion/create", require("./api/conversion/createConversion"));
app.use(
  "/conversion/analytics",
  require("./api/analytics/conversionAnalytics")
);

console.log(`app running on port ${port}`);

module.exports = app;
