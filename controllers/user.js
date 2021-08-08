const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  let user = await User.find({});
  if (!user) return res.send("User Not Found");
  res.send(user);
};

exports.addUser = async (req, res) => {
  const { error } = await validateUser(req.body);
  if (error) return res.status(400).send(error);

  let {
    first_name,
    last_name,
    birth_date,
    email,
    password,
    confirm_password,
    gender,
    phone,
    address,
    city,
    state,
    pin_code,
    country,
  } = req.body;

  const userInfo = await User.findOne({ email: email });
  if (userInfo) return res.status(400).send("User already exists");

  if (password != confirm_password)
    return res.status(400).send("Password Not Match");

  let user = new User({
    first_name,
    last_name,
    birth_date,
    email,
    password,
    gender,
    phone,
    address,
    city,
    state,
    pin_code,
    country,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
};
