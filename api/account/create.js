const Account = require("../../models/account/AccountModel");

module.exports = async function (req, res, next) {
  try {
    const { email, name, age } = req.body;
    const account = new Account({ email, name, age });
    await account.save();
    res.status(201);
    return res.send({ message: "Account created successfully" });
  } catch (error) {
    if (error.code == 11000) {
      res.status(409);
      return res.send({ message: "Account already exists" });
    } else {
      res.status(500);
      return res.send({ message: "Please try again later" });
    }
  }
};
