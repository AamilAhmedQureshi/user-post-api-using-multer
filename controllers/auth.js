const config = require("config");
const jwt = require("jsonwebtoken");
const { User, validateAuth } = require("../models/user");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { error } = await validateAuth(req.body);
  if (error) return res.status(400).send("Validation Error");

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.send(token);
};
