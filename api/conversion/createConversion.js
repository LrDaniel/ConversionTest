const Conversion = require("../../models/conversion/ConversionModel");

module.exports = async function (req, res, next) {
  try {
    const { name, userId } = req.body;
    const nameCheck = await Conversion.find({ name: name, userId: userId });
    console.log(nameCheck);
    if (nameCheck.length > 0) {
      res.status(409);
      return res.send({ message: "Conversion with that name already exists" });
    } else {
      const conversion = new Conversion({ userId, name });
      await conversion.save();
      res.status(201);
      return res.send({ message: "Conversion created successfully" });
    }
  } catch (error) {
    return res.send({ message: error });
  }
};
